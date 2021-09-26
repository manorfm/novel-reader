import got from 'got'
import { JSDOM } from 'jsdom'

export default class HTMLExtractor {

    async extract(url) {
        try {
            const response = await got(url);
            const { document: body } = new JSDOM(response.body).window;

            const content = body.querySelectorAll('#chapterhidden p');
            const episode = Array.from(content.values())

            const page = {
                navigator: this.buildNavigator(body)
            }
            return episode
                .map(p => this.transform(p.innerHTML))
                .filter(line => line && !this.isToIgnore(line))
                .reduce((previous, current) => {
                    const line = current.trim();
                    if (line.startsWith('Chapter')) {
                        return { ...previous, title: this.formatChapter(line) };
                    }
                    if (this.isInfo(line)) {
                        return this.toArray(previous, line, 'infos');
                    }
                    return this.toArray(previous, line, 'contents');
                }, page)
        } catch (error) {
            console.log(error);
        }
        return {}
    }

    buildNavigator(body) {
        const optionsChaptersNode = body.querySelector('ul.chapter-actions li select')

        if (optionsChaptersNode) {
            const options = optionsChaptersNode.querySelectorAll('option');
            
            if (options) {
                const optionsChapters = Array.from(options.values())
    
                let page = {
                    nextChapters: []
                }
                let selected = false;
                for (let i = 0; i < optionsChapters.length; i++) {
                    const option = optionsChapters[i];
                    if (option.disabled || (!selected && !option.selected)) {
                        continue;
                    }
    
                    if (option.selected) {
                        selected = true;
                        const previousOption = optionsChapters[i - 1];
                        const nextOption = optionsChapters[i + 1];
                        page = {
                            ...page,
                            previousPage: this.extractChapter(previousOption.value),
                            nextPage: this.extractChapter(nextOption.value),
                            
                        }
                        continue;
                    }
    
                    const { nextChapters } = page;
    
                    const { value } = option;
                    nextChapters.push(this.extractChapter(value))
                }
    
                return page;
            }
        }
    }

    extractChapter(value) {
        const offset = "chapter-".length;
        const index = value.indexOf("chapter-") + offset;
        const pageIndex = value.substring(index)
        return pageIndex;
    }

    transform(line) {
        return line
            .replace(/(&amp;|<strong>|<\/strong>)/gi, '')
            .replace(/&nbsp;/gi, ' ')
            .trim();
    }

    isToIgnore(line) {
        const infos = [
            ' ',
            'If you find any errors',
            'Tip:',
            'For more chapters visit',
            'Visit lightnovelreader.com'
        ]

        return infos.some(info => line.startsWith(info))
    }

    isInfo(line) {
        const infos = [
            'Translation',
            'Editor',
            'Translator',
            'Proofreader:'
        ]

        return infos.some(info => line.startsWith(info))
    }

    toArray(previous, current, field) {
        if (previous && previous[field]) {
            previous[field].push(current)
            return previous;
        }
        return { ...previous, [field]: [current] }
    }

    formatChapter(line) {
        const index = line.indexOf(', ');
        return index > 0 ? `Chapter: ${line.substring(index + 1)}` : line;
    }
}
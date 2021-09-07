import got from 'got'
import { JSDOM } from 'jsdom'

export default class HTMLExtractor {

    async extract(url) {
        try {
            const response = await got(url);
            const { document: body } = new JSDOM(response.body).window;

            //const content = document.querySelectorAll('div.chapter-content3 div.desc p');
            const content = body.querySelectorAll('#chapterhidden p');

            const chapters = body.querySelectorAll('ul.chapter-actions li select')

            // console.log(chapters.values())
            // console.log(chapters.options)

            const episode = Array.from(content.values())

            return episode.map(p => p.innerHTML)
                .filter(line => !line.startsWith('Tip:'))
                .reduce((previous, current) => {
                    const line = current.trim();
                    if (line.startsWith('If you find any errors') || line.trim().startsWith('Tip:')) {
                        return previous; // ignore lines
                    }
                    if (line.startsWith('Chapter')) {
                        return { ...previous, title: this.formatChapter(line) }
                    }
                    if (line.startsWith('Translation') || line.startsWith('Editor') || line.startsWith('Translator')) {
                        return this.toArray(previous, line, 'infos')
                    }
                    return this.toArray(previous, line, 'contents')
                }, {})
        } catch (error) {
            console.log(error);
        }
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
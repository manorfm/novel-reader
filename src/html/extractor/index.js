import got from 'got'
import { JSDOM } from 'jsdom'

export default class HTMLExtractor {

    async extract(url) {
        try {
            const response = await got(url);
            const { document } = new JSDOM(response.body).window;

            //const content = document.querySelectorAll('div.chapter-content3 div.desc p');
            const content = document.querySelectorAll('#chapterhidden p');
            
            const arr = Array.from(content.values())
            return arr.map(p => p.innerHTML)
        } catch (error) {
            console.log(error);
        }
    }
}
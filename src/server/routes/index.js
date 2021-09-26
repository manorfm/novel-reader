import HTMLExtractor from '../../html/extractor'

export default class Router {

    set(server) {
        const url = 'https://www.readlightnovel.org/martial-peak/chapter-'

        server.get('/', async (req, res) => {
            const { chapter } = req.query

            const htmlExtractor = new HTMLExtractor()

            let page = await htmlExtractor.extract(`${url}${chapter}`)

            if (!page.contents) {
                page = { ...page, contents: [`Chapter ${chapter} is coming soon...`] }
            }

            res.status(200)
                .render('pages/index', { page, chapter })
        })
    }
}
import HTMLExtractor from '../../html/extractor'

export default class Router {

    set(server) {
        const url = 'https://www.readlightnovel.org/martial-peak/chapter-'

        server.get('/site',async (req, res) => {
            const { chapter } = req.query

            const htmlExtractor = new HTMLExtractor()
            
            const contents = await htmlExtractor.extract(`${url}${chapter}`)

            if (contents) {
                res.status(200)
                    .render('pages/index', { contents, chapter })
            }
        })
    }
}
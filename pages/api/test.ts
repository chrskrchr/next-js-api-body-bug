export default function handler(req, res) {
    const {body} = req;
    res.json({ping: body})
}
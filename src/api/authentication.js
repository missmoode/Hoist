import express from 'express'
import getInstance from '../lib/clientProvider';
import request from 'request';

const router = express.Router()

router.get("/authorize", (req, res) => {
    if (req.query.error != null) {
        return res.status(500).json({error: req.query.error})
    } else {
        if (!req.query.state) return res.status(500).json({error: req.query.error})
        let code = req.query.code
        let state = JSON.parse(req.query.state)
        getInstance(state.address).then(instance => {
            request.post({url: `${state.scheme}://${state.address}/oauth/token`, form: {
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": "https://hoist.getsail.app/authentication/authorize",
                "client_id": instance.clientID,
                "client_secret": instance.clientSecret
            }}, (err, res2, body) => {
                if (err) return res.status(500).json({error: "Internal Server Error"})
                if (res2.statusCode === 200) {
                    let json = JSON.parse(body)
                    res.redirect(`sail://oauth/addToken?token=${json.access_token}`)
                } else {
                    res.status(500).json({error: "Internal Server Error"})
                }

            })
        }).catch(err => {
            return res.status(500).json({error: "Internal Server Error"})
        })
    }
})

export default router
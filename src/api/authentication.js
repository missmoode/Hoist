import express from 'express'
import getInstance from '../lib/clientProvider';
import { request } from 'http';

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
                "scopes": "write read follow push",
                "redirect_uri": "https://hoist.getsail.app/authentication/authorize",
                "client_id": instance.client_id,
                "client_secret": instance.client_secret
            }}, (err, request, body) => {
                if (err) return res.status(500).json({error: "Internal Server Error"})

                res.send(body)
            })
        }).catch((err) => {
            return res.status(500).json({error: "Internal Server Error"})
        })
    }
})

export default router
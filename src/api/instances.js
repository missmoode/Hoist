import express from 'express'
import getInstance from '../lib/clientProvider';

const router = express.Router()

// Return client ID (register app if we dont have one)
router.get("/:instance/info", (req, res) => {
    getInstance(decodeURIComponent(req.params['instance']).toLowerCase())
    .then(instance => {
        res.status(200).json({address: instance.address, clientId: instance.clientID})
    })
    .catch(err => {
        res.status(500).json({error: 'Internal Server Error'})
    })
})

export default router
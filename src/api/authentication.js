import express from 'express'
import getClientID from '../lib/clientProvider';

const router = express.Router()

// Return client ID (register app if we dont have one)
router.get("/:instance", (req, res) => {
    getInstance(decodeURIComponent(req.params['instance']).toLowerCase())
    .then(instance => {
        res.status(200).json(instance)
    })
    .catch(err => {
        res.status(500).json({error: 'Internal Server Error: ' + err})
    })
})

export default router
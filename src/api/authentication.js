import express from 'express'
import getInstance from '../lib/clientProvider';

const router = express.Router()

// Return client ID (register app if we dont have one)
router.get("/:instance/id", (req, res) => {
    getInstance(decodeURIComponent(req.params['instance']).toLowerCase())
    .then(instance => {
        res.status(200).json({address: instance.address, id: instance.clientID})
    })
    .catch(err => {
        res.status(500).json({error: 'Internal Server Error'})
    })
})
router.get("/authorize", (req, res) => {
    res.status(200).json({})
})



export default router
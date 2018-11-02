import express from 'express'
import getInstance from '../lib/clientProvider';

const router = express.Router()

router.get("/authorize", (req, res) => {
    if (req.query.error != null) {
        
    } else {

    }
    req.query.code
    res.status(200).json({})
})



export default router
import express from 'express'
import { donate } from '../controllers/donationController.js'

const router = express.Router()

router.post('/:campaignId', donate)

export default router

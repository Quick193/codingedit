import express from 'express'
import { getCampaignStats, getDashboardSummary } from '../controllers/dashboardController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/summary', protect, getDashboardSummary)
router.get('/campaign/:id', protect, getCampaignStats)

export default router

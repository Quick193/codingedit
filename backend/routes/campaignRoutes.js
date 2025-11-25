import express from 'express'
import {
  createCampaign,
  endCampaign,
  getCampaign,
  getCampaignDonations,
  getCampaigns,
  getUserCampaigns,
  updateCampaign
} from '../controllers/campaignController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getCampaigns).post(protect, createCampaign)
router.route('/user/me').get(protect, getUserCampaigns)
router.route('/:id').get(getCampaign).put(protect, updateCampaign)
router.route('/:id/end').patch(protect, endCampaign)
router.route('/:id/donations').get(protect, getCampaignDonations)

export default router

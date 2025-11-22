import Campaign from '../models/Campaign.js'
import Donation from '../models/Donation.js'
import { asyncHandler } from '../utils/errorHandler.js'

export const donate = asyncHandler(async (req, res) => {
  const { campaignId } = req.params
  const { amount, donorName, donorEmail } = req.body
  if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid donation amount' })
  const campaign = await Campaign.findById(campaignId)
  if (!campaign) return res.status(404).json({ message: 'Campaign not found' })
  if (!campaign.isActive) return res.status(400).json({ message: 'Campaign not active' })

  const donation = await Donation.create({ campaign: campaignId, amount, donorName, donorEmail })
  campaign.currentAmount += amount
  await campaign.save()

  res.status(201).json({ message: 'Donation successful', donation, campaign })
})

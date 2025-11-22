import Campaign from '../models/Campaign.js'
import Donation from '../models/Donation.js'
import { asyncHandler } from '../utils/errorHandler.js'

export const createCampaign = asyncHandler(async (req, res) => {
  const { title, description, goal, deadline, image } = req.body
  if (!title || !description || !goal || !deadline) {
    return res.status(400).json({ message: 'Missing required fields' })
  }
  const campaign = await Campaign.create({
    title,
    description,
    goal,
    deadline,
    image,
    creator: req.user.id
  })
  res.status(201).json(campaign)
})

export const updateCampaign = asyncHandler(async (req, res) => {
  const { id } = req.params
  const campaign = await Campaign.findById(id)
  if (!campaign) return res.status(404).json({ message: 'Campaign not found' })
  if (campaign.creator.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized' })
  }
  const updates = req.body
  const updated = await Campaign.findByIdAndUpdate(id, updates, { new: true })
  res.json(updated)
})

export const endCampaign = asyncHandler(async (req, res) => {
  const { id } = req.params
  const campaign = await Campaign.findById(id)
  if (!campaign) return res.status(404).json({ message: 'Campaign not found' })
  if (campaign.creator.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized' })
  }
  campaign.isActive = false
  await campaign.save()
  res.json({ message: 'Campaign ended', campaign })
})

export const getCampaigns = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find().sort({ createdAt: -1 }).populate('creator', 'name email')
  res.json(campaigns)
})

export const getCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id).populate('creator', 'name email')
  if (!campaign) return res.status(404).json({ message: 'Campaign not found' })
  res.json(campaign)
})

export const getUserCampaigns = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find({ creator: req.user.id }).sort({ createdAt: -1 })
  res.json(campaigns)
})

export const getCampaignDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find({ campaign: req.params.id }).sort({ createdAt: -1 })
  res.json(donations)
})

import Campaign from '../models/Campaign.js'
import Donation from '../models/Donation.js'
import { asyncHandler } from '../utils/errorHandler.js'

const buildStats = (donations, campaigns) => {
  const totalAmount = donations.reduce((acc, d) => acc + d.amount, 0)
  const totalDonors = donations.length
  const avgDonation = totalDonors ? +(totalAmount / totalDonors).toFixed(2) : 0
  const campaignCount = campaigns.length
  const daysRange = donations.length
    ? Math.max(1, Math.ceil((Date.now() - new Date(Math.min(...donations.map(d => d.createdAt)))) / (1000 * 60 * 60 * 24)))
    : 1
  const donationRate = +(totalDonors / daysRange).toFixed(2)
  const chartMap = {}
  donations.forEach(d => {
    const day = new Date(d.createdAt).toISOString().split('T')[0]
    chartMap[day] = (chartMap[day] || 0) + d.amount
  })
  const chartData = Object.entries(chartMap).sort().map(([date, amount]) => ({ date, amount }))
  return { totalAmount, totalDonors, avgDonation, donationRate, campaignCount, chartData }
}

export const getDashboardSummary = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find({ creator: req.user.id })
  const campaignIds = campaigns.map(c => c._id)
  const donations = await Donation.find({ campaign: { $in: campaignIds } })
  const stats = buildStats(donations, campaigns)
  const active = campaigns.filter(c => c.isActive)
  const completed = campaigns.filter(c => !c.isActive)
  res.json({ stats, active, completed })
})

export const getCampaignStats = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id)
  if (!campaign) return res.status(404).json({ message: 'Campaign not found' })
  if (campaign.creator.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized' })
  }
  const donations = await Donation.find({ campaign: campaign._id })
  const stats = buildStats(donations, [campaign])
  res.json({ campaign, stats, donations })
})

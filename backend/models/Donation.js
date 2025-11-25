import mongoose from 'mongoose'

const donationSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  amount: { type: Number, required: true },
  donorName: { type: String, default: 'Anonymous' },
  donorEmail: { type: String },
  createdAt: { type: Date, default: Date.now }
})

const Donation = mongoose.model('Donation', donationSchema)

export default Donation

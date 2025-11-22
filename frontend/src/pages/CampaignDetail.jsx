import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/api'

const CampaignDetail = () => {
  const { id } = useParams()
  const [campaign, setCampaign] = useState(null)
  const [amount, setAmount] = useState('50')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const { data } = await api.get(`/campaigns/${id}`)
        setCampaign(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCampaign()
  }, [id])

  const handleDonate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post(`/donations/${id}`, { amount: Number(amount), donorName, donorEmail })
      setMessage('Thank you for your donation!')
      setCampaign(data.campaign)
      setAmount('50')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Donation failed')
    }
  }

  if (!campaign) return <div className="text-center text-gray-600">Loading campaign...</div>

  const progress = Math.min(100, Math.round((campaign.currentAmount / campaign.goal) * 100))

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {campaign.image && <img src={campaign.image} alt={campaign.title} className="w-full h-72 object-cover rounded-xl" />}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{campaign.title}</h1>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${campaign.isActive ? 'bg-teal-100 text-teal-700' : 'bg-gray-200 text-gray-700'}`}>
              {campaign.isActive ? 'Live' : 'Completed'}
            </span>
          </div>
          <p className="text-gray-700 whitespace-pre-line">{campaign.description}</p>
          <div>
            <div className="w-full bg-gray-100 h-2 rounded-full mb-2">
              <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>${campaign.currentAmount.toLocaleString()} raised of ${campaign.goal.toLocaleString()}</span>
              <span>{progress}% funded</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Support this campaign</h3>
        <form className="space-y-3" onSubmit={handleDonate}>
          <div>
            <label className="text-sm text-gray-700">Amount (USD)</label>
            <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full mt-1 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" required />
          </div>
          <div>
            <label className="text-sm text-gray-700">Name (optional)</label>
            <input value={donorName} onChange={(e) => setDonorName(e.target.value)} className="w-full mt-1 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Anonymous" />
          </div>
          <div>
            <label className="text-sm text-gray-700">Email (optional)</label>
            <input type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} className="w-full mt-1 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="you@example.com" />
          </div>
          <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md font-semibold hover:bg-teal-700">Donate</button>
        </form>
        {message && <p className="text-sm text-teal-700 mt-3">{message}</p>}
      </div>
    </div>
  )
}

export default CampaignDetail

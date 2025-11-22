import { useEffect, useState } from 'react'
import api from '../utils/api'
import CampaignCard from '../components/CampaignCard'

const Campaigns = ({ limit, embedded }) => {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data } = await api.get('/campaigns')
        setCampaigns(limit ? data.slice(0, limit) : data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchCampaigns()
  }, [limit])

  if (loading) return <div className="text-center text-gray-600">Loading campaigns...</div>

  return (
    <div className={embedded ? '' : 'space-y-4'}>
      {!embedded && <h2 className="text-2xl font-semibold text-gray-900">All campaigns</h2>}
      {campaigns.length === 0 ? (
        <p className="text-gray-600">No campaigns yet. Be the first to create one!</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => <CampaignCard key={campaign._id} campaign={campaign} />)}
        </div>
      )}
    </div>
  )
}

export default Campaigns

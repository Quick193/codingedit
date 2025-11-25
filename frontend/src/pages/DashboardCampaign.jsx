import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../utils/api'
import StatCard from '../components/StatCard'
import DonationChart from '../components/DonationChart'

const DashboardCampaign = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/dashboard/campaign/${id}`)
        setData(data)
      } catch (error) {
        console.error(error)
      }
    }
    load()
  }, [id])

  if (!data) return <div className="text-center text-gray-600">Loading campaign analytics...</div>

  const { campaign, stats, donations } = data
  const progress = Math.min(100, Math.round((campaign.currentAmount / campaign.goal) * 100))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Dashboard</p>
          <h1 className="text-2xl font-semibold text-gray-900">{campaign.title}</h1>
        </div>
        <Link to="/dashboard" className="text-teal-600 text-sm font-semibold">Back</Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Raised" value={`$${stats.totalAmount.toLocaleString()}`} subtext={`${progress}% of goal`} />
        <StatCard label="Donors" value={stats.totalDonors} subtext={`${stats.donationRate} per day`} />
        <StatCard label="Average donation" value={`$${stats.avgDonation}`} />
        <StatCard label="Goal" value={`$${campaign.goal.toLocaleString()}`} subtext={campaign.isActive ? 'Live' : 'Completed'} />
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Donation timeline</h3>
        <DonationChart data={stats.chartData} />
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent donations</h3>
          <span className="text-sm text-gray-600">{donations.length} total</span>
        </div>
        <div className="divide-y divide-gray-100">
          {donations.map((d) => (
            <div key={d._id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">${d.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{d.donorName || 'Anonymous'} · {new Date(d.createdAt).toLocaleDateString()}</p>
              </div>
              <span className="text-xs text-gray-500">{d.donorEmail || 'No email'}</span>
            </div>
          ))}
          {donations.length === 0 && <p className="p-4 text-gray-600 text-sm">No donations yet.</p>}
        </div>
      </div>
    </div>
  )
}

export default DashboardCampaign

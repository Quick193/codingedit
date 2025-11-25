import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import StatCard from '../components/StatCard'

const Dashboard = () => {
  const [summary, setSummary] = useState(null)
  const [tab, setTab] = useState('active')

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await api.get('/dashboard/summary')
        setSummary(data)
      } catch (error) {
        console.error(error)
      }
    }
    loadData()
  }, [])

  if (!summary) return <div className="text-center text-gray-600">Loading dashboard...</div>

  const { stats, active, completed } = summary

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total raised" value={`$${stats.totalAmount.toLocaleString()}`} />
        <StatCard label="Donors" value={stats.totalDonors} subtext={`${stats.donationRate} per day`} />
        <StatCard label="Average donation" value={`$${stats.avgDonation}`} />
        <StatCard label="Campaigns" value={stats.campaignCount} />
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
        <div className="flex border-b border-gray-100">
          <button onClick={() => setTab('active')} className={`flex-1 py-3 text-sm font-semibold ${tab === 'active' ? 'text-teal-700 border-b-2 border-teal-600' : 'text-gray-600'}`}>Live</button>
          <button onClick={() => setTab('completed')} className={`flex-1 py-3 text-sm font-semibold ${tab === 'completed' ? 'text-teal-700 border-b-2 border-teal-600' : 'text-gray-600'}`}>Completed</button>
        </div>
        <div className="p-4 space-y-3">
          {(tab === 'active' ? active : completed).map(c => (
            <div key={c._id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{c.title}</h3>
                <p className="text-sm text-gray-600">${c.currentAmount.toLocaleString()} raised of ${c.goal.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link to={`/dashboard/campaign/${c._id}`} className="text-teal-600 text-sm font-semibold">View stats</Link>
                {c.isActive && <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">Live</span>}
              </div>
            </div>
          ))}
          {(tab === 'active' ? active : completed).length === 0 && (
            <p className="text-gray-600 text-sm">No campaigns in this state.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

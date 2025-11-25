import { Link } from 'react-router-dom'

const CampaignCard = ({ campaign }) => {
  const progress = Math.min(100, Math.round((campaign.currentAmount / campaign.goal) * 100))
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 flex flex-col gap-3 border border-gray-100">
      {campaign.image && <img src={campaign.image} alt={campaign.title} className="h-40 w-full object-cover rounded-lg" />}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${campaign.isActive ? 'bg-teal-100 text-teal-700' : 'bg-gray-200 text-gray-700'}`}>
            {campaign.isActive ? 'Live' : 'Completed'}
          </span>
          <span className="text-xs text-gray-500">Goal ${campaign.goal.toLocaleString()}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{campaign.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{campaign.description}</p>
      </div>
      <div>
        <div className="w-full bg-gray-100 h-2 rounded-full mb-2">
          <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span>${campaign.currentAmount.toLocaleString()} raised</span>
          <span>{progress}%</span>
        </div>
      </div>
      <Link to={`/campaign/${campaign._id}`} className="mt-auto inline-block text-center bg-teal-600 text-white px-3 py-2 rounded-md text-sm hover:bg-teal-700">
        View Campaign
      </Link>
    </div>
  )
}

export default CampaignCard

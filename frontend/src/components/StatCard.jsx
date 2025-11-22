const StatCard = ({ label, value, subtext }) => (
  <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-semibold text-teal-700">{value}</div>
    {subtext && <div className="text-xs text-gray-500 mt-1">{subtext}</div>}
  </div>
)

export default StatCard

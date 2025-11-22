import { Link } from 'react-router-dom'
import Campaigns from './Campaigns'

const Home = () => {
  return (
    <div className="space-y-10">
      <section className="gradient-bg text-white rounded-3xl p-10 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <p className="uppercase text-teal-100 text-xs font-semibold">Crowdfunding reinvented</p>
            <h1 className="text-4xl font-bold leading-tight">Raise funds for the ideas that matter most</h1>
            <p className="text-lg text-teal-50">
              Launch campaigns, accept donations instantly, and understand your impact with real-time analytics.
            </p>
            <div className="flex gap-4">
              <Link to="/create" className="bg-white text-teal-700 px-4 py-2 rounded-md font-semibold shadow">Start a campaign</Link>
              <Link to="/campaigns" className="border border-white text-white px-4 py-2 rounded-md font-semibold hover:bg-white/10">Explore campaigns</Link>
            </div>
          </div>
          <div className="flex-1 bg-white text-gray-800 rounded-2xl p-6 shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Why Raise?</h3>
            <ul className="space-y-3 text-sm">
              <li>✓ Fast setup with secure payments</li>
              <li>✓ Transparent analytics with donation timeline</li>
              <li>✓ Manage live and completed campaigns in one place</li>
              <li>✓ Seamless donor experience on any device</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Trending campaigns</h2>
          <Link to="/campaigns" className="text-teal-600 text-sm font-semibold">View all</Link>
        </div>
        <Campaigns limit={3} embedded />
      </section>
    </div>
  )
}

export default Home

import { useState } from 'react'
import useAuth from '../hooks/useAuth'

const Login = () => {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(form)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-gray-700">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        </div>
        <div>
          <label className="text-sm text-gray-700">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        </div>
        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-teal-700 w-full">Login</button>
      </form>
      {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
    </div>
  )
}

export default Login

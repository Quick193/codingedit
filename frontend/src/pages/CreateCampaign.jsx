import { useState } from 'react'
import api from '../utils/api'

const CreateCampaign = () => {
  const [form, setForm] = useState({ title: '', description: '', goal: '', deadline: '', image: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setForm({ ...form, image: reader.result })
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/campaigns', { ...form, goal: Number(form.goal) })
      setMessage('Campaign created successfully!')
      setForm({ title: '', description: '', goal: '', deadline: '', image: '' })
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating campaign')
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-semibold mb-4">Create campaign</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-gray-700">Title</label>
          <input name="title" value={form.title} onChange={handleChange} required className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        </div>
        <div>
          <label className="text-sm text-gray-700">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows="4" className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"></textarea>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700">Goal (USD)</label>
            <input type="number" name="goal" value={form.goal} onChange={handleChange} required min="1" className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="text-sm text-gray-700">Deadline</label>
            <input type="date" name="deadline" value={form.deadline} onChange={handleChange} required className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-700">Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleImage} className="w-full mt-1" />
          {form.image && <img src={form.image} alt="preview" className="h-32 mt-2 rounded-lg object-cover" />}
        </div>
        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-teal-700">Create campaign</button>
      </form>
      {message && <p className="text-sm text-teal-700 mt-3">{message}</p>}
    </div>
  )
}

export default CreateCampaign

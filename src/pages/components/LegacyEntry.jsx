import { useState } from 'react'
import { motion } from 'framer-motion'

const LegacyEntry = ({ onSubmit }) => {
  const [form, setForm] = useState({
    studentName: '',
    institution: '',
    degree: '',
    graduationDate: '',
    certificateId: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(form)
  }

  return (
    <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="studentName" value={form.studentName} onChange={handleChange} className="border rounded-lg px-3 py-2" placeholder="Student Name" />
        <input name="institution" value={form.institution} onChange={handleChange} className="border rounded-lg px-3 py-2" placeholder="Institution" />
        <input name="degree" value={form.degree} onChange={handleChange} className="border rounded-lg px-3 py-2" placeholder="Degree / Program" />
        <input name="graduationDate" value={form.graduationDate} onChange={handleChange} className="border rounded-lg px-3 py-2" placeholder="Graduation Date (YYYY-MM-DD)" />
        <input name="certificateId" value={form.certificateId} onChange={handleChange} className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="Certificate ID" />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="btn-secondary">Use Manual Details</button>
      </div>
    </motion.form>
  )
}

export default LegacyEntry



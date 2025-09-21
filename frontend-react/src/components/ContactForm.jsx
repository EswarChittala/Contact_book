import React, { useState } from 'react'

export default function ContactForm({ onAdd }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  function validate() {
    if(!name || !email || !phone) return 'All fields required'
    if(!/\S+@\S+\.\S+/.test(email)) return 'Invalid email'
    if(!/^\d{10}$/.test(phone)) return 'Phone must be 10 digits'
    return ''
  }

  function handleSubmit(e) {
    e.preventDefault()
    const err = validate()
    if(err) { setError(err); return }
    setError('')
    onAdd({ name, email, phone })
    setName(''); setEmail(''); setPhone('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Contact</h2>
      <div>
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} required/>
      </div>
      <div>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} required/>
      </div>
      <div>
        <label>Phone</label>
        <input value={phone} onChange={e=>setPhone(e.target.value)} required placeholder="10 digits"/>
      </div>
      <button type="submit">Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

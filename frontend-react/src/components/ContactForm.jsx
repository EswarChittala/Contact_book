import React, { useState } from 'react'

export default function ContactForm({ onAdd }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validate() {
    if(!name || !email || !phone) return 'All fields are required'
    if(!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email address'
    if(!/^\d{10}$/.test(phone)) return 'Phone number must be exactly 10 digits'
    return ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    
    const err = validate()
    if(err) { 
      setError(err)
      setIsSubmitting(false)
      return 
    }
    
    setError('')
    await onAdd({ name, email, phone })
    setName('')
    setEmail('')
    setPhone('')
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Add New Contact</h2>
      
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input 
          id="name"
          type="text" 
          value={name} 
          onChange={e=>setName(e.target.value)} 
          placeholder="Enter full name"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input 
          id="email"
          type="email" 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
          placeholder="Enter email address"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input 
          id="phone"
          type="tel" 
          value={phone} 
          onChange={e=>setPhone(e.target.value.replace(/\D/g, ''))} 
          placeholder="Enter 10-digit phone number"
          maxLength="10"
        />
      </div>
      
      <button 
        type="submit" 
        className="submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            Adding...
          </>
        ) : 'Add Contact'}
      </button>
      
      {error && <div className="error-message">{error}</div>}
    </form>
  )
}
import React, { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : '/api'

export default function App() {
  const [contacts, setContacts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 6

  async function fetchContacts(p = page) {
    try {
      const res = await fetch(`${API_BASE}/contacts?page=${p}&limit=${limit}`)
      const json = await res.json()
      setContacts(json.data || [])
      setPage(json.page || 1)
      setTotalPages(json.totalPages || 1)
      setTotal(json.total || 0)
    } catch (err) {
      console.error(err)
      alert('Failed to load contacts')
    }
  }

  useEffect(() => { fetchContacts(1) }, [])

  async function addContact(contact) {
    try {
      const res = await fetch(`${API_BASE}/contacts`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(contact)
      })
      if(!res.ok) {
        const e = await res.json()
        throw new Error(e.error || 'Failed')
      }
      fetchContacts(1)
    } catch (err) {
      alert(err.message)
    }
  }

  async function deleteContact(id) {
    if(!confirm('Delete this contact?')) return
    try {
      const res = await fetch(`${API_BASE}/contacts/${id}`, { method:'DELETE' })
      if(!res.ok) throw new Error('Delete failed')
      fetchContacts(page)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="container">
      <h1>Contact Book</h1>
      <div className="card">
        <ContactForm onAdd={addContact}/>
      </div>
      <div className="card">
        <ContactList
          contacts={contacts}
          page={page}
          total={total}
          totalPages={totalPages}
          onPrev={()=> page>1 && fetchContacts(page-1)}
          onNext={()=> page<totalPages && fetchContacts(page+1)}
          onDelete={deleteContact}
        />
      </div>
    </div>
  )
}

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
  const [isLoading, setIsLoading] = useState(true)
  const limit = 5  // Changed from 6 to 5 for 5 contacts per page

  async function fetchContacts(p = page) {
    try {
      setIsLoading(true)
      const res = await fetch(`${API_BASE}/contacts?page=${p}&limit=${limit}`)
      const json = await res.json()
      setContacts(json.data || [])
      setPage(json.page || 1)
      setTotalPages(json.totalPages || 1)
      setTotal(json.total || 0)
    } catch (err) {
      console.error('Failed to load contacts:', err)
      alert('Failed to load contacts. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { 
    fetchContacts(1) 
  }, [])

  async function addContact(contact) {
    try {
      const res = await fetch(`${API_BASE}/contacts`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(contact)
      })
      if(!res.ok) {
        const e = await res.json()
        throw new Error(e.error || 'Failed to add contact')
      }
      fetchContacts(1) // Reset to first page after adding
      return true
    } catch (err) {
      alert(err.message)
      return false
    }
  }

  async function deleteContact(id) {
    try {
      const res = await fetch(`${API_BASE}/contacts/${id}`, { method:'DELETE' })
      if(!res.ok) throw new Error('Delete failed')
      
      // If we're on the last page and it's now empty after deletion, go to previous page
      if (contacts.length === 1 && page > 1) {
        fetchContacts(page - 1)
      } else {
        fetchContacts(page)
      }
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Contact Book</h1>
        <p>Manage your contacts with style and ease</p>
      </header>
      
      <main className="app-main">
        <section className="form-section">
          <div className="card">
            <ContactForm onAdd={addContact}/>
          </div>
        </section>
        
        <section className="list-section">
          <div className="card">
            {isLoading && contacts.length === 0 ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading your contacts...</p>
              </div>
            ) : (
              <ContactList
                contacts={contacts}
                page={page}
                total={total}
                totalPages={totalPages}
                onPrev={()=> page > 1 && fetchContacts(page - 1)}
                onNext={()=> page < totalPages && fetchContacts(page + 1)}
                onDelete={deleteContact}
              />
            )}
          </div>
        </section>
      </main>
      
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Contact Book App - Built with ❤️</p>
      </footer>
    </div>
  )
}
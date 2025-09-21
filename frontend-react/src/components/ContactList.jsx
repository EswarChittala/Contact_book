import React, { useState } from 'react'

export default function ContactList({ contacts, page, total, totalPages, onPrev, onNext, onDelete }) {
  const [deletingId, setDeletingId] = useState(null)

  async function handleDelete(id) {
    if(!window.confirm('Are you sure you want to delete this contact?')) return
    
    setDeletingId(id)
    await onDelete(id)
    setDeletingId(null)
  }

  return (
    <div className="contact-list">
      <div className="list-header">
        <h2>Your Contacts</h2>
        <span className="total-contacts">{total} contact{total !== 1 ? 's' : ''}</span>
      </div>
      
      {contacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📱</div>
          <p>No contacts found</p>
          <small>Add your first contact using the form above</small>
        </div>
      ) : (
        <>
          <div className="page-info">
            Showing {contacts.length} of {total} contacts (Page {page} of {totalPages})
          </div>
          
          <ul className="contacts">
            {contacts.map(c => (
              <li key={c._id} className="contact-item">
                <div className="contact-info">
                  <div className="contact-name">{c.name}</div>
                  <div className="contact-details">
                    <span className="contact-email">📧 {c.email}</span>
                    <span className="separator">•</span>
                    <span className="contact-phone">
                      📞 {c.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(c._id)}
                  disabled={deletingId === c._id}
                  className="delete-btn"
                  aria-label="Delete contact"
                  title="Delete contact"
                >
                  {deletingId === c._id ? (
                    <span className="mini-spinner"></span>
                  ) : (
                    <span className="trash-icon">🗑️</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
          
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={onPrev} 
                disabled={page <= 1}
                className="pagination-btn"
                title="Previous page"
              >
                ← Previous
              </button>
              
              <span className="page-numbers">
                Page {page} of {totalPages}
              </span>
              
              <button 
                onClick={onNext} 
                disabled={page >= totalPages}
                className="pagination-btn"
                title="Next page"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
import React from 'react'

export default function ContactList({ contacts, page, total, totalPages, onPrev, onNext, onDelete }) {
  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {contacts.length === 0 && <li>No contacts found</li>}
        {contacts.map(c => (
          <li key={c._id}>
            <div>
              <strong>{c.name}</strong>
              <div>{c.email} • {c.phone}</div>
            </div>
            <button onClick={()=>onDelete(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={onPrev} disabled={page<=1}>Prev</button>
        <span>Page {page} — {total} total</span>
        <button onClick={onNext} disabled={page>=totalPages}>Next</button>
      </div>
    </div>
  )
}

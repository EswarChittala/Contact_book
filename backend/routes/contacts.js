const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contacts  - create contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    // basic validation
    if (!name || !email || !phone) return res.status(400).json({ error: 'Missing fields' });
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\d{10}$/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email' });
    if (!phoneRegex.test(phone)) return res.status(400).json({ error: 'Phone must be 10 digits' });

    const contact = new Contact({ name, email, phone });
    await contact.save();
    return res.status(201).json(contact);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/contacts?page=&limit=  - paginated fetch
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const total = await Contact.countDocuments();
    const contacts = await Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    return res.json({ data: contacts, page, totalPages: Math.ceil(total / limit), total });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/contacts/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

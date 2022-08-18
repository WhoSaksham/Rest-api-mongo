const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Contact = require('../models/Contact')
const { body, validationResult } = require('express-validator');


// Route:1 - Fetch all contacts with pagination @ GET: /api/contacts/getallcontacts?page=1&limit=3 -Authentication required
router.get("/getallcontacts", paginatedResults(), fetchuser, (req, res) => {
    res.json(res.paginatedResults);
});

function paginatedResults() {
    return async (req, res, next) => {

        const page = parseInt(req.query.page); // page refers to the current page you are requesting
        const limit = parseInt(req.query.limit); // limit is the number of documents you wish to retrieve
        const skipIndex = (page - 1) * limit; //skipIndex to skip the relevant number from the result list
        const results = {};

        try {
            results.results = await Contact.find()
                .sort({ _id: 1 }) // it sorts out the list by ID in ascending order
                .limit(limit) // it limits the list according to the user requirements
                .skip(skipIndex) // skips the data as per the page request
                .exec(); // to execute the function
            res.paginatedResults = results;
            next();
        }
        catch (err) {
            console.error(err.message)
            res.status(500).send('Internal Server Error');
        }
    };
}

// Route:2 - Fetch single contact @ GET: /api/contacts/getcontact/:id -Authentication required
router.get('/getcontact/:id', fetchuser, async (req, res) => {
    try {
        const contact = await Contact.findOne({ _id: req.params.id });
        if(!contact) {
            return res.status(404).send('Contact not found');
        }
        res.json(contact);
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Internal Server Error')
    }
});

// Route:3 - Add a new contact @ POST: /api/contacts/addcontact -Authentication required
router.post('/addcontact', fetchuser, [
    // Validations
    body('name', 'Name must be atleast 5 characters').isLength({ min: 5 }),
    body('number', 'Number must be of 10 Digits').isLength(10)
], async (req, res) => {
    // If errors from validation, throw bad request with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        // Check for unique number
        let num = await Contact.findOne({ number: req.body.number });
        if (num) {
            return res.status(400).json({ error: "Sorry a contact with this number already exists" });
        }
        const contact = new Contact(req.body);
        const savedContact = await contact.save();
        res.json(savedContact);
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Internal Server Error')
    }
});

// Route:4 - Adding bulk contacts @ POST: /api/contacts/addbulkcontacts -Authentication required
router.post('/addbulkcontacts', fetchuser, [
    // Validations
    body('*.name', 'Name must be atleast 5 characters').isLength({ min: 5 }),
    body('*.number', 'Number must be of 10 digits').isLength({ min: 10 })
], async (req, res) => {
    // If errors from validation, throw bad request with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        // Check for unique number
        let num = await Contact.findOne({ number: req.body.number });
        if (num) {
            return res.status(400).json({ error: "Sorry a contact with this number already exists" });
        }
        const data = (req.body)
        const contacts = Contact.insertMany([data]);
        res.json({ "Status": "Bulk contacts added successfully", addedContacts: contacts });
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Internal Server Error')
    }
});

// Route:5 - Search contacts with phrases in name and group @ GET: /api/contacts/searchcontact/:key -Authentication required
router.get('/searchcontact/:key', fetchuser, async (req, res) => {
    try {
        let data = await Contact.find({
            "$or": [
                { "name": { $regex: req.params.key } },
                { "group": { $regex: req.params.key } }
            ]
        });
        res.send({ "searchResults": data });
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Internal Server Error')
    }
});

// Route:6 - Update a contact @ PUT: /api/contacts/updatecontact/:id -Authentication required
router.put('/updatecontact/:id', fetchuser, async (req, res) => {
    const { name, number, group } = req.body;

    try {
        // Create a newContact object
        const newContact = {}
        if (name) { newContact.name = name }
        if (number) { newContact.number = number }
        if (group) { newContact.group = group }

        // Find the contact to be updated
        let contact = await Contact.findById(req.params.id);
        if (!contact) { return res.status(404).send('Contact not found') };

        // Update contact
        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: newContact }, { new: true })
        res.json({ "Status": "Contact updated successfully", "updatedContact": contact })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Internal Server Error')
    }
});

// Route:7 - Delete a contact @ DELETE: /api/contacts/deletecontact/:id -Authentication required
router.delete('/deletecontact/:id', fetchuser, async (req, res) => {
    try {
        // Find the contact to be deleted
        let contact = await Contact.findById(req.params.id);
        if (!contact) { return res.status(404).send('Contact not found') };

        // Delete contact
        contact = await Contact.findByIdAndDelete(req.params.id);
        res.json({ "Status": "Contact deleted successfully", "deletedContact": contact })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Internal Server Error')
    }
});

module.exports = router
const { constants } = require("../constants");
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({});
  res.status(constants.SUCCESS).json(contacts);
});

//@desc Get contact by ID
//@route GET /api/contacts/:id
//@access Public
const getContact = asyncHandler(async (req, res) => {
  console.log(`Get contact ${req.params.id}`);
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(constants.NOT_FOUND);
    throw new Error(constants.CONTACTS_NOT_FOUND);
  }
  res.status(constants.SUCCESS).json(contact);
});

//@desc Create contact
//@route POST /api/contacts
//@access Public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error(constants.CONTACTS_ALL_FIELDS);
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  if (!contact) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error(constants.CONTACTS_CREATE);
  }
  console.log(`Contact created: ${contact}`);
  res.status(constants.CREATED).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async (req, res) => {
  console.log(`Update contact ${req.params.id}`);

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error(constants.CONTACTS_ALL_FIELDS);
  }

  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(constants.NOT_FOUND);
    throw new Error(constants.CONTACTS_NOT_FOUND);
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(constants.UPDATED).json(updateContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
  console.log(`Delete contact ${req.params.id}`);

  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(constants.NOT_FOUND);
    throw new Error(constants.CONTACTS_NOT_FOUND);
  }
  await Contact.findByIdAndDelete(req.params.id);

  res
    .status(constants.DELETED)
    .json({ message: `Delete contact ${req.params.id}` });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};

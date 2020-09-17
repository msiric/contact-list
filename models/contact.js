import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: String,
  email: String,
  numbers: [{ number: String, label: String }],
  photo: String,
  created: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', ContactSchema);

Contact.createCollection();

export default Contact;

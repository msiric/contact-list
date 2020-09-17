import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, default: 'Demo' },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
  created: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

User.createCollection();

export default User;

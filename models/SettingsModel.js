import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  createdBy: String,
  selectedPane: String,
  urgency: { type: Number, default: 1 }, //1 day
  sortBy: { type: String, default: 'A-Z' },
  deleteTime: { type: Number, default: 7 }, //7 days
});

export default mongoose.model('Settings', SettingsSchema);

//User is the name of this Model

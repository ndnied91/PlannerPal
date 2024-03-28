import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  createdBy: String,
  selectedPane: String,
  pinnedColor: { type: String, default: '#ffffff' }, //used for selecting color for pinned comments
  // priorityColor: { type: String, default: '#ffffff' }, //used for selecting color for pinned comments
  isUrgentSelected: { type: Boolean, default: 'false' }, //used for is add to call is on by default
  urgency: { type: Number, default: 1 }, //1 day
  sortBy: { type: String, default: 'A-Z' },
  deleteTime: { type: Number, default: 7 }, //7 days
  filterOptions: { type: Array }, //default is an empty array
  currentFilterOption: String, //the current filter is user is on
  isAddToCal: { type: Boolean, default: true }, //for adding a todo to cal
});

export default mongoose.model('Settings', SettingsSchema);

//User is the name of this Model

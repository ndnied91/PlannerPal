import mongoose from 'mongoose';

const ItemsSchema = new mongoose.Schema({
  // id: Number,
  type: String,
  createdBy: String,
  isCompleted: Boolean,
  isPriority: Boolean,
  title: String,
  description: String,
  dueDate: String,
  calCode: String, //for making to calendar event
});

export default mongoose.model('Item', ItemsSchema);

//User is the name of this Model

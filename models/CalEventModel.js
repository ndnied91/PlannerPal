import mongoose from 'mongoose';

const CalEventSchema = new mongoose.Schema({
  createdBy: String,
  day: Number,
  description: String,
  id: Number,
  label: String,
  title: String,
  calCode: String,
});

export default mongoose.model('CalEvent', CalEventSchema);

//Cal event is the name of this Model

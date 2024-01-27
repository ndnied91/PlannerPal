import mongoose from 'mongoose';

const NotesSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdBy: String,
});

export default mongoose.model('Note', NotesSchema);

//User is the name of this Model

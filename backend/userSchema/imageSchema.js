import mongoose from "mongoose";

const imageSchema=mongoose.Schema({
    imageUrl: { type: String, required: true },
  views: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const Image=mongoose.model('Image',imageSchema);
export default Image
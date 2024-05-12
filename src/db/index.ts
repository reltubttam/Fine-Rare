import mongoose from 'mongoose';
import { MONGO_URL } from '../config';

mongoose.connect(MONGO_URL);

const productSchema = new mongoose.Schema({
  vintage: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  producerId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const producerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: false,
  },
  region: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
});
export const Product = mongoose.model('Product', productSchema);
export const Producer = mongoose.model('Producer', producerSchema);
export default mongoose;

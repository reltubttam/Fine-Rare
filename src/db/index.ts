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

const detailedProductSchema = new mongoose.Schema({
  ID: {
    type: String,
    unique: true,
  },
  products: [
    {
      Vintage: {
        type: Number,
      },
      'Product Name': {
        type: String,
      },
      Producer: {
        type: String,
      },
      Country: {
        type: String,
      },
      Region: {
        type: String,
      },
      Colour: {
        type: String,
      },
      Quantity: {
        type: Number,
      },
      Format: {
        type: String,
      },
      'Price (GBP)': {
        type: String,
      },
      Duty: {
        type: String,
      },
      Availability: {
        type: String,
      },
      Conditions: {
        type: String,
      },
      ImageUrl: {
        type: String,
      },
    },
  ],
});

export const Product = mongoose.model('Product', productSchema);
export const Producer = mongoose.model('Producer', producerSchema);
export const detailedProduct = mongoose.model('detailedProduct', detailedProductSchema);
export default mongoose;

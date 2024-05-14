import mongoose, { Product, Producer } from '../db';

interface IProduct {
  _id?: mongoose.Types.ObjectId
  vintage: string
  name: string
  producerId?: mongoose.Types.ObjectId
  producer?: IProducer
}

interface IProducer {
  _id?: mongoose.Types.ObjectId
  name: string
  country?: string
  region?: string
}

export async function getProduct({ id }: { id: string }) {
  try {
    const product = await Product.findById(id);
    if (product?.producerId) {
      const producer = await Producer.findById(product.producerId);
      return {
        ...product,
        producer,
      };
    }
    return product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
export async function getProductsByProducer({ id: producerId }: { id: string }) {
  try {
    const products = await Product.find({ producerId });
    return products;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
export async function createProducts({ products }: { products:IProduct[] }) {
  try {
    const createdProducts:IProduct[] = await Product.insertMany(products.map((product) => {
      const producer = product.producer ? {
        ...product.producer,
        _id: new mongoose.mongo.ObjectId(product.producer._id),
      } : undefined;
      return {
        ...product,
        producerId: product.producerId
          ? new mongoose.mongo.ObjectId(product.producerId)
          : undefined,
        producer,
      };
    }));
    return createdProducts;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
export async function updateProduct(product: IProduct) {
  try {
    if (!product._id) {
      throw new Error('_id required');
    }
    const updatedProduct = await Product.findOneAndUpdate({ _id: product._id }, {
      ...product,
      _id: undefined,
    });
    return updatedProduct;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
export async function deleteUser({ id }: { id: string }) {
  try {
    await Product.findOneAndDelete({ _id: id });
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

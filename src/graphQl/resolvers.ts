import mongoose, { Product, Producer } from '../db';

interface IProduct {
  _id?: mongoose.Types.ObjectId
  vintage: string
  name: string
  producerId: mongoose.Types.ObjectId
  producer: IProducer
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
export async function createProducts(products: IProduct[]) {
  try {
    console.log({products})
    const createdProducts:IProduct[] = await Product.insertMany(products);
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

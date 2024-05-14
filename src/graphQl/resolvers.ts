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

export async function getProduct({ _id }: { _id: string }) {
  try {
    const product = await Product.findById(_id);
    if (product?.producerId) {
      const producer = await Producer.findById(product.producerId);
      return {
        ...product.toJSON(),
        producer,
      };
    }
    return product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
export async function getProductsByProducer({ _id: producerId }: { _id: string }) {
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
export async function updateProduct({ _id, product }: { _id:string, product: IProduct }) {
  try {
    const updatedProduct = await Product.findOneAndUpdate({ _id }, {
      ...product,
      _id: undefined,
    }, { new: true });
    if (!updatedProduct) {
      throw new Error('product not found');
    }
    return updatedProduct;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
export async function deleteProduct({ _id }: { _id: string }) {
  try {
    await Product.findOneAndDelete({ _id });
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

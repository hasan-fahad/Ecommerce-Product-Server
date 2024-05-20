

// Product service


import Product from './product.model'
import FProduct from './product.interface';

const createProductIntoDB = async (productData: FProduct) => {

    const existingProduct = await Product.findOne({name: productData.name});
    if (existingProduct){
        throw new Error(`Product already exists`);
    }
    const Result = await Product.create(productData);
    return Result;

};

export const ProductService = {
    createProductIntoDB
}

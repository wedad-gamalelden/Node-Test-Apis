const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

//get all product
const getProducts = asyncHandler(async (req, res) => {
    try {
        // console.log("in product controller");
        const products = await Product.find({}); //products
        res.status(200).json(products);
    } catch (error) {
        // res.status(500).json({message: error.message})
        res.status(500);
        throw new Error(error.message);
    }
})

//get a single product
const getProduct = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products); 
    } catch (error) {
        // res.status(500).json({message: error.message})
        res.status(500);
        throw new Error(error.message);
    }
})

// create a product
const createProduct = asyncHandler(async (req, res) => {
    //   console.log(req.body);
    //   res.send(req.body);
    
        try {
            const product = await Product.create(req.body);
            res.status(200).json(product);
            
        } catch (error) {
            // console.log(error.message);
            // res.status(500).json({message: error.message})
            res.status(500);
            throw new Error(error.message);
        }
})

// update a product
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
       
        // console.log(product);// old data
        if(!product){ // if product not exists in database
            // return res.status(404).json({message: `cannot find any product with ID ${id}`})
            res.status(404);
            throw new Error(`cannot find any id with ID ${id}`);
        }

        const updatedProduct = await Product.findById(id);

        res.status(200).json(updatedProduct);

    } catch (error) {
        // res.status(500).json({message: error.message})
        res.status(500);
        throw new Error(error.message);
    }
})

//delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    try {
       const {id} = req.params;
       const product = await Product.findByIdAndDelete(id);
       if(!product){
        //    return res.status(404).json({message : `cannot find any id with ID ${id}`});        
        res.status(404);
        throw new Error(`cannot find any id with ID ${id}`);
       }
       res.status(200).json(product);
   
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    //    res.status(500).json({message: error.message})
    }
})


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
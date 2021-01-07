const productModel = require('../models/prouct')
let productList;
exports.getAddProductPage = (req,res,next) => {
    res.status(200).render('add-product',{
        pageTitle : 'Add Product',
        path:'admin/add-product'
    })
}
exports.addProduct = (req,res,next) => {
    const product = new productModel({
        title:req.body.title,
        imageUrl:req.body.imageUrl,
        price:req.body.price,
        description:req.body.description,
        
    });
    product.saveProduct();             
    res.redirect('/');
}
exports.getProductList = (req,res,next) => {
    productModel.fetchAllProducts((products)=>{
        res.status(200).render('shop',{
            products : products,
            pageTitle:'Shopping Page',
            path:'/'
    
        })
    })
    
}
exports.getProductDetails = (req,res,next) => {
    let productId = req.params.productId
    productModel.getProductById(productId,(fetchedProduct)=>{
        res.status(200).render('product-details',{
            product : fetchedProduct,
            pageTitle: 'Product Details',
            path:'/product-details',
            
        })
    })
}

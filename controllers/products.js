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
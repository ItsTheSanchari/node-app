const product = require('../models/prouct')
const cartModel = require('../models/cart')
exports.getAddProductPage = (req, res, next) => {
    res.status(200).render('add-product', {
        pageTitle: 'Add Product',
        path: 'admin/add-product',
        type:'add'
    })
}
exports.addProduct = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
     User = req.user
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl:imageUrl,
        description: description
    }).then((result)=>{
        res.status(200).redirect('/')
     }).catch((err) => {
         console.log('error while inserting',err)
     })
    // productModel.create({
       
    // })
}
exports.getProductList = (req, res, next) => {
    product.findAll().then((allProducts) => {
        res.status(200).render('shop', {
            products: allProducts,
            pageTitle: 'Shopping Page',
            path: '/'

        })
    }).catch((err)=>{

    })
}
exports.getProductDetails = (req, res, next) => {
    let productId = req.params.productId
    product.findByPk(productId).then((fetchedProduct) => {
        res.status(200).render('product-details', {
                    product: fetchedProduct,
                    pageTitle: 'Product Details',
                    path: '/product-details',
                })
    }).catch((err)=>{
        console.log('error while fetching a product')
    })
}
exports.removeProduct = (req, res, next) => {
    let productId = req.params.productId
    product.findByPk(productId).then((productFound) =>{
        return productFound.destroy()
    }).then((result)=>{
        console.log('destroyed',result)
        res.status(200).redirect('/')
    })
    .catch((err) =>{
        console.log('error occurred while deleting a product',err)
    })
}
exports.addProductToCart = (req, res, next) => {
    let productId = req.body.productId
    const Cart = new cartModel()
    cartModel.addProductToCart(productId)
    res.redirect('/')
}
exports.getAllCartData = (req, res, next) => {
    const Cart = new cartModel()
    cartModel.getCartProducts()
}
exports.editProduct = (req,res,next) => {
    let productId = req.body.productId
    product.findByPk(productId).then((fetchedProduct) => {
        res.status(200).render('add-product', {
            pageTitle: 'Edit Product',
            path: 'admin/product-details/edit',
            type: 'edit',
            product:fetchedProduct
        })
    }).catch((err) => {
        console.log('edit product details error',err)
    })
}
exports.editProductDb = (req,res,next) =>{
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    const productId = req.body.productId
    product.update({
        title:title,
        imageUrl:imageUrl,
        price:price,
        description:description
    },
    {
        where: {
            id:productId
        }
    }
    ).then((updatedProduct) => {
        res.status(200).redirect('/')
    }).catch((err) => {
        console.log('error while updating',err)
    })
} 

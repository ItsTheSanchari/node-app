const Product = require('../models/product')
// const userModel = require('../models/User')
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
    const product = new Product({
        title :title,
        price:price,
        description:description,
        imageUrl:imageUrl,
        userId:req.user._id
        }).save().then((result) => {
        console.log('product created',result)
        res.redirect('/')
    }).catch(error => {
        console.log('error',error)
    })
}
exports.getProductList = (req, res, next) => {
    Product.find().then(products => {
        res.status(200).render('shop',{
            products:products,
            pageTitle:'Shopping Page',
            path:'/'
        })
    }).catch(error => {
        console.log('error',error)
    })
}
exports.getProductDetails = (req, res, next) => {
    let productId = req.params.productId
    Product.findById(productId)
    // .select('title price')
    .populate('userId','name -_id')
    .then((result) => {
        console.log('fetched product',result)
       res.status(200).render('product-details',{
           product:result,
           pageTitle:'Product details',
           path:'/admin/product-details'
       })
    })
    .catch(error => {
        console.log('error while getting details',error)
    })
  
}

exports.editProduct = (req, res, next) => {
    let productId = req.body.productId
    Product.findById(productId).then((result)=>{
        console.log('result',result)
        res.status(200).render('add-product', {
                        pageTitle: 'Edit Product',
                        path: 'admin/product-details/edit',
                        type: 'edit',
                        product:result
                    })
    }).catch(error => {
        console.log('error while getting details',error)
    })
}

exports.editProductDb = (req, res, next) => {
    let _id = req.body.productId
    let updatedTitle = req.body.title
    let updatedPrice = req.body.price
    let updatedDescription = req.body.description
    let updatedImgUrl = req.body.imgUrl
    Product.findById(_id).then(productDetails => {
        console.log('productDetails',productDetails)
        productDetails.title = updatedTitle
        productDetails.price = updatedPrice
        productDetails.description = updatedDescription
        productDetails.imgUrl = updatedImgUrl
        return productDetails.save()
    }).then((data) => {
        console.log('updated product',data)
        res.redirect('/')
    }).catch(error => {
        console.log('error',error)
    })
}
exports.removeProduct = (req, res, next) => {
    let productId = req.params.productId
    Product.findByIdAndDelete(productId).then(()=>{
        res.redirect('/')
    }).catch(error => {
        console.log('error occured while deleting....')
    })
   
}
// exports.addProductToCart = (req, res, next) => {
//     let productId = req.body.productId
//     console.log('productId',productId)
//     Product.findById(productId)
//     .then((productDetails) => {
//         console.log('products details',productDetails)
//         req.user.addToCart(productDetails)
//     })
//     .then((result) => {
//         res.redirect('/admin/cart')
//     })
//     .catch(err => {

//     })
// }
// exports.getAllCartData = (req,res,next) => {
//     req.user.getAllCartData().then(cartProducts =>{
//         console.log('cart products',cartProducts)
//         res.status(200).render('cart', {
//             pageTitle: 'Cart',
//             path: '/cart',
//             products:cartProducts
//         })
//     })
// }
// exports.removeCartProduct = (req,res,next) => {
//     console.log('req body',req.body.productId)
//     req.user.removeCartProduct(req.body.productId).then(removedProduct =>{
//         res.redirect('/admin/cart')
//     })
    
// }

// exports.createOrder = (req,res,next) => {
//     req.user.generateOrder().then(result =>{
//         res.redirect('/admin/orders')
//     }).catch(error => {
//         console.log('error while creating an order',error)
//     })
// }

// exports.getOrders = (req,res,next) => {
//     req.user.getOrder().then(order => {
//         console.log('order details',order)
//         res.status(200).render('order',{
//             pageTitle: 'Order',
//             path: '/admin/orders',
//             orders:order
//         })
//     })
// }
const Order = require('../models/Order')
const OrderModel = require('../models/Order')
const Product = require('../models/product')
const User = require('../models/User')
const userModel = require('../models/User')
exports.getLoggedInUser = (req,res,next) => {
    return User.findById(req.session.user.id)
}
exports.getAddProductPage = (req, res, next) => {
    res.status(200).render('add-product', {
        pageTitle: 'Add Product',
        path: 'admin/add-product',
        type:'add',
        isLoggedIn:req.session.isLoggedIn
    })
}
exports.addProduct = (req, res, next) => {
    
    const title = req.body.title
    const imageUrl = req.file
    const price = req.body.price
    const description = req.body.description
    if(!imageUrl) {
        res.status(422).render('add-product', {
            pageTitle: 'Add Product',
            path: 'admin/add-product',
            type:'add',
            isLoggedIn:req.session.isLoggedIn
        })
    }
    const product = new Product({
        title :title,
        price:price,
        description:description,
        imageUrl:imageUrl.path,
        userId:req.session.user._id
        }).save().then((result) => {
        console.log('product created',result)
        res.redirect('/')
    }).catch(error => {
        console.log('error',error)
    })
}
exports.getProductList = (req, res, next) => {
    Product.find().then(products => {
        products.map((eachProduct)=>{
            if(eachProduct.userId.toString() == req.session.user._id.toString()) {
                eachProduct.isEditable = true
            } else {
                eachProduct.isEditable = false
            }
        })
        res.status(200).render('shop',{
            products:products,
            pageTitle:'Shopping Page',
            path:'/',
            auth:req.session.user._id.toString()
            // isLoggedIn:req.session.isLoggedIn,
            // csrfToken : req.csrfToken()
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
           path:'/admin/product-details',
           isLoggedIn:req.session.isLoggedIn
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
    let updatedImgUrl = req.file
    Product.findById(_id).then(productDetails => {
        console.log('productDetails',productDetails)
        productDetails.title = updatedTitle
        productDetails.price = updatedPrice
        productDetails.description = updatedDescription
        productDetails.imgUrl = updatedImgUrl ? updatedImgUrl : productDetails.imgUrl
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
    Product.deleteOne({
        _id:productId,
        userId:req.session.user._id        
    }).then((deletedProduct)=>{
        res.redirect('/')
    }).catch(error => {
        console.log('error occured while deleting....')
    })
   
}
exports.addProductToCart = (req, res, next) => {
    const prodId = req.body.productId;
    let productDetails = null
    Product.findById(prodId)
    .then(product => {
        productDetails = product
        return User.findById(req.session.user._id)
    })
    .then(user => {
        return user.addToCart(productDetails)
    })
    .then((data)=>{
        res.redirect('/admin/cart');
    })
}
exports.getAllCartData = (req,res,next) => {
    User.findById(req.session.user._id).then((userFound)=>{
        userFound.populate('cart.items.productId')
        .execPopulate()
        .then(user =>{
            res.status(200).render('cart', {
            pageTitle: 'Cart',
            path: '/cart',
            products:user.cart.items,
            isLoggedIn : req.session.isLoggedIn
        })
    })
    })
    
}
exports.removeCartProduct = (req,res,next) => {
    console.log('req body',req.body.productId)
    User.findById(req.session.user._id).then((user) => {
        user.removeCartProduct(req.body.productId).then(removedProduct =>{
            res.redirect('/admin/cart')
        })
    }).catch((err)=>{
        console.log('err',err)
    })
    
}

exports.createOrder = (req,res,next) => {
    let UserDetails = null
    User.findById(req.session.user._id).then((user)=> {
        UserDetails = user
        console.log('userDetails',UserDetails)
        UserDetails.populate('cart.items.productId').execPopulate().then((user) =>{
            console.log('result',UserDetails.cart)
            let products = UserDetails.cart.items.map(eachItem => {
                console.log('eachItem',eachItem.productId._doc)
                return {product:{...eachItem.productId._doc},quantity:eachItem.quantity}
            })
            console.log('products',products)
            const Order = new OrderModel({
                user : {
                    name: req.session.user.name,
                    userId: req.session.user._id
                },
                products: [...products]
            })
            return Order.save()
        })
    }).then((Order)=>{
        console.log('created order',Order)
    //    return UserDetails.clearCart()
    }).then(() => {
        return res.redirect('/admin/orders')
    }).catch(error => {
        console.log('error while creating an order',error)
    })
}

exports.getOrders = (req,res,next) => {
    OrderModel.find({
        'user.userId':req.session.user._id
    }).then((orderDetalis) => {
        console.log('orderDetails',orderDetalis)
        orderDetalis.map(eachDetails => {
            eachDetails.products.map(eachProduct => {
                return {
                    product: {...eachProduct},
                    quantity:eachProduct.quantity
                }
                // return {
                //     orderId:eachDetails._id,
                //     quantity: 
                // }
            })
        })
        res.status(200).render('order',{
            pageTitle: 'Order',
            path: '/admin/orders',
            orders:orderDetalis,
            isLoggedIn:req.session.isLoggedIn
        })
    })
    // req.user.getOrder().then(order => {
    //     console.log('order details',order)
    //     
    // })
}
const Product = require('../models/product')
// const Cart = require('../models/Cart')
// const CartItems = require('./../models/Cart-Item')
// const Order = require('../models/Order')
// const OrderItem = require('../models/Order-Items')
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
    const product = new Product(title,price,description,imageUrl)
    Product.save().then((result) => {
        console.log('product created',result)
        res.redirect('/')
    }).catch(error => {
        console.log('error',error)
    })
}
exports.getProductList = (req, res, next) => {
    Product.getProductList().then(products => {
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
    Product.getProductDetails(productId)
    .then((result) => {
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
    Product.getProductDetails(productId).then((result)=>{
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
    const product = new Product(updatedTitle,updatedPrice,updatedDescription,updatedImgUrl,_id)
    product.save().then(() => {
        res.redirect('/')
    }).catch(error => {

    })
}
// exports.removeProduct = (req, res, next) => {
//     let productId = req.params.productId
//     product.findByPk(productId).then((productFound) =>{
//         return productFound.destroy()
//     }).then((result)=>{
//         console.log('destroyed',result)
//         res.status(200).redirect('/')
//     })
//     .catch((err) =>{
//         console.log('error occurred while deleting a product',err)
//     })
// }
// exports.addProductToCart = (req, res, next) => {
//     let productId = req.body.productId
//     let fetchedCart;
//     req.user.getCart().then((cart)=>{
//         fetchedCart = cart
//         cart.getProducts({
//             where:{
//                 id:productId
//             }
//         })
//         .then((products) =>{
//             let fetchedProduct;
//             let quantity = 1;
//           if(products.length > 0) {
//             fetchedProduct = products[0]
//           }
//           if(fetchedProduct){
//               quantity = fetchedProduct.cartItem.quantity+1
//           }
//             return product.findByPk(productId).then((actualproduct)=>{
//                 return fetchedCart.addProduct(actualproduct,{
//                     through : {
//                         quantity:quantity
//                     }
//                 })
//             })
//             .then((data)=>{
//                 res.status(200).redirect('/admin/cart')
//             })
//             .catch((err)=>{})         

//           if(product) {

//           }
//         })
//     }).catch((err) => {
//         console.log('error while fetching a cart',err)
//     })
//     // res.redirect('/')
// }
// exports.getAllCartData = (req, res, next) => {
//     req.user
//     .getCart()
//     .then(cart => {
//       return cart
//         .getProducts()
//         .then(products => {
           
//           res.render('cart', {
//             path: 'admin/cart',
//             pageTitle: 'Your Cart',
//             products: products
//           });
//         })
//         .catch(err => console.log(err));
//     })
//     .catch(err => console.log(err));
// }
exports.editProduct = (req,res,next) => {
    let productId = req.body.productId
    Product.getProductDetails(productId).then((fetchedProduct) => {
        console.log('fetchedProduct',fetchedProduct)
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
// exports.editProductDb = (req,res,next) =>{
//     const title = req.body.title
//     const imageUrl = req.body.imageUrl
//     const price = req.body.price
//     const description = req.body.description
//     const productId = req.body.productId
//     product.update({
//         title:title,
//         imageUrl:imageUrl,
//         price:price,
//         description:description
//     },
//     {
//         where: {
//             id:productId
//         }
//     }
//     ).then((updatedProduct) => {
//         res.status(200).redirect('/')
//     }).catch((err) => {
//         console.log('error while updating',err)
//     })
// }
// exports.removeCartProduct = (req,res,next) => {
//     const productId = req.body.productId
//     const cartId = req.body.cartId

//     const cartItems = CartItems.findAll({
//         where : {
//             productId : productId,
//             cartId : cartId
//         }
//     }).then((cartItems) => {
//         let currentCartItem = cartItems[0]
//         if(currentCartItem.quantity > 1) {
//             let newQuantity = currentCartItem.quantity-1
//             return currentCartItem.update({
//                 quantity : newQuantity
//             })
//         } else {
//             return currentCartItem.destroy()
//         }


//     }).then((cartItem) => {
//        res.redirect('/admin/cart')
//     }).catch((err)=>{

//     })
    
    
// }

// exports.createOrder = (req, res, next) => {
//     let fetchedCart;
//     req.user
//       .getCart()
//       .then(cart => {
//         fetchedCart = cart;
//         return cart.getProducts();
//       })
//       .then(products => {
//         return req.user
//           .createOrder()
//           .then(order => {
//             return order.addProducts(
//               products.map(product => {
//                 product.orderItem = { quantity: product.cartItem.quantity };
//                 return product;
//               })
//             );
//           })
//           .catch(err => console.log(err));
//       })
//       .then(result => {
//         return fetchedCart.setProducts(null);
//       })
//       .then(result => {
//         res.redirect('/admin/orders');
//       })
//       .catch(err => console.log(err));
//   };

// exports.getOrders = (req,res,next) => {
//     req.user.getOrders({
//         include : ['products']
//     }).then((orders)=>{
//         console.log('orders',orders)
//         res.render('order',{
//             path :'/admin/order',
//             pageTitle:'Your Order',
//             orders:orders            
//         })
//     }).catch((err) =>{
//         console.log('err',err)
//     })
// }

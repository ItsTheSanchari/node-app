const product = require('../models/prouct')
const Cart = require('../models/Cart')
const CartItems = require('./../models/Cart-Item')
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
}
exports.getProductList = (req, res, next) => {
    req.user.getProducts().then((allProducts) => {
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
    // product.findByPk(productId)
    req.user.getProducts({
        where :{
            id:productId
        }
    }).then((fetchedProducts) => {
        res.status(200).render('product-details', {
                    product: fetchedProducts[0],
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
    let fetchedCart;
    req.user.getCart().then((cart)=>{
        fetchedCart = cart
        cart.getProducts({
            where:{
                id:productId
            }
        })
        .then((products) =>{
            let fetchedProduct;
            let quantity = 1;
          if(products.length > 0) {
            fetchedProduct = products[0]
          }
          if(fetchedProduct){
              quantity = fetchedProduct.cartItem.quantity+1
          }
            return product.findByPk(productId).then((actualproduct)=>{
                return fetchedCart.addProduct(actualproduct,{
                    through : {
                        quantity:quantity
                    }
                })
            })
            .then((data)=>{
                res.status(200).redirect('/admin/cart')
            })
            .catch((err)=>{})         

          if(product) {

          }
        })
    }).catch((err) => {
        console.log('error while fetching a cart',err)
    })
    // res.redirect('/')
}
exports.getAllCartData = (req, res, next) => {
    req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
           
          res.render('cart', {
            path: 'admin/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
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

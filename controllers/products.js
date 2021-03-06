const productModel = require('../models/prouct')
const cartModel = require('../models/cart')
exports.getAddProductPage = (req, res, next) => {
    res.status(200).render('add-product', {
        pageTitle: 'Add Product',
        path: 'admin/add-product'
    })
}
exports.addProduct = (req, res, next) => {
    const product = new productModel({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description,

    });
    product.saveProduct().then(() => {
        res.redirect('/');
    }).catch(err => {
        console.log('err occurred', err)
    });

}
exports.getProductList = (req, res, next) => {
    productModel.fetchAllProducts().then(([rows, fieldData]) => {
        res.status(200).render('shop', {
            products: rows,
            pageTitle: 'Shopping Page',
            path: '/'

        })
    }).catch((err) => {
        console.log('err occured while fetching', err)
    })
}
exports.getProductDetails = (req, res, next) => {
    let productId = req.params.productId
    productModel.getProductById(productId).then((fetchedProduct) => {
        res.status(200).render('product-details', {
            product: fetchedProduct,
            pageTitle: 'Product Details',
            path: '/product-details',
        })
    }).catch((err) => {
        console.log('err', err)
    })
    //  (fetchedProduct) => {
    //     res.status(200).render('product-details', {
    //         product: fetchedProduct,
    //         pageTitle: 'Product Details',
    //         path: '/product-details',

    //     })
    // }
    // )
}
exports.removeProduct = (req, res, next) => {
    let productId = req.params.productId
    productModel.removeProductById(productId, products => {
        res.status(200).render('shop', {
            products: products,
            pageTitle: 'Shopping Page',
            path: '/'
        })
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
    // cartData => {
    // res.status(200).render('cart',{
    //     products: cartData,
    //     pageTitle: 'Cart Page',
    //     path: '/'
    // })
    // })
} 

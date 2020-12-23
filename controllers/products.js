const product = []
exports.getAddProductPage = (req,res,next) => {
    res.status(200).render('add-product',{
        pageTitle : 'Add Product',
        path:'admin/add-product'
    })
}
exports.addProduct = (req,res,next) => {
    product.push({
        title : req.body.title,
        path: 'admin/add-product'
    })
    res.redirect('/')
}
exports.getProductList = (req,res,next) => {
    res.status(200).render('shop',{
        products : product,
        pageTitle:'Shopping Page',
        path:'/'

    })
}
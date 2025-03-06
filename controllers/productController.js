const { Product } = require("../models")

class ProductController {
    static async index(req, res) {
        try {
            const products = await Product.findAll()
            res.render(`/${ isAdmin ? "admin" : "customer" }/template`, { body: "products" })
        } catch (e) {
            res.send(e.message)
        }
    }
}

module.exports = ProductController
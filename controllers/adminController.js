const { Product, Category } = require("../models")

class AdminController {
    static async index(_, res) {
        try {
            const categories = await Category.findAll({ include: Product })
            res.render("admin/template", { body: "index", title: "Dashboard", categories })
        } catch (e) {
            res.send(e.message)
        }
    }

    static async categories(_, res) {
        try {
            const products = await Product.findAll()
            res.render("/admin/template", { body: "products", title: "List Products", products })
        } catch (e) {
            res.send(e.message)
        }
    }

    static async showCategory(req, res) {
        try {
            const products = await Product.findAll()
            res.render("/admin/template", { body: "products", title: "List Products", products })
        } catch (e) {
            res.send(e.message)
        }
    }

    static async products(_, res) {
        try {
            const products = await Product.findAll()
            res.render("/admin/template", { body: "products", title: "List Products", products })
        } catch (e) {
            res.send(e.message)
        }
    }

    static async addProduct(_, res) {
        try {
            const categories = await Category.findAll()
            res.render("/admin/template", { body: "form", title: "Add Product", categories })
        } catch (e) {
            res.send(e.message)
        }
    }

    static async createProduct(req, res) {
        try {
            const product = await Product.create(req.body)
            res.redirect("/admin/product/" + product.id)
        } catch (e) {
            res.send(e.message)
        }
    }

    static async showProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id)
            res.render("/admin/template", { body: "product", title: product.name, product })
        } catch (e) {
            res.send(e.message)
        }
    }

    static async editProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id)
            res.render("/admin/template", { body: "form", title: "Edit Product", product })
        } catch (e) {
            res.send(e.message)
        }
    }

    static async updateProduct(req, res) {
        try {
            const products = await Product.findAll()
            res.render("/admin/template", { body: "products", title: "List Products", products })
        } catch (e) {
            res.send(e.message)
        }
    }

    static async deleteProduct(req, res) {
        try {
            const products = await Product.findAll()
            res.render("/admin/template", { body: "products", title: "List Products", products })
        } catch (e) {
            res.send(e.message)
        }
    }
}

module.exports = AdminController
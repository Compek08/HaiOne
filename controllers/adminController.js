const { Product, Category, Profile } = require("../models")

class AdminController {
    static async index(_, res) {
        try {
            const categories = await Category.findAll({ include: Product })
            res.render("admin/template", { body: "index", title: "Dashboard", categories })
        } catch (e) {
            res.send(e.message)
        }
    }

    static async profile(req, res) {
        try {
            const profile = await Profile.findOne({ where: { UserId: req.user.id } })
            const categories = await Category.findAll()
            res.render("admin/template", { body: "profile", title: "User Profile", profile, categories })
        } catch (e) {
            res.send(e.message)
        }
    }

    static async updateProfile(req, res) {
        try {
            const { field, value } = req.body;
            if (!field || value === undefined) {
                return res.status(400).json({ error: "Invalid request data" });
            }
            const updatedProfile = await Profile.updateOneAttribute(req.user.id, field, value);
            res.json({ success: true, profile: updatedProfile });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async showCategory(req, res) {
        try {
            const products = await Category.findByPk(req.params.id, { include: Product })
            const categories = await Category.findAll()
            res.render("admin/template", { body: "category", title: `Category ${ products.name }`, products, categories })
        } catch (e) {
            res.send(e.message)
        }
    }

    static async products(_, res) {
        try {
            const products = await Product.findAll()
            const categories = await Category.findAll()
            res.render("admin/template", { body: "products", title: "List Products", products, categories })
        } catch (e) {
            res.send(e.message)
        }
    }

    static async addProduct(_, res) {
        try {
            const categories = await Category.findAll()
            res.render("admin/template", { body: "form", title: "Add Product", create: true, categories })
        } catch (e) {
            res.send(e.message)
        }
    }

    static async createProduct(req, res) {
        try {
            const product = await Product.create(req.body)
            res.redirect("/admin/products/" + product.id)
        } catch (e) {
            res.send(e.message)
        }
    }

    static async showProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id, { include: Category })
            const categories = await Category.findAll()
            res.render("admin/template", { body: "product", title: product.name, product, categories })
        } catch (e) {
            res.send(e.message)
        }
    }

    static async editProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id)
            const categories = await Category.findAll()
            res.render("admin/template", { body: "form", title: "Edit Product", create: false, product, categories })
        } catch (e) {
            res.send(e.message)
        }
    }

    static async updateProduct(req, res) {
        try {
            const product = await Product.update(req.body, where = { id: req.params.id })
            res.redirect(`/admin/products/${ product.id }`)
        } catch (e) {
            res.send(e.message)
        }
    }

    static async deleteProduct(req, res) {
        try {
            let product = await Product.findByPk(req.params.id)
            product.destroy()
            res.redirect("/admin/products")
        } catch (e) {
            console.log(e);

            res.send(e.message)
        }
    }
}

module.exports = AdminController
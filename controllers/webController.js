const { Product, Transaction, Category } = require("../models");

class WebController {
  static async home(_, res) {
    try {
      let category = await Category.findAll({ include: Product });
      res.render("customer/template", {
        category,
        body: "index",
      });
    } catch (error) {
      res.send(error);
    }
  }
  static async login(_, res) {
    try {
      res.render("customer/template", { body: "login" });
    } catch (error) {
      res.send(error);
    }
  }

  static async register(_, res) {
    try {
      res.render("customer/signup", { body: "signup" });
    } catch (error) {
      res.send(error);
    }
  }

  static async category(_, res) {
    try {
      let category = await Category.findAll();
      res.render("customer/template", {
        category,
        body: "category",
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async categoryId(req, res) {
    try {
      const { id } = req.params;
      let category = await Category.findByPk(id, { include: Product });
      res.render("customer/template", {
        category,
        body: "categoryId",
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async productId(req, res) {
    try {
      const { id } = req.params;
      let product = await Product.findByPk(id, { include: Category });
      res.render("customer/template", {
        product,
        body: "product",
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async showCart(_, res) {
    try {
      res.render("customer/cart", { body: "cart" });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = WebController;

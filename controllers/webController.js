const { Product, Transaction, Category } = require("../models");
const { formatRupiah } = require("../helpers/helper");

class WebController {
  static async home(_, res) {
    try {
      let category = await Category.findAll({ include: Product });
      res.render("customer/template", {
        category,
        body: "index",
        formatRupiah,
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
      //   res.send(category);
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

  static async productId(_, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  static async addCart(_, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  static async handlerAddCart(_, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteCart(_, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = WebController;

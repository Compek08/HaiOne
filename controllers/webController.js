const {
  Product,
  Transaction,
  Category,
  DetailTransaction,
  User,
} = require("../models");
const { Op } = require("sequelize");

class WebController {
  static async home(req, res) {
    try {
      const { search } = req.query;
      let category = await Category.findAll({
        include: {
          model: Product,
          include: Category,
          where: search ? { name: { [Op.iLike]: `%${search}%` } } : {},
        },
      });

      res.render("customer/template", {
        category,
        body: "index",
        search,
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
      res.render("customer/template", { body: "cart" });
    } catch (error) {
      res.send(error);
    }
  }

  static async transaction(req, res) {
    try {
      let transactions = await DetailTransaction.findAll({
        include: Transaction,
      });

      res.render("customer/template", {
        body: "transaction",
        transactions,
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async detailTransaction(req, res) {
    try {
      const { id } = req.params;
      let transaction = await DetailTransaction.findByPk(id, {
        include: [
          {
            model: Transaction,
            include: User,
          },
          Product,
        ],
      });

      res.render("customer/template", {
        body: "detailTransaction",
        transaction,
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async checkout(req, res) {
    try {
      console.log("Session User ID:", req.session.userId);
      const userId = req.session.userId;

      if (!userId) {
        return res.status(400).send("User not logged in.");
      }

      const cart = JSON.parse(req.body.cart);
      if (!cart || cart.length === 0) {
        return res.status(400).send("Cart is empty");
      }

      const newTransaction = await Transaction.create({
        status: "pending",
        UserId: userId,
      });

      const detailPromises = cart.map(async (item) => {
        const product = await Product.findByPk(item.id);
        if (product.stock < item.quantity) {
          throw new Error(`Stock not enough for ${product.name}`);
        }
        await product.update({ stock: product.stock - item.quantity });

        return DetailTransaction.create({
          TransactionId: newTransaction.id,
          ProductId: item.id,
          quantity: item.quantity,
        });
      });

      await Promise.all(detailPromises);

      res.redirect(`/transaction/${newTransaction.id}`);
    } catch (error) {
      console.error(error);
      ing;
      res.status(500).send(error.message);
    }
  }
}

module.exports = WebController;

class WebController {
  static async home(_, res) {
    try {
      res.render("customer/template", { title: "Home" });
    } catch (error) {
      res.send(error);
    }
  }
  static async login(_, res) {
    try {
      res.render("customer/template", { body: "index", title: "Dashboard" });
    } catch (error) {
      res.send(error);
    }
  }

  static async register(_, res) {
    try {
      res.render("customer/signup", { body: "index", title: "Dashboard" });
    } catch (error) {
      res.send(error);
    }
  }

  static async category(_, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  static async categoryId(_, res) {
    try {
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

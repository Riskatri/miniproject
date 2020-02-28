const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");
// const orderController = require("../controller/orderController");
const artikelController = require("../controller/artikelController");
// const validController = require("../controller/validController");

module.exports = function(app) {
  // register dan login
  app.post(
    "/signup",
    [
      verifySignUp.checkDuplicateUserNameOrEmail
      // verifySignUp.checkRolesExisted
    ],
    authController.validate("signup"),
    authController.signup
  );
  app.post("/login", authController.signin);

  //   // get all user
  app.post("/users", [authJwt.verifyToken], userController.users); // get 1 user according to roles
  app.get("/users", [authJwt.verifyToken], userController.users);
  app.get("/users/:id", [authJwt.verifyToken], userController.userbyid);
  app.put(
    "/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.updateUser
  );

  //   //artikel
  app.post(
    //tambah autjwt admin
    "/articles/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    // validController.checkValidationBook,
    artikelController.validate("artikel"),
    artikelController.artikel
  );

  app.get("/articles", [authJwt.verifyToken], artikelController.tampilartikel);
  app.get(
    "/articles/:id",
    [authJwt.verifyToken],
    artikelController.findartikelbyid
  );

  app.put(
    "/articles/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    artikelController.updateArtikel
  );
  app.delete(
    "/articles/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    artikelController.updateArtikel
  );

  //   //order
  //   app.post("/orders/:id", [authJwt.verifyToken], orderController.Order);
  //   app.get("/orders", [authJwt.verifyToken], orderController.users);
  //   app.get("/orders/:id", [authJwt.verifyToken], orderController.userContent);
};

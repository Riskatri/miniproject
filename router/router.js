const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");
const commentController = require("../controller/commentController.js");
const artikelController = require("../controller/artikelController.js");
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
    [authJwt.verifyToken],

    artikelController.validate("artikel"),
    artikelController.artikel
  );

  app.get("/articles", [authJwt.verifyToken], artikelController.tampilartikel);
  app.get(
    "/get/articles/:id",
    [authJwt.verifyToken],
    artikelController.artikelId
  );

  app.get("/guess/articles", artikelController.tampilartikelguess);
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
    artikelController.deleteArtikel
  );

  //   komentar
  app.post(
    "/comments/:userId/:artikelId",
    [authJwt.verifyToken],
    commentController.komentar
  );
  app.get("/comments", [authJwt.verifyToken], commentController.tampilkomentar);
  app.get(
    "/comments/:id",
    [authJwt.verifyToken],
    commentController.komentarbyid
  );

  app.put(
    //tmbh aut admin
    "/comments/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    commentController.updateKomentar
  );

  app.delete(
    //tmbh aut admin
    "/comments/:id",
    [authJwt.verifyToken],
    commentController.deleteKomentar
  );
};

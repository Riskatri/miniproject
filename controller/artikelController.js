const db = require("../config/db.js");
const config = require("../config/config.js");
const Artikel = db.artikel;
const User = db.user;
const Komentar = db.komentar;
const asyncMiddleware = require("express-async-handler");
const { validationResult } = require("express-validator/check");
const { body } = require("express-validator/check");

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.validate = method => {
  switch (method) {
    case "artikel": {
      return [body("judul", "maksimal 50 kata").isLength({ max: 50 })];
    }
  }
};

//post an article
exports.artikel = asyncMiddleware(async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).json({ errors: errors.array() });
      return;
    }
    await Artikel.create({
      judul: req.body.judul,
      isi: req.body.isi,
      userId: req.params.id,
      status: req.body.status
    });
    res.status(201).send({
      status: "Artikel has been created!"
    });
  } catch (err) {
    return next(err);
  }
});

//menampilkan semua artikel include user
exports.tampilartikel = asyncMiddleware(async (req, res) => {
  const artikel = await Artikel.findAll({
    attributes: ["id", "judul", "isi", "userId", "status", "createdAt"],
    include: [
      {
        model: Komentar,
        attributes: ["id", "isi_comment", "userId", "createdAt"]
      }
    ]
  });
  res.status(200).json({
    description: "All Artikel",
    artikel: artikel
  });
});

exports.tampilartikelguess = asyncMiddleware(async (req, res) => {
  const artikel = await Artikel.findAll({
    attributes: ["id", "judul", "isi", "userId", "status", "createdAt"]
  });
  res.status(200).json({
    description: "All Artikel",
    artikel: artikel
  });
});

// //mencari artikel berdasarkan id user
exports.findartikelbyid = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: ["id", "name", "username"],
    include: [
      {
        model: Artikel,
        attributes: ["id", "judul", "isi", "createdAt"]
      }
    ]
  });
  res.status(200).json({
    description: "artikel by id",
    user: user
  });
});

exports.artikelId = asyncMiddleware(async (req, res) => {
  const artikel = await Artikel.findAll({
    where: { id: req.params.id },
    attributes: ["id", "judul", "isi", "createdAt"],
    include: [
      {
        model: Komentar,
        attributes: ["id", "isi_comment", "userId"]
      }
    ]
  });
  res.status(200).json({
    description: "artikel by id",
    artikel: artikel
  });
});

exports.updateArtikel = asyncMiddleware(async (req, res) => {
  const artikel = await Artikel.update(
    {
      status: req.body.status
    },
    { where: { id: req.params.id } }
  );
  // const statusIsValid = (req.body.status, artikel.status);
  if (artikel.status === true) {
    return res.status(201).send({
      reason: "article show"
    });
  } else {
    return res.status(201).send({
      reason: "article hide"
    });
  }
});

exports.deleteArtikel = asyncMiddleware(async (req, res) => {
  await Artikel.destroy({ where: { id: req.params.id } });
  res.status(201).send({
    status: "artikel has been delete"
  });
});

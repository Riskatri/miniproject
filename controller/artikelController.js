const db = require("../config/db.js");
const config = require("../config/config.js");
const Artikel = db.artikel;
const asyncMiddleware = require("express-async-handler");
const { validationResult } = require("express-validator/check");
const { body } = require("express-validator/check");

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.validate = method => {
  switch (method) {
    case "artikel": {
      return [body("isi", "maksimal 300 kata").isLength({ max: 300 })];
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

//menampilkan semua artikel
exports.tampilartikel = asyncMiddleware(async (req, res) => {
  const artikel = await Artikel.findAll({
    attributes: ["id", "judul", "isi", "userId", "status"]
  });
  res.status(200).json({
    description: "All Artikel",
    artikel: artikel
  });
});

// //mencari artikel berdasarkan id
exports.findartikelbyid = asyncMiddleware(async (req, res) => {
  const artikel = await Artikel.findOne({
    where: { id: req.params.id },
    attributes: ["id", "judul", "isi", "userId", "status"]
  });
  res.status(200).json({
    description: "artikel by id",
    artikel: artikel
  });
});

exports.updateArtikel = asyncMiddleware(async (req, res) => {
  await Artikel.update(
    {
      judul: req.body.judul,
      isi: req.body.isi,
      userId: req.params.id,
      status: req.body.status
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Artikel has been update!"
  });
});

exports.deleteArtikel = asyncMiddleware(async (req, res) => {
  await Artikel.destroy({ where: { id: req.params.id } });
  res.status(201).send({
    status: "artikel has been delete"
  });
});

const db = require("../config/db.js");
const config = require("../config/config.js");
const Komentar = db.komentar;
const Artikel = db.artikel;
const User = db.user;
const asyncMiddleware = require("express-async-handler");
const { validationResult, body } = require("express-validator");

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.validate = method => {
  switch (method) {
    case "comment": {
      return [body("isi_comment", "maksimal 300 kata").isLength({ max: 300 })];
    }
  }
};

//post a comment
exports.komentar = asyncMiddleware(async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).json({ errors: errors.array() });
      return;
    }

    await Komentar.create({
      isi_comment: req.body.isi_comment,
      status: req.body.status,
      artikelId: req.params.artikelId,
      userId: req.params.userId
    });

    res.status(201).send({
      status: "Comment has been created!"
    });
  } catch (err) {
    return next(err);
  }
});

//include user
exports.tampilkomentar = asyncMiddleware(async (req, res) => {
  const artikel = await Artikel.findAll({
    where: { id: req.params.id },
    attributes: ["id", "judul", "isi"],
    include: [
      {
        model: Komentar,
        attributes: ["id", "isi_comment", "status", "artikelId", "userId"],
        include: [
          {
            model: User,
            attributes: ["name"]
          }
        ]
      }
    ]
  });
  res.status(200).json({
    description: "All komentar",
    artikel: artikel
  });
});

exports.komentarbyid = asyncMiddleware(async (req, res) => {
  const artikel = await Artikel.findOne({
    where: { id: req.params.id },
    attributes: ["judul", "isi"],
    include: [
      {
        model: Komentar,
        where: { status: true },
        attributes: ["id", "isi_comment", "status", "artikelId", "userId"],
        required: false,
        require: false,
        include: [
          {
            model: User,
            attributes: ["name"]
          }
        ]
      }
    ]
  });
  res.status(200).json({
    description: "comment by id",
    artikel: artikel
  });
});

exports.updateKomentar = asyncMiddleware(async (req, res) => {
  const komentar = await Komentar.update(
    {
      status: req.body.status //bisa bernilai true
    },
    { where: { id: req.params.id } }
  );
  // const statusIsValid = (req.body.status, komentar.status);
  if (komentar.status === true) {
    return res.status(201).send({
      status: "komentar aktif"
    });
  } else {
    return res.status(201).send({
      status: "komentar  non aktif"
    });
  }
});

exports.deleteKomentar = asyncMiddleware(async (req, res) => {
  await Komentar.destroy({ where: { id: req.params.id } });
  res.status(201).send({
    status: "comment has been delete"
  });
});

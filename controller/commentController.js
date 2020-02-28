const db = require("../config/db.js");
const config = require("../config/config.js");
const Comment = db.comment;
const asyncMiddleware = require("express-async-handler");
const { validationResult } = require("express-validator/check");
const { body } = require("express-validator/check");

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.validate = method => {
  switch (method) {
    case "comment": {
      return [body("isi", "maksimal 300 kata").isLength({ max: 300 })];
    }
  }
};

//post a comment
exports.comment = asyncMiddleware(async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).json({ errors: errors.array() });
      return;
    }
    await Comment.create({
      isi_comment: req.body.isi_comment,
      status: req.body.status,
      artikelId: req.body.id,
      userId: req.params.id
    });
    res.status(201).send({
      status: "Comment has been created!"
    });
  } catch (err) {
    return next(err);
  }
});

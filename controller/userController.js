const db = require("../config/db.js");
const User = db.user;
const Role = db.role;
const asyncMiddleware = require("express-async-handler");

exports.users = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["id", "name", "username", "email", "admin", "status"]
  });
  res.status(200).json({
    description: "All User",
    user: user
  });
});

exports.userbyid = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: ["id", "name", "username", "email", "admin", "status"]
  });
  res.status(200).json({
    description: "User by Id",
    user: user
  });
});

exports.updateUser = asyncMiddleware(async (req, res) => {
  await User.update(
    {
      userId: req.body.id,
      status: req.body.status
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "User has been update!"
  });
});

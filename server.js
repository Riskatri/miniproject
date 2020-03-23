var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(cors());
require("./router/router.js")(app);
app.use(fileUpload());
app.use(express.static("./public/uploads"));
// const db = require("./config/db.js");
// const Role = db.role;

// // //force: true will drop the table if it already exists (comment this part after first run, to disable migration)
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync with { force: true }");
//   //   //   initial();
// });
//require('./app/route/project.route.js')(app);
// Create a Server
app.post("/upload", function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let sampleFile = req.files.file;

  let file_name = Date.now() + "_" + sampleFile.name;
  sampleFile.mv(`./public/uploads/${file_name}`, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200).send({
      status: "File uploaded!",
      title: req.body.title,
      url: file_name
    });
  });
});

var server = app.listen(7000, "127.0.0.1", function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
// function initial() {
//   Role.create({
//     id: 1,
//     name: "USER"
//   });
//   Role.create({
//     id: 2,
//     name: "ADMIN"
//   });
//   Role.create({
//     id: 3,
//     name: "PM"
//   });
// }

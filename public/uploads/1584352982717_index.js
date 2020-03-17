const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.static('./public/uploads/'));

app.use(morgan('dev'));
app.use(express.json());

app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let sampleFile = req.files.file;
  
  let file_name = Date.now() + '_' + sampleFile.name;
  sampleFile.mv(`./public/uploads/${file_name}`, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200).send({
      status: 'File uploaded!',
      title: req.body.title,
      url: file_name
    });
  });
});

// Create a Server
const server = app.listen(8000, '127.0.0.1', function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

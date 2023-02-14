const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.post('/upload', (req, res) => {
  const imageDataUrl = req.body.imageDataUrl;
  const imageData = imageDataUrl.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(imageData, 'base64');

  fs.writeFile('image.jpg', buffer, err => {
    if (err) {  res.status(500).send({ error: 'Error saving image' })} 
    else {  res.send({ message: 'Image uploaded' })  }
  });

});

app.listen(3000, () => { console.log('Server started on port 3000') });
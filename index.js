
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const qrcode = require('qrcode');
const fs = require('fs');

app.use(bodyParser.json());

app.post('/url2qr', async (req, res) => {
  const { url } = req.body;

  try {
    const pngBuffer = await qrcode.toBuffer(url, { type: 'png' });
    const timestamp = new Date().getTime();
    const fileName = `qr/${timestamp}.png`;

    fs.writeFileSync(fileName, pngBuffer);

    res.status(200).sendFile(fileName, { root: __dirname });
  } catch (error) {
    res.status(500).send({ error: 'Could not generate QR code' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

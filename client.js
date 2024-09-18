const crypto = require('crypto');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// this public key validator has only one client. That client sets their password via the command line
// when starting the server
let client01PasswordSalt = crypto.randomBytes(128).toString('base64');
let client01Password;

let client01PrivateKeySalt = crypto.randomBytes(128).toString('base64');
let client01PrivateKey;

// on startup, we hash the password from the command line and store it in memory (in lieu of a real database)
client01Password = crypto.createHmac('sha256', process.argv[2])
  .update(client01PasswordSalt)
  .digest('hex');

// then we wait for the client to set their public key
app.post('/set-public-key', (req, res) => {
  const { password, publicKey } = req.body;
  // if the password is incorrect, return unauthorized
  if (crypto.createHmac('sha256', password)
    .update(client01PasswordSalt)
    .digest('hex') !== client01Password) {
    return res.status(401).send('Unauthorized');
  }
  // if the password is correct, set the public key
  client01PrivateKey = crypto.createHmac('sha256', publicKey)
    .update(client01PrivateKeySalt)
    .digest('hex');
  res.send({ publicKeySet: true });
});

// then we wait for a signed message to verify
app.post('/verify-message', (req, res) => {
  const { message, signature } = req.body;
  // compare the signature to the private key
  const messageValidated = crypto.createHmac('sha256', signature)
    .update(client01PrivateKeySalt)
    .digest('hex') === client01PrivateKey;
  res.send({ message, messageValidated });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const crypto = require('crypto');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// this public key validator has only one user, "client01". That user's password is set via the command line
// when starting the server
const client01PasswordSalt = crypto.randomBytes(128).toString('base64');
const client01PrivateKeySalt = crypto.randomBytes(128).toString('base64');

let client01PublicKey;
let client01PrivateKey;

function signMessage(privateKey, message) {
  return crypto.createHmac('sha256', privateKey)
    .update(message)
    .digest('hex');
}

// on startup, we hash the password from the command line and store it in memory (in lieu of a real database)
const client01Password = crypto.createHmac('sha256', process.argv[2])
  .update(client01PasswordSalt)
  .digest('hex');

// then we wait for the user to set their public key
app.post('/setPublicKey', (req, res) => {
  const { password, publicKey } = req.body;
  // if the password is incorrect, return unauthorized
  if (crypto.createHmac('sha256', password)
    .update(client01PasswordSalt)
    .digest('hex') !== client01Password) {
    return res.status(401).send('Unauthorized');
  }
  // if the password is correct, set and return the public and private keys
  client01PrivateKey = crypto.createHmac('sha256', publicKey)
    .update(client01PrivateKeySalt)
    .digest('hex');
  client01PublicKey = publicKey;
  res.send({ publicKeySet: true, publicKey: client01PublicKey, privateKey: client01PrivateKey });
});

// then we wait to sign messages
app.post('/signMessage', (req, res) => {
  const { privateKey, message } = req.body;
  // if the private key is incorrect, return a message saying so
  if (privateKey !== client01PrivateKey) { // this is the only private key we have
    return res.status(401).send('That private key does not exist on this server');
  }
  // if the private key is correct, sign the message
  const signature = signMessage(privateKey, message);
  res.send({ message, signature });
});

// then we wait to verify messages
app.post('/verifyMessage', (req, res) => {
  const { message, signature, publicKey } = req.body;
  // if the public key is incorrect, return a message saying so
  if (publicKey !== client01PublicKey) { // this is the only public key we have
    return res.status(401).send('That public key does not exist on this server');
  }
  // if the public key is correct, verify the signature
  const valid = signMessage(client01PrivateKey, message) === signature;
  res.send({ message, signature, valid });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

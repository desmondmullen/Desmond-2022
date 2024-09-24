const http = require('http');

/*
  usage:
  Set a Public Key: `node client.js setPublicKey <password> <publicKey>`
    returns `{ "publicKeySet": true, "publicKey": <publicKey>, "privateKey": <privateKey> }`

  Sign a Message: `node client.js signMessage <privateKey> <message>`
    returns `{ "message": <message>, "signature": <signature> }`

  Verify a Message: `node client.js verifyMessage <message> <signature> <publicKey>`
    returns `{ "message": <message>, "signature": <signature>, "valid": <true|false> }`
*/

const url = 'http://localhost:3000';
const operation = process.argv[2]; // 'setPublicKey' || 'signMessage' || 'verifyMessage'
//                           NOTE: the operations above correspond to the arguments below:
const argv3 = process.argv[3]; //       password     || privateKey    || message
const argv4 = process.argv[4]; //       publicKey    || message       || signature
const argv5 = process.argv[5]; //                                        publicKey

async function doFetch() {
  const body = {};
  switch (operation) {
    case 'setPublicKey':
      body.password = argv3;
      body.publicKey = argv4;
      break;
    case 'signMessage':
      body.privateKey = argv3;
      body.message = argv4;
      break;
    case 'verifyMessage':
      body.message = argv3;
      body.signature = argv4;
      body.publicKey = argv5;
      break;
    default:
      console.log('Invalid operation');
  }
  const response = await fetch(`${url}/${operation}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const text = await response.text();
  console.log(text);
}

doFetch();

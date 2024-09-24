# Desmond-2022
bitpay challenge 091824
Desmond Mullen - desmondspongmullen@gmail.com
https://github.com/desmondmullen/Desmond-2022

**DESCRIPTION:**
This code challenge creates a public key validator with only one user. That user sets their password via the command line when starting the server. The user then sets their public key via password-authenticated HTTP request. Other users can then submit a message, signature, and public key to the server for validation via HTTP request without authenticating.

**USAGE:**
* STARTING THE PROCESS: With a terminal navigated to this repository, enter `node server.js <password>` on the command line with whatever password you would like to use for later authentication. After starting the server, you can run the client file to do various operations as follows:

* SETTING A PUBLIC KEY: `node client.js setPublicKey <password> <publicKey>` Note: this password must match the one set above
    returns `{ "publicKeySet": true, "publicKey": <publicKey>, "privateKey": <privateKey> }`

* SIGNING A MESSAGE: `node client.js signMessage <privateKey> <message>`
    returns `{ "message": <message>, "signature": <signature> }`

* VERIFYING A MESSAGE: `node client.js verifyMessage <message> <signature> <publicKey>`
    returns `{ "message": <message>, "signature": <signature>, "valid": <true|false> }`

**USING WITH POSTMAN**
After starting the server as above, Postman can be used to interact directly with the server by simply changing the command line arguments to a URL and JSON body elements as follows:

* SETTING A PUBLIC KEY: POST to `http://localhost:3000/setPublicKey` with body:
    { "password": <password>, "publicKey": <publicKey> }
    returns `{ "publicKeySet": true, "publicKey": <publicKey>, "privateKey": <privateKey> }`

* SIGNING A MESSAGE: POST to `http://localhost:3000/signMessage` with body:
    { "privateKey": <privateKey>, "message": <message> }
    returns `{ "message": <message>, "signature": <signature> }`

* VERIFYING A MESSAGE: POST to `http://localhost:3000/verifyMessage` with body:
    { "message": <password>, "signature": <signature>, "publicKey": <publicKey> }
    returns `{ "message": <message>, "signature": <signature>, "valid": <true|false> }`


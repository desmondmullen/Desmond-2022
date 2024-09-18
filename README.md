# Desmond-2022
bitpay challenge 091824

DESCRIPTION:
This code challenge creates a public key validator with only one client. That client sets their password via the command line when starting the server. The client then sets their public key via password-authenticated HTTP request. Users can then submit a public key to the server for validation via HTTP request without authenticating.

USAGE:
* With a terminal navigated to this repository, enter `node client.js <password>` on the command line with whatever password you would like to use for later authentication.

* Make a POST request to `http://localhost:3000/set-public-key` with the "password" string and the "publicKey" string you want to set in a JSON body.

* After the public key is set, any user can make a POST request to `http://localhost:3000/verify-message` with a "message" string (optional) and a "publicKey" to verify whether the signature (the public key) of the message is legitimate.
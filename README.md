# Desmond-2022
bitpay challenge 091824
Desmond Mullen - desmondspongmullen@gmail.com
https://github.com/desmondmullen/Desmond-2022

**DESCRIPTION:**
This code challenge creates a public key validator with only one client. That client sets their password via the command line when starting the server. The client then sets their public key via password-authenticated HTTP request. Users can then submit a public key to the server for validation via HTTP request without authenticating.

**USAGE:**
* STARTING THE PROCESS: With a terminal navigated to this repository, enter `node client.js <password> <arbitrary message>` on the command line with whatever password you would like to use for later authentication. The arbitrary message string will be returned on the command line with a signature once a public key is set. Additionally, you can get a signature for any message string via a password-authenticated HTTP request (see "USING AN HTTP REQUEST TO CREATE A MESSAGE SIGNATURE" below).

* SETTING A PUBLIC KEY: Make a POST request to `http://localhost:3000/set-public-key` with the "password" string and the "publicKey" string you want to set in a JSON body. The arbitrary message entered at process startup will be logged to the console along with a signature to verify it.

* VERIFYING A MESSAGE: After the public key is set, any user can make a POST request to `http://localhost:3000/verify-message` with a "message" string and a "signature" to verify whether the the message is legitimate. You can test this with the message and signature logged to the console when the public key was set or with any string using the `sign-message` HTTP request described below.

**USING AN HTTP REQUEST TO CREATE A MESSAGE SIGNATURE:**
* Make a POST request to `http://localhost:3000/sign-message` with the client "password" string and the "message" string you want a signature for. The response will include the message and its signature. The message can be verified using the `verify-message` HTTP request described above.
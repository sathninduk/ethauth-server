# 🙌 Introduction
[![npm version](https://img.shields.io/badge/npm-0.0.1--beta1.1-orange)](https://www.npmjs.com/package/ethauth-server)
![Build status](https://github.com/project-evilcodes/ethauth-server/actions/workflows/codeql-analysis.yml/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/npm/ethauth-server/badge.svg)](https://snyk.io/test/npm/ethauth-server)
[![install size](https://packagephobia.now.sh/badge?p=ethauth-server)](https://packagephobia.now.sh/result?p=ethauth-server)
[![npm downloads](https://img.shields.io/npm/dm/ethauth-server.svg?style=flat-square)](https://npm-stat.com/charts.html?package=ethauth-server)
[![gitter chat](https://img.shields.io/gitter/room/mzabriskie/ethauth-server.svg?style=flat-square)](https://gitter.im/eth-auth/community)
[![code helpers](https://www.codetriage.com/project-evilcodes/ethauth-server/badges/users.svg)](https://www.codetriage.com/project-evilcodes/ethauth-server)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/ethauth-server)

\
Ethereum user authentication tokens

### Overview

**eth-auth** is a secure npm library for password-less user authentication on node.js decentralized applications (dApps) by signing an outwardly unpredictable dynamic JWT token with the user's Ethereum private key.

### Architecture

<figure><img src=".gitbook/assets/eth-auth.png" alt=""><figcaption><p>eth-auth architecture</p></figcaption></figure>

### Highlights

* Decentralised (Web3)
* Anonymous - User identity covered to dApp governors and the rest of the world.
* Password-less - Your Ethereum private key is your password, and it won't reveal to anyone.
* Breach-less - According to the eth-auth authentication architecture, no need to store meaningful user data in a database.

-----
# ✅ Installation

Add eth-auth as a dependency to your project.

```bash
npm install ethauth-server
```
```bash
yarn add ethauth-server
```
-----
# 😎 Setup

### Generate JWT Token (Ethereum Signing Key)

As the step one, the Frontend should fetch the Ethereum singing key (JWT) from the backend.
#### Function
```javascript
const ethAuth = require('ethauth-server');
let key = ethAuth.generate("ETHEREUM_ADDRESS", "ETH_AUTH_SECRET");
```


#### Code sample (Express.js)

``` javascript
const express = require('express')
const app = express()
const ethAuth = require('ethauth-server');

app.get('/get/:address', (req, res) => {
    let address = req.params.address;
    let key = ethAuth.generate(address, "ETH_AUTH_SECRET");
    res.status(200).json(key: key);
})
```

#### Sample output
```json
{
    "key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZXRoLWF1dGggdG9rZW4iLCJhZGRyZXNzIjoiMHg5ZUMyODVFZUMxODhGMEViRmE5Zjg4RGE0ODA3YkU1YjA0OWZjMDQ5IiwicmFuZG9tVG9rZW4iOiJaTFRuMk1URkJnWndCNWJGQ3l3MnZMWHdPTFFIejBCQiIsImlhdCI6MTY2MjE3OTkwOH0.uQIG0MnYdJ2jcXQQdxtBy78DtjBZSArqFfsZ3uP6H4Ijson"
}
```
use **ether.js** library to sign the fetched signing key in your frontend.

### Validate Ethereum Signature

As the second step, We have to verify the Ethrerum signature from the backend.

#### Function
```javascript
const ethAuth = require('ethauth-server');
ethAuth.validate(key, signature, "ETH_AUTH_SECRET")
```

#### Code sample (Express.js)

```javascript
const express = require('express')
const app = express()
const ethAuth = require('ethauth-server');

app.post('/send', (req, res, next) => {
    let key = req.body.key;
    let signature = req.body.signature;

    ethAuth.validate(key, signature, "ETHER_AUTH_SECRET").then((validation) => {
            res.status(200).json(validation); // true
    }).catch((err) => {
        res.status(401).send('Unauthorized: Invalid signature');
    });

})
```

✅ Authorized response
```json
{
    true
}
```
⛔️ Unauthorized response
```
Unauthorized: Invalid signature
```
-----
# Credits
Initial developer: Nilvin Sathnindu Kottage ([bysatha.com](https://bysatha.com))
\
Email: [hello@bysatha.com](mailto:hello@bysatha.com)
\
Twitter: [@sathnindu](https://twitter.com/sathnindu)
\
GitHub: [@sathninduk](https://github.com/sathninduk)

-----
# License
[MIT](https://github.com/project-evilcodes/ethauth-server/blob/main/LICENSE)




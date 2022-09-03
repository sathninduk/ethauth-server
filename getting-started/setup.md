# 😎 Setup

### Generate JWT Token (Ethereum Signing Key)

As the step one, the Frontend should fetch the Ethereum singing key (JWT) from the backend.

```javascript
const ethAuth = require('ethauth-server');
let key = ethAuth.generate("ETHEREUM_ADDRESS", "ETH_AUTH_SECRET");
```

#### Code sample (Express.js)

<pre class="language-javascript"><code class="lang-javascript">const express = require('express')
const app = express()
<strong>const ethAuth = require('ethauth-server');
</strong>
app.get('/get/:address', (req, res) => {
    let address = req.params.address;
    let key = ethAuth.generate(address, "ETH_AUTH_SECRET");
    res.status(200).json(key);
})</code></pre>

{% swagger method="get" path="/get/:address" baseUrl="https://API_URL" summary="Fetch the Ethereum singing key (JWT)" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="address" type="string" required="true" %}
Ethereum Address
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Ethereum singing key (JWT)" %}
```json
{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZXRoLWF1dGggdG9rZW4iLCJhZGRyZXNzIjoiMHg5ZUMyODVFZUMxODhGMEViRmE5Zjg4RGE0ODA3YkU1YjA0OWZjMDQ5IiwicmFuZG9tVG9rZW4iOiJaTFRuMk1URkJnWndCNWJGQ3l3MnZMWHdPTFFIejBCQiIsImlhdCI6MTY2MjE3OTkwOH0.uQIG0MnYdJ2jcXQQdxtBy78DtjBZSArqFfsZ3uP6H4Ijson
}
```
{% endswagger-response %}
{% endswagger %}

{% hint style="info" %}
use **ether.js** library to sign the fetched signing key in your frontend
{% endhint %}

### Validate Ethereum Signature

As the second step, We have to verify the Ethrerum signature from the backend

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

{% swagger method="post" path="/send" baseUrl="https://API_URL" summary="Verify the Ethereum signature" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="key" type="String" required="true" %}
Ethereum singing key (JWT)
{% endswagger-parameter %}

{% swagger-parameter in="body" name="signature" type="String" required="true" %}
Ethereum signature
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="User authorized" %}
```json
{
    true
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="User unauthorized" %}
```
Unauthorized: Invalid signature
```
{% endswagger-response %}
{% endswagger %}

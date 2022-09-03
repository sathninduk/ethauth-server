---
description: The documentation for the npm library eth-auth.
---

# 🙌 Introduction

### Overview

**eth-auth** is a secure npm library for password-less user authentication on node.js decentralized applications (dApps) by signing an outwardly unpredictable dynamic JWT token with the user's Ethereum private key.

### Architecture

<figure><img src=".gitbook/assets/eth-auth.png" alt=""><figcaption><p>eth-auth architecture</p></figcaption></figure>

### Highlights

* Decentralised (Web3)
* Anonymous - User identity covered to dApp governors and the rest of the world.
* Password-less - Your Ethereum private key is your password, and it won't reveal to anyone.
* Breach-less - According to the eth-auth authentication architecture, no need to store meaningful user data in a database.

# ✅ Installation

Add eth-auth as a dependency to your project.

{% tabs %}
{% tab title="npm" %}
```bash
npm install ethauth-server
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add ethauth-server
```
{% endtab %}
{% endtabs %}

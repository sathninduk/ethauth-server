const jwt = require('jsonwebtoken');
const ethers = require('ethers');

exports.generate = function (address, secret) {
    function generateRandomToken(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    let randomToken = generateRandomToken(32);
    return jwt.sign({name: "ether-auth token", address: address, randomToken: randomToken}, secret, "", "");
}

exports.validate = async function (token, signature, secret) {
    let decodedJwt = jwt.verify(token, secret, "", "");
    try {
        const signerAddr = ethers.utils.verifyMessage(token, signature);
        if (signerAddr === decodedJwt.address) {
            return {address: decodedJwt.address, authorized: true, err: null};
        } else {
            return "Invalid signature";
        }
    } catch (err) {
        return err;
    }
}
let jwt = require('jsonwebtoken');
let secret = '$upper#erro123';
function genrateUserToken(user)
{
    let payload = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profileImageUrl: user.profileImageUrl,
        role: user.role
    }
    let token = jwt.sign(payload , secret)
    return token
}

function validationToken(token)
{
    let payload = jwt.verify(token , secret);
    return payload;
}

module.exports = {genrateUserToken , validationToken}
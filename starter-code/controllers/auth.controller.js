module.exports.signup = (req, res, next) => {
    res.send("GET SIGNUP");
}

module.exports.doSignup = (req, res, next) => {
    res.send("POST SIGNUP");
}

module.exports.login = (req, res, next) => {
    res.send("GET LOGIN");
}

module.exports.logout = (req, res, next) => {
    res.send("GET LOGOUT");
}
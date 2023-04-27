const User = require('../models/user');


exports.list = (request, response, next) => {
    // TODO: authentication
    // TODO: authorization
    // TODO: handle request
}

exports.get = (request, response, next) => {
    // TODO: authentication
    // TODO: authorization
    // TODO: handle request
}

exports.create = (request, response, next) => {
    // TODO: authentication
    // TODO: authorization
    // TODO: handle request
}

exports.update = (request, response, next) => {
    // TODO: authentication
    // TODO: authorization
    // TODO: handle request
}

exports.delete = (request, response, next) => {
    // TODO: authentication
    // TODO: authorization
    // TODO: handle request
}

exports.login = (request, response, next) => {
    let username = request.body.username;
    let password = request.body.password;
    console.log(`User login: ${username}`);

    let user = User.find(username);
    if (!user)
        return response.status(404).json({message: 'Not found user!'});
    if (!user.verifyPassword(password))
        return response.status(401).json({message: 'Wrong username or password!'});

    user.login();
    return response.status(200).json(user);
}

exports.logout = (request, response, next) => {
    let token = request.body.token;
    console.log(`User logout: ${token}`);

    let user = User.verifyToken(token);
    if (!user)
        return response.status(403).json({message: 'Your need to login or the provided Token is invalid!'});

    user.logout();
    return response.status(200).json({});
}
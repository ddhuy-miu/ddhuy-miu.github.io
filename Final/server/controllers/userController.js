const User = require('../models/user');

let dbTokens = {};

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
    function generateToken(user) {
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        return user.token = `${user.username}-${timestamp}`;
    }

    let username = request.body.username;
    let password = request.body.password;
    console.log(`User login: ${username}`);

    let user = User.find(username);
    if (!user)
        return response.status(404).json({message: 'Not found user!'});
    if (!user.verifyPassword(password))
        return response.status(401).json({message: 'Wrong username or password!'});

    generateToken(user);
    dbTokens[user.username] = user;
    console.log(dbTokens);

    return response.status(200).json(user);
}

exports.logout = (request, response, next) => {
    let username = request.body.username;
    let token = request.body.token;
    console.log(`User logout: ${token}`);

    if (!dbTokens.hasOwnProperty(username))
        return response.status(200).json({message: 'Because we have no DB to save Login sessions. Workaround when server is restarted!'});

    let user = dbTokens[username];
    if (user.token !== token)
        return response.status(403).json({message: 'Wrong token!'});

    delete user.token;
    delete dbTokens[user.username];
    console.log(dbTokens);

    return response.status(200).json({});
}
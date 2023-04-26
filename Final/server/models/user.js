class User {
    constructor(username, email, firstName, lastName) {
        this._username = username;
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
    }

    verifyPassword(password) {
        return dbPasswords[this.username] === password;
    }

    get username() {
        return this._username;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get fullName() {
        return `${this._firstName} ${this._lastName}`
    }

    save() {
        let index = dbUsers.findIndex(u => u.username === this.username);
        if (index < 0) {
            dbUsers.push(this);
        } else {
            dbUsers.splice(index, 1, this);
        }
    }

    static find(username) {
        return dbUsers.find(u => u.username === username);
    }

    static findAll() {
        return dbUsers;
    }

    static delete(username) {
        let u = null;
        let index = dbUsers.findIndex(p => p.username === username);
        if (index >= 0) {
            u = dbUsers[index];
            dbUsers.splice(index, 1);
        }
        return u;
    }
}

let dbUsers = [
    new User('user', 'test@email.com', 'Mai', 'Nguyen'),
    new User('admin', 'dinhhuy.dang@miu.edu', 'Huy', 'Dang')
];

let dbPasswords = dbUsers.reduce(function (passwdMap, user) {
    passwdMap[user.username] = user.username;
    return passwdMap;
}, {});

// User.prototype.toJSON = function () {
//     let obj = this.toObject();
//     delete this._password;
//     return obj;
// }

module.exports = User;

function AuthData(id,email,nickname,role) {
    this.id = id || null;
    this.email = email || null;
    this.nickname = nickname || null;
    this.role = role || null;
    return Object.assign({},this);
}

AuthData.prototype.getId = function() {
    return this.id;
};

AuthData.prototype.getEmail = function() {
    return this.email;
};

AuthData.prototype.getNickname = function() {
    return this.nickname;
};

AuthData.prototype.getRole = function() {
    return this.role;
};

AuthData.prototype.setId = function(value) {
    this.id = value;
};

AuthData.prototype.setEmail = function(value) {
    this.email = value;
};

AuthData.prototype.setNickname = function(value) {
    this.nickname = value;
};

AuthData.prototype.setRole = function(value) {
    this.role = value;
};

AuthData.prototype.equals = function(other) {
    return other.getId() == this.getId() &&  other.getEmail() == this.getEmail();
};

AuthData.prototype.fill = function(newFields) {
    for (var field in newFields) {
        if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
            if (this[field] !== 'undefined') {
                this[field] = newFields[field];
            }
        }
    }
};

AuthData.prototype.toJSON = function() {
    return JSON.stringify({
        id: this.id,
        email: this.email,
        nickname: this.nickname,
        role: this.role
    });
};

module.exports = AuthData;

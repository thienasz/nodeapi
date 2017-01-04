var bcrypt   = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('users', {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        instanceMethods: {
            getByUsername: function(username, onSuccess, onError) {
                User.find({where: {username: username}}, {raw: true})
                    .success(onSuccess).error(onError);
            },
            retrieveAll: function(onSuccess, onError) {
                User.findAll({}, {raw: true})
                    .success(onSuccess).error(onError);
            },
            retrieveById: function(user_id, onSuccess, onError) {
                User.find({where: {id: user_id}}, {raw: true})
                    .success(onSuccess).error(onError);
            },
            add: function(onSuccess, onError) {
                var username = this.username;
                var password = this.generateHash(this.password);

                User.build({ username: username, password: password })
                    .save().success(onSuccess).error(onError);
            },
            updateById: function(user_id, onSuccess, onError) {
                var id = user_id;
                var username = this.username;
                var password = this.password;

                var shasum = crypto.createHash('sha1');
                shasum.update(password);
                password = shasum.digest('hex');

                User.update({ username: username,password: password},{where: {id: id} })
                    .success(onSuccess).error(onError);
            },
            removeById: function(user_id, onSuccess, onError) {
                User.destroy({where: {id: user_id}}).success(onSuccess).error(onError);
            },
            generateHash: function(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            },
            validPassword: function(password, data) {
                console.error(password, data.password);
                return bcrypt.compareSync(password, data.password);
            }
        }
    });

    return User;
};
module.exports = function(sequelize, DataTypes) {
    var Booking = sequelize.define('bookings', {
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        date: DataTypes.DATE
    }, {
        instanceMethods: {
            retrieveAll: function(onSuccess, onError) {
                Booking.findAll({}, {raw: true})
                    .success(onSuccess).error(onError);
            },
            retrieveAllToday: function(onSuccess, onError) {
                sequelize.query('SELECT * FROM bookings WHERE DATE(date) LIKE CURDATE() '
                ).success(onSuccess).error(onError);
            },
            retrieveAllUser: function(onSuccess, onError) {
                Booking.findAll({group: 'name'}, {raw: true})
                    .success(onSuccess).error(onError);
            },
            retrieveById: function(id, onSuccess, onError) {
                Booking.find({where: {id: id}}, {raw: true})
                    .success(onSuccess).error(onError);
            },
            add: function(onSuccess, onError) {
                var name = this.name;
                var price = this.price;
                var date = this.date;

                Booking.build({ name: name, price: price, date: date })
                    .save().success(onSuccess).error(onError);
            },
            updateById: function(id, onSuccess, onError) {
                var id = id;
                var name = this.name;
                var price = this.price;

                Booking.update({ name: name, price: price},{where: {id: id} })
                    .success(onSuccess).error(onError);
            },
            removeById: function(id, onSuccess, onError) {
                Booking.destroy({id: id}).success(onSuccess).error(onError);
            }
        }
    });

    return Booking;
};
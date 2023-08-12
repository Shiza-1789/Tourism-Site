const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.BIGINT, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "ADMIN"},
})

const Tour = sequelize.define('tour', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATEONLY, allowNull: false},
    duration: {type: DataTypes.INTEGER, allowNull: false},
    place: {type: DataTypes.STRING, allowNull: false},
    difficulty: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    amountofparticipants: {type: DataTypes.INTEGER, allowNull: false},
})

const TourType = sequelize.define('tour_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING, allowNull: false},
    paymentId: {type: DataTypes.STRING, allowNull: true},
})

TourType.hasMany(Tour, 
    {
        onDelete: 'CASCADE'
    })
Tour.belongsTo(TourType)

User.hasMany(Order, 
    {
        onDelete: 'CASCADE'
    })
Order.belongsTo(User)

Tour.hasMany(Order, 
    {
        onDelete: 'CASCADE'
    })
Order.belongsTo(Tour)

module.exports = {
    User,
    Tour,
    TourType,
    Order
}
const {Schema, model, Types} = require("mongoose");

//создаем новую схему через конструктор класса Schema
const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    // массив ссылок пользователя
    links: [{type: Types.ObjectId, ref: 'Link'}]
});

module.exports = model('User', schema);

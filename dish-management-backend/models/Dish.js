const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
  dishId: { type: Number, required: true, unique: true },
  dishName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
});

const Dish = mongoose.model('Dish', DishSchema);

module.exports = Dish;

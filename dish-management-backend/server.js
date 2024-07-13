const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Dish = require('./models/Dish');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors());


const mongoURI = 'Your MongoDb URI Here';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.put('/api/dishes/:dishId/toggle-publish', async (req, res) => {
  const { dishId } = req.params;
  try {
    const dish = await Dish.findOne({ dishId });
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    dish.isPublished = !dish.isPublished;
    await dish.save();
    res.json(dish);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
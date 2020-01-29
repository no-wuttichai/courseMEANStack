const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = mongoose.Schema({
  name: { type: String, default: "-" },
  image: String,
  stock: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  created: { type: Date, default: Date.now }
});

schema.plugin(AutoIncrement, { inc_field: 'product_id' });

module.exports = mongoose.model('Product', schema)
var base = require('./base.js');
var ShoppingList = require('../collections/shoppingList.js');
var ShoppingItem = require('../models/shoppingItem.js');
var ListItemView = require('./listItem.js');

module.exports = base.extend({
  el: '.items',
  collection: new ShoppingList([
    new ShoppingItem({ name: 'Banana', amount: 3 }),
    new ShoppingItem({ name: 'Strawberry', amount: 8 }),
    new ShoppingItem({ name: 'Almond', amount: 34 }),
    new ShoppingItem({ name: 'Chocolate Bar', amount: 1 })
  ]),
  initialize: function () {
    this.partials = {};
    this.collection.on('add', this.addItem, this);
    this.collection.on('remove', this.removeItem, this);
    this.collection.models.forEach(this.addItem, this);
  },
  addItem: function (model) {
    var item = new ListItemView({
      model: model,
      collection: this.collection
    });
    this.el.appendChild(item.el);
    this.partials[model.cid] = item;
  },
  removeItem: function (model) {
    var item = this.partials[model.cid];
    this.el.removeChild(item.el);
    delete this.partials[model.cid];
  }
});
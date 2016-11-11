const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.Promise = global.Promise;

let DomoModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  age: {
    type: Number,
    min: 0,
    required: true,
  },

  description: {
    type: String,
    required: true,
    default: 'Domo Arigato',
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = doc => ({
  name: doc.name,
  age: doc.age,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

    return DomoModel.find(search).select('name age description').exec(callback);
};

DomoSchema.statics.deleteByOwner = (ownerId, callback) => {
  console.log('schema delete');
  const search = {
    owner: convertId(ownerId),
  };
  //mongoose.Domo.deleteMany({});
  return DomoModel.find(search).remove().exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;

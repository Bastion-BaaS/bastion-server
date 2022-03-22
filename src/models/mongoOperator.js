const mongoose = require('mongoose');
const DefaultSchema = require('./DefaultSchema');

const transform = async (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString();
  delete returnedObject._id;
  delete returnedObject.__v;
};

const createModel = (collectionName) => {
  const newModel = mongoose.model(collectionName, DefaultSchema);

  return {
    name: collectionName,
    async getMany(query={}, select) {
      let results = await newModel.find(query, select);
      return results;
    },
    async getOne(id) {
      let result = await newModel.findById(id);
      return result;
    },
    async create(obj) {
      let newRecord = await newModel.create(obj);
      return newRecord;
    },
    async update(id, obj) {
      await newModel.replaceOne({_id: id}, obj);
      return this.getOne(id);
    },
    async patch(id, obj) {
      let currentObj = await this.getOne(id);
      let unsetObj = {};
      Object.keys(currentObj).forEach(key => {
        if (!obj[key]) {
          unsetObj[key] = 1;
        }
      });
      const patchedRecord = await newModel.findOneAndUpdate(
        { _id: id },
        {
          $set: obj,
          $unset: unsetObj,
        },
        { returnOriginal: false },
      );
      return patchedRecord;
    },
    async delete(id) {
      const deletedRecord = await newModel.findOneAndDelete({ _id: id });
      return deletedRecord;
    },
    async deleteAll() {
      const deletionResult = await newModel.deleteMany({});
      return deletionResult;
    }
  }
};

module.exports = { transform, createModel };

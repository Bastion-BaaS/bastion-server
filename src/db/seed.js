const mongoose = require('mongoose');
const CloudCodeFunction = require('../models/CloudCodeFunction');
const File = require('../models/File');
const User = require('../models/User');
const DefaultSchema = require('../models/DefaultSchema');
const mongoOperator = require('../models/mongoOperator');
const routeGenerator = require('../utils/routeGenerator');
const dbRouter = require('../routers/dbRouter');

const seedCCFs = [
  {
    functionName: 'processPayment'
  },
  {
    functionName: 'sendTextMessage'
  },
  {
    functionName: 'sendAnEmail'
  },
  {
    functionName: 'censorCurseWords'
  }
];

const seedFiles = [
  {
    fileName: 'ReillysAvatar.jpg'
  },
  {
    fileName: 'AdamsAvatar.jpg'
  },
  {
    fileName: 'PavlosAvatar.jpg'
  },
  {
    fileName: 'AlicansAvatar.jpg'
  }
];

const seedUsers = [
  {
    username: 'Reilly',
    email: 'reillysemail@gmail.com',
    password: 'astrongpassword',
  },
  {
    username: 'Adam',
    email: 'adamssemail@gmail.com',
    password: 'astrongpassword',
  },
  {
    username: 'Pavlo',
    email: 'pavlossemail@gmail.com',
    password: 'astrongpassword',
  },
  {
    username: 'Alican',
    email: 'alicansemail@gmail.com',
    password: 'astrongpassword',
  }
];

const seedCollection = 'bears';

const seedBears = [
  {
    name: 'Leeroy',
    age: '400',
    superpower: 'sleeping'
  },
  {
    name: 'Jenkins',
    age: '5',
    superpower: 'diving'
  }
];

const generate = async () => {
  await CloudCodeFunction.deleteMany({});
  await CloudCodeFunction.insertMany(seedCCFs);

  await File.deleteMany({});
  await File.insertMany(seedFiles);

  await User.deleteMany({});
  await User.insertMany(seedUsers);

  const BearObj = mongoOperator.createModel(seedCollection);
  const BearModel = mongoose.model(seedCollection, DefaultSchema)
  await BearModel.deleteMany({});
  await BearModel.insertMany(seedBears);
  routeGenerator.addRoutes(dbRouter, BearObj);
}

module.exports = { generate };

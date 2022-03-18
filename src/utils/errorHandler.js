// Error handling
const mongooseError = (err) => {
  console.error(`Mongoose Error: ${err}`);
};


module.exports = { mongooseError }

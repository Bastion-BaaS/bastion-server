/*
  import
  DB Router
  CCF Router
  Files router
  Sessions Router
*/

const configure = (router) => {

  // configure temporary generic routes
  router.get('/server/', (req, res) => {
    res.status(200).json({ message: "You've accessed temporary generic app-server route!"});
  });

  router.get('/server/info', (req, res) => {
    res.status(200).json({ message: "You've accessed temporary not-so-generic app-server route!"});
  });
};


module.exports = { configure };

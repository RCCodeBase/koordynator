const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");

var serviceAccount = require("./koordynator-e340e-firebase-adminsdk-6xa2o-32e267a483.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://koordynator-e340e.firebaseio.com",
});

module.exports = (req, res, next) => {
  const idToken = req.header("auth-token");
  // idToken comes from the client app
  // console.log("Id Toeken Got here", idToken);
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      let uid = decodedToken.uid;
      //Getting user details using userid
      admin
        .auth()
        .getUser(uid)
        .then(function (userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          // console.log('Successfully fetched user data:', userRecord.toJSON());
          req.user = userRecord.toJSON();
          console.log("ToKen Success");
          next();
        })
        .catch(function (error) {
          res.status(400);
          console.log("Error fetching user data:", error);
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Invalid Token");
    });
};

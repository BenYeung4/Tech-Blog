//restrict material to authorized members only

//will act as a normal request callback function, will be writing withAuth through the API as an extra authorization
const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;

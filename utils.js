function getLoggedUserId(req) {
  return req.cookies.userID;
};

module.exports = { getLoggedUserId }

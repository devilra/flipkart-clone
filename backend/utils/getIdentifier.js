const { v4: uuidv4 } = require("uuid");

exports.getIdentifier = (req, res) => {
  if (req.user) {
    // Logged-in user
    return { userId: req.user._id, sessionId: null };
  } else {
    // Guest user
    let sessionId = req.cookies.sessionId;
    if (!sessionId) {
      sessionId = uuidv4();
      res.cookie("sessionId", sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    }
    return { userId: null, sessionId };
  }
};

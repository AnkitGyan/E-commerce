function sendToken(user, statusCode, res) {
  const token = user.generateAuthToken();

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  };

  const safeUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  res
    .status(statusCode)
    .cookie("token", token, cookieOptions)
    .json({
      success: true,
      user: safeUser,
    });
}

export default sendToken;
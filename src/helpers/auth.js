//Auth user after login
export const authenticate = (data, next) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", data.user._id);
  localStorage.setItem("userName", data.user.name);
  localStorage.setItem("imageUrl", data.user.imageUrl);
  localStorage.setItem("bio", data.user.bio);
  localStorage.setItem("email", data.user.email);
  next();
};

const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const validateFavorite = require("./validateFavorite");
const authenticate = require("./authenticate");
const validateSubscription = require("./validateSubscription");
const validateEmail = require("./validateEmail");
const upload = require("./upload");

module.exports = {
  validateBody,
  isValidId,
  validateFavorite,
  authenticate,
  validateSubscription,
  validateEmail,
  upload,
};

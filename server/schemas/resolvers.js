const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  // ADD RESOLVERS - SEE CONTROLLERS vs. 
};

module.exports = resolvers;

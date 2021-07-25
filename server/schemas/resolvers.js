const { AuthenticationError } = require("apollo-server-express");
const { Book, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  // ADD RESOLVERS - SEE CONTROLLERS vs.
  Query: {
    me: async () => {
      return User.find({});
    },
    book: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Book.find(params);
    },
  },
  Mutation: {
    // get a single user by either their id or their username
    // getSingleUser: async ({ user = null, params }, res) => {
    //   const foundUser = await User.findOne({
    //     $or: [
    //       { _id: user ? user._id : params.id },
    //       { username: params.username },
    //     ],
    //   });

    //   if (!foundUser) {
    //     return res
    //       .status(400)
    //       .json({ message: "Cannot find a user with this id!" });
    //   }
    //   res.json(foundUser);
    // },

    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    addUser: async ({ body }, res) => {
      const user = await User.create(body);

      if (!user) {
        return res.status(400).json({ message: "Something is wrong!" });
      }
      const token = signToken(user);
      res.json({ token, user });
    },

    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    // {body} is destructured req.body
    login: async ({ email, username , password}, res) => {
      const user = await User.findOne({
        email
      });
      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        return res.status(400).json({ message: "Wrong password!" });
      }
      const token = signToken(user);
      res.json({ token, user });
    },

    // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    // user comes from `req.user` created in the auth middleware function
    saveBook: async ({ user, body }, res) => {
      console.log(user);
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: body } },
          { new: true, runValidators: true }
        );
        return res.json(updatedUser);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    },
    // remove a book from `savedBooks`
    removeBook: async ({ bookData }, user) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user.user._id },
        { $pull: { savedBooks: { bookData } } },
        { new: true }
      );
     
      return updatedUser; 
    },
  },
};

module.exports = resolvers;

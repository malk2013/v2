const User = require('../../models/user');
 
module.exports.resolvers = {
  Query: {
    login: async ({ email, password }) => {
      console.log("EMAIL............" + email)
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error('User does not exist!');
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error('Password is incorrect!');
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        'somesupersecretkey',
        {
          expiresIn: '1h'
        }
      );
      return { userId: user.id, token: token, tokenExpiration: 1 };
    } 
  },
 
  Mutation: {
    createUser: async (root, args) => {
      try {
      
        const existingUser = await User.findOne({
          email: args.userInput.email
        });
        if (existingUser) {
          throw new Error('User exists already.');
        }


        const user = new User({
          email: args.userInput.email,
          password: args.userInput.password
        });

        const result = await user.save();

        return {
          ...result._doc,
          password: null,
          _id: result.id
        };
      } catch (err) {
        throw err;
      }
    }
  }
  
};

const Event = require('../../models/event');
const User = require('../../models/user');

const {
  transformEvent
} = require('./merge');

module.exports.resolvers = {
  Query: {
    events: async () => {
      try {
        const events = await Event.find();
        return events.map(event => {
          return transformEvent(event);
        });
      } catch (err) {
        throw err;
      }
  }
  },
  Mutation: {
    addEvent: async (root, args,req) => {
    console.log("i am in")
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: req.userId
      });
      let createdEvent;
      try {
        const result = await event.save();
        createdEvent = transformEvent(result);
        const creator = await User.findById(req.userId);

        if (!creator) {
          throw new Error('User not found.');
        }
        creator.createdEvents.push(event);
        await creator.save();

        return createdEvent;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
 }
};

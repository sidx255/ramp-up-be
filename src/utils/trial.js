const db = require('../../database/models');

const { User } = db;

// insert into user
// const user = {
//   email: 'sid@mail.com',
//   name: 'Sid',
//   role: 'admin',
//   contact: '1234567890',
//   events: [],
//   teams: [    ]
// };

const addUser = async (user) => {
  return await User.create(user);

};

// insert into team
// const team = {
//   emps: [],
//   description: 'Team 1'
// };

// Team.create(team);

module.exports = {
  addUser
};

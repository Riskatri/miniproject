module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    name: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    admin: {
      type: Sequelize.BOOLEAN
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });
  return User;
};

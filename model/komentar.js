module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comments", {
    isi_comment: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });
  return Comment;
};

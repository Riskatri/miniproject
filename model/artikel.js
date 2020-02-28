module.exports = (sequelize, Sequelize) => {
  const Artikel = sequelize.define("artikels", {
    judul: {
      type: Sequelize.STRING
    },
    isi: {
      type: Sequelize.STRING
    },

    status: {
      type: Sequelize.BOOLEAN
    }
  });
  return Artikel;
};

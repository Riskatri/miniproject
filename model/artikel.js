module.exports = (sequelize, Sequelize) => {
  const Artikel = sequelize.define("artikels", {
    judul: {
      type: Sequelize.STRING
    },
    isi: {
      type: Sequelize.TEXT
    },

    status: {
      type: Sequelize.BOOLEAN
    },
    img: {
      type: Sequelize.STRING
    }
  });
  return Artikel;
};

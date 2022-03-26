const { Genre } = require('../models');

const createGenre = async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    return res.status(201).json({
      genre,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    return res.status(200).json({ genres });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getGenreById = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findOne({
      where: { id: id },
      include: [
        {
          model: Project,
        },
      ],
    });
    if (genre) {
      return res.status(200).json({ genre });
    }
    return res.status(404).send('Genre with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createGenre,
  getAllGenres,
  getGenreById,
};

const { Character, Movie } = require('../models');

const { Op } = require('sequelize');

const createCharacter = async (req, res) => {
  try {
    const character = await Character.create(req.body);
    if (!character) {
      res.status().json({ msg: 'Cannot create Character' });
    } else {
      return res.status(201).json({ character });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllCharacters = async (req, res) => {
  const { name, age, movie } = req.query;

  //RESPONSES
  if (!name && !age && !movie) {
    try {
      const character = await Character.findAll({
        attributes: ['image', 'name'],
      });
      return res.status(200).json({ character });
    } catch (error) {
      return res.status(500).json('Cannot find Character');
    }
  } else if (name && !age && !movie) {
    try {
      const characterFound = await Character.findAll(name, {
        include: {
          model: Movie,
          as: 'Movies',
          attributes: ['title'],
        },
        where: {
          title: { [Op.like]: '%' + name + '%' },
        },
      });
      if (!characterFound) {
        res.status(204).json({ msg: 'Cannot find Character' });
      } else {
        return res.status(200).json(characterFound);
      }
    } catch (error) {
      return res.status(500).json('Something went wrong');
    }
  } else if (!name && age && !movie) {
    try {
      const characterFound = await Character.findAll(age, {
        include: {
          model: Movie,
          as: 'Movies',
          attributes: ['title'],
        },
        where: {
          title: { [Op.like]: '%' + age + '%' },
        },
      });
      if (!characterFound) {
        res.status(204).json({ msg: 'Cannot find Character' });
      } else {
        return res.status(200).json(characterFound);
      }
    } catch (error) {
      return res.status(500).json('Something went wrong');
    }
  } else if (!name && !genre && movie) {
    try {
      const characterFound = await Character.findAll(movie, {
        include: {
          model: Movie,
          attributes: ['title'],
        },
        where: {
          title: { [Op.like]: '%' + movie + '%' },
        },
      });
      if (!characterFound) {
        res.status(204).json({ msg: 'Cannot find Character' });
      } else {
        return res.status(200).json(characterFound);
      }
    } catch (error) {
      return res.status(500).json('Something went wrong');
    }
  }
};

const getCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Character.findOne(id, {
      where: { id: id },
      include: [
        {
          model: Movie,
          attributes: ['title'],
        },
      ],
    });
    if (character) {
      return res.status(200).json({ character });
    } else {
      return res
        .status(204)
        .json({ msg: 'Character with the specified ID does not exists' });
    }
  } catch (error) {
    return res.status(500).json('Something went wrong');
  }
};

const updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Character.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedCharacter = await Character.findOne({ where: { id: id } });
      return res.status(200).json({ character: updatedCharacter });
    }
  } catch (error) {
    return res.status(500).send('Something went wrong');
  }
};

const deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Character.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).json({ msg: 'Character deleted' });
    }
    if (!deleted) {
      res.status(204).json({ msg: 'Cannot find Character' });
    }
  } catch (error) {
    return res.status(500).send('Something went wrong');
  }
};

module.exports = {
  createCharacter,
  getAllCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
};

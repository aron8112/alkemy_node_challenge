const { Character, Movie } = require('../models');

const { Op } = require('sequelize');

const createCharacter = async (req, res) => {
  try {
    const character = await Character.create(req.body);
    if (character) {
      return res.status(201).json({ character });
    } else {
      return res.status(400).json({ msg: 'Cannot create Character' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllCharacters = async (req, res) => {
  const { name, age, movie } = req.query;

  //RESPONSES
  if (!Object.keys(req.query).length) {
    try {
      const character = await Character.findAll({
        attributes: ['image', 'name'],
      });
      if(character){
        return res.status(200).json({ character });
      } else {
        return res.status(204).json({ msg: 'No characters found'});
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json('Cannot find Character');
    }
  } else if (name && !age && !movie) {
    try {
      const characterFound = await Character.findOne({
        where: {
          name: { [Op.like]: '%' + name + '%' },
        },
        include: {
          model: Movie,
          attributes: ['title'],
        },
      });
      if (!characterFound) {
        return res.status(204).json({ msg: 'Cannot find Character' });
      } else {
        return res.status(200).json(characterFound);
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json('Something went wrong');
    }
  } else if (!name && age && !movie) {
    try {
      const characterFound = await Character.findOne({
        where: {
          age: { [Op.like]: '%' + age + '%' },
        },
        include: {
          model: Movie,
          attributes: ['title'],
        },
      });
      if (!characterFound) {
        return res.status(204).json({ msg: 'Cannot find Character' });
      } else {
        return res.status(200).json(characterFound);
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json('Something went wrong');
    }
  } else if (!name && !age && movie) {
    try {
      const characterFound = await Character.findAll({
        where: {
          movieId: { [Op.like]: '%' + movie + '%' },
        },
        include: {
          model: Movie,
          attributes: ['title'],
        },
      });
      if (!characterFound) {
        return res.status(204).json({ msg: 'Cannot find Character' });
      } else {
        return res.status(200).json(characterFound);
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json('Something went wrong');
    }
  }
};

const getCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Character.findByPk(id, {
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
    console.log(error)
    return res.status(500).json('Something went wrong');
  }
};

const updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const characterFound = await Character.findByPk(id, {
      where: { id: id}
    })
    if(!characterFound){
      return res.status(204).json({ msg: 'Character with the specified ID does not exists'})
    } else {
        await Character.update(id, {
        where: { id: id }
      });
    }
    const editedCharacter = await await Character.findByPk(id, {
      where: { id: id}
    })
    return res.status(200).json({editedCharacter});
  } catch (error) {
    console.log(error)
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

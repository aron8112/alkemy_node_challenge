const { Movie, Character, Genre } = require('../models');

const { Op } = require('sequelize');

//RESPONSES

//CREATE A MOVIE
const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    if (movie) {
      return res.status(201).json({ movie });
    } else {
      return res.status(400).json({msg: 'Cannot create the movie'})
    }
  } catch (error) {
    return res.status(500).json('Something went wrong');
  }
};

//ALL MOVIES AVAILABLE
const getAllMovies = async (req, res) => {
  const { title, genre, order } = req.query;

  if (!Object.keys(req.query).length) {
    try {
      const moviesFound = await Movie.findAll({
        attributes: ['image', 'title', 'release'],
      });
      if (!moviesFound) res.status(200).json({ msg: 'Theres no Movies' });
      return res.status(200).json({ moviesFound });
    } catch (error) {
      return res.status(500).json({ msg: 'Something went wrong', error });
    }
  }

//GET /movies?name=nombre
  if (title && !genre && !order) {
    try {
      const moviesFound = await Movie.findAll({
        where: {
          title: { [Op.like]: '%' + title + '%' },
        },
        attributes: ['id', 'title'],
        include: [{ model: Character, attributes: ['name'] }],
      });
      return res.status(200).json(moviesFound);
    } catch (error) {
      return res.status(500).json({ msg: 'Something went wrong', error });
    }

//GET /movies?genre=idGenero
  } else if (!title && genre && !order) {
    try {
      const moviesFound = await Movie.findAll({
        where: {
          genreId: { [Op.eq]: genre },
        },
        include: [{ model: Genre, attributes: ['name'] }],
      });
      if (!moviesFound) throw new Error('Cannot find movie');
      return res.status(200).json(moviesFound);
    } catch (error) {
      console.log('sale aca');
      return res.status(500).json({ msg: 'Something went wrong', error });
    }

// GET /movies?order=ASC | DESC
  } else if (!title && !genre && order) {
    try {
      if ((order = ASC)) {
        const moviesInOrderAsc = await Movie.findAll({
          order: [[Movie, 'release', ASC]],
        });
        return res.status(200).json(moviesInOrderAsc);
      } else if ((order = DESC)) {
        const moviesInOrderDesc = await Movie.findAll({
          order: [[Movie, 'release', DESC]],
        });
        return res.status(200).json(moviesInOrderDesc);
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Something went wrong', error });
    }
  } else {
    return res
      .status(500)
      .json({ msg: 'Something went wrong', error: 'error' });
  }
};

//FIND MOVIE BY ID
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk({
      include: [
        {
          model: Genre,
          attributes: ['name'],
        },
        {
          model: Character,
          attributes: ['name'],
        },
      ],
      attributes: ['id', 'title', 'release', 'rate'],
    });
    if (movie) {
      return res.status(200).json({ movie });
    } else {
      return res
        .status(404)
        .json('Movie with the specified ID does not exists');
    }
  } catch (error) {
    return res.status(500).json('Something went wrong');
  }
};

//UPDATE
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Movie.update(id, {
      where: { id: id },
    });
    if (updated) {
      const updatedMovie = await Movie.findByPk({ where: { id: id } });
      return res.status(200).json({ movie: updatedMovie });
    } else {
      return res
        .status(404)
        .json('Movie with the specified ID does not exists');
    }
  } catch (error) {
    return res.status(500).json('Something went wrong');
  }
};

//DELETE
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Movie.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).send('Movie deleted');
    }
    throw new Error('Movie not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};

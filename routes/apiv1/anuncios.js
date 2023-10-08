const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

// GET
router.get('/', async (req, res, next) => {
  try {
    const filtroNombre = req.query.nombre;

    const filtro = {};

    if (filtroNombre) filtro.nombre = filtroNombre;

    const anuncios = await Anuncio.lista(filtro);
    res.json(anuncios);
  } catch (error) {
    next(error);
  }
});

router.get('/id/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const respuesta = await Anuncio.findById(id);

    res.json(respuesta);
  } catch (error) {
    next(error);
  }
});

// POST
router.post('/', async (req, res, next) => {
  try {
    const anuncioData = req.body;
    const nuevoAnuncio = Anuncio(anuncioData);
    const anuncioGuardado = await nuevoAnuncio.save();

    res.json({ result: anuncioGuardado });
  } catch (error) {
    next(error);
  }
});

// PUT
router.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const anuncioData = req.body;
  const anuncioActualizado = await Anuncio.findByIdAndUpdate(id, anuncioData, {
    new: true,
  });

  res.json(anuncioActualizado);
});
// DELETE

module.exports = router;

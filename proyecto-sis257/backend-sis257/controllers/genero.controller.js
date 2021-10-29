const Genero = require("../models/genero.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacío",
    });
  }

  const genero = new Genero({
    descripcion: req.body.descripcion,
  });

  Genero.create(genero, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Genero.findById(req.params.generoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Género no encontrado con id ${req.params.generoId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir el género con id ${req.params.generoId}`,
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Genero.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacío",
    });
  }

  Genero.updateById(
    req.params.generoId,
    new Genero(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Género no encontrado con id ${req.params.generoId}`,
          });
        } else {
          res.status(500).send({
            message: `Error al requerir el género con id ${req.params.generoId}`,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Genero.remove(req.params.generoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Género no encontrado con id ${req.params.generoId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir el género con id ${req.params.generoId}`,
        });
      }
    } else res.send({ message: "Género eliminado" });
  });
};

exports.deleteAll = (req, res) => {
  Genero.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error al requerir el género con id ${req.params.generoId}`,
      });
    } else res.send({ message: "Todos los Géneros eliminados" });
  });
};

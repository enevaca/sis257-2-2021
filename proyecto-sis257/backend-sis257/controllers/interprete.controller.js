const Interprete = require("../models/interprete.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacío",
    });
  }

  const interprete = new Interprete({
    nombre: req.body.nombre,
    nacionalidad: req.body.nacionalidad,
  });

  Interprete.create(interprete, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Interprete.findById(req.params.interpreteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Intérprete no encontrado con id ${req.params.interpreteId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir el intérprete con id ${req.params.interpreteId}`,
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Interprete.getAll((err, data) => {
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

  Interprete.updateById(
    req.params.interpreteId,
    new Interprete(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Intérprete no encontrado con id ${req.params.interpreteId}`,
          });
        } else {
          res.status(500).send({
            message: `Error al requerir el intérprete con id ${req.params.interpreteId}`,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Interprete.remove(req.params.interpreteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Intérprete no encontrado con id ${req.params.interpreteId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir el intérprete con id ${req.params.interpreteId}`,
        });
      }
    } else res.send({ message: "Intérprete eliminado" });
  });
};

exports.deleteAll = (req, res) => {
  Interprete.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error al requerir el intérprete con id ${req.params.interpreteId}`,
      });
    } else res.send({ message: "Todos los Intérpretes eliminados" });
  });
};

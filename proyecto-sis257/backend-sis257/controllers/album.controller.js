const Album = require("../models/album.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacío",
    });
  }

  const album = new Album({
    id_interprete: req.body.id_interprete,
    nombre: req.body.nombre,
    fecha_lanzamiento: req.body.fecha_lanzamiento,
  });

  Album.create(album, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Album.findById(req.params.albumId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Album no encontrado con id ${req.params.albumId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir el album con id ${req.params.albumId}`,
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Album.getAll((err, data) => {
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

  Album.updateById(
    req.params.albumId,
    new Album(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Album no encontrado con id ${req.params.albumId}`,
          });
        } else {
          res.status(500).send({
            message: `Error al requerir el album con id ${req.params.albumId}`,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Album.remove(req.params.albumId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Album no encontrado con id ${req.params.albumId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir el album con id ${req.params.albumId}`,
        });
      }
    } else res.send({ message: "Album eliminado" });
  });
};

exports.deleteAll = (req, res) => {
  Album.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error al requerir el album con id ${req.params.albumId}`,
      });
    } else res.send({ message: "Todos los Albums eliminados" });
  });
};

var sql = require("./db");

class Album {
  constructor(album) {
    this.id_interprete = album.id_interprete;
    this.nombre = album.nombre;
    this.fecha_lanzamiento = album.fecha_lanzamiento;
  }

  static create = (newAlbum, result) => {
    sql.query("INSERT INTO albums SET ?", newAlbum, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("album creado", { id: res.insertId });
      result(null, { id: res.insertId, ...newAlbum });
    });
  };

  static findById = (id, result) => {
    sql.query(`SELECT a.id, a.nombre, a.fecha_lanzamiento, a.id_interprete, i.nombre as interprete, i.nacionalidad FROM albums a INNER JOIN interpretes i ON a.id_interprete = i.id 
              WHERE a.id = ${id}`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("album encontrado", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  static getAll = (result) => {
    sql.query("SELECT a.id, a.nombre, a.fecha_lanzamiento, a.id_interprete, i.nombre as interprete, i.nacionalidad FROM albums a INNER JOIN interpretes i ON a.id_interprete = i.id", 
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("Lista de albums");
      result(null, res);
    });
  };

  static updateById = (id, album, result) => {
    sql.query(
      "UPDATE albums SET id_interprete = ?, nombre = ?, fecha_lanzamiento = ? WHERE id = ?",
      [album.id_interprete, album.nombre, album.fecha_lanzamiento, id],
      (err, res) => {
        if (err) {
          console.log("error", err);
          result(err, null);
          return;
        }

        if (res.affetedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("album actualizado", { id, ...album });
        result(null, { id, ...album });
      }
    );
  };

  static remove = (id, result) => {
    sql.query("DELETE FROM albums WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affetedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("album eliminado con id: ", id);
      result(null, res);
    });
  };

  static removeAll = (result) => {
    sql.query("DELETE FROM albums", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log(`${res.affetedRows} albums eliminados`);
      result(null, res);
    });
  };
}

module.exports = Album;

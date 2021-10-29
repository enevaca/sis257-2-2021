var sql = require("./db");

class Genero {
  constructor(genero) {
    this.descripcion = genero.descripcion;
  }

  static create = (newGenero, result) => {
    sql.query("INSERT INTO generos SET ?", newGenero, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("Género creado", { id: res.insertId });
      result(null, { id: res.insertId, ...newGenero });
    });
  };

  static findById = (id, result) => {
    sql.query(`SELECT * FROM generos WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Género encontrado", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  static getAll = (result) => {
    sql.query("SELECT * FROM generos", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("Lista de géneros");
      result(null, res);
    });
  };

  static updateById = (id, genero, result) => {
    sql.query(
      "UPDATE generos SET descripcion = ? WHERE id = ?",
      [genero.descripcion, id],
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

        console.log("Género actualizado", { id, ...genero });
        result(null, { id, ...genero });
      }
    );
  };

  static remove = (id, result) => {
    sql.query("DELETE FROM generos WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affetedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Género eliminado con id: ", id);
      result(null, res);
    });
  };

  static removeAll = (result) => {
    sql.query("DELETE FROM generos", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log(`${res.affetedRows} Géneros eliminados`);
      result(null, res);
    });
  };
}

module.exports = Genero;

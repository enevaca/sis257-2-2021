var sql = require("./db");

class Interprete {
  constructor(interprete) {
    this.nombre = interprete.nombre;
    this.nacionalidad = interprete.nacionalidad;
  }

  static create = (newInterprete, result) => {
    sql.query("INSERT INTO interpretes SET ?", newInterprete, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("Intérprete creado", { id: res.insertId });
      result(null, { id: res.insertId, ...newInterprete });
    });
  };

  static findById = (id, result) => {
    sql.query(`SELECT * FROM interpretes WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Intérprete encontrado", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  static getAll = (result) => {
    sql.query("SELECT * FROM interpretes", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("Lista de intérpres");
      result(null, res);
    });
  };

  static updateById = (id, interprete, result) => {
    sql.query(
      "UPDATE interpretes SET nombre = ?, nacionalidad = ? WHERE id = ?",
      [interprete.nombre, interprete.nacionalidad, id],
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

        console.log("Intérprete actualizado", { id, ...interprete });
        result(null, { id, ...interprete });
      }
    );
  };

  static remove = (id, result) => {
    sql.query("DELETE FROM interpretes WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affetedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Intérprete eliminado con id: ", id);
      result(null, res);
    });
  };

  static removeAll = (result) => {
    sql.query("DELETE FROM interpretes", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log(`${res.affetedRows} Intérpretes eliminados`);
      result(null, res);
    });
  };
}

module.exports = Interprete;

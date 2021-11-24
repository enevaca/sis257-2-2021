var sql = require("./db");
var { SECRET_KEY } = require("../config/config")

class Usuario {
  constructor(usuario) {
    this.usuario = usuario.usuario;
    this.clave = usuario.clave;
    this.email = usuario.email;
    this.rol = usuario.rol;
    this.premium = usuario.premium;
  }

  static create = (newUsuario, result) => {
    newUsuario.clave = require("crypto").createHmac("sha256", SECRET_KEY).update(newUsuario.clave).digest("hex");
    sql.query("INSERT INTO usuarios SET ?", newUsuario, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("Usuario creado", { id: res.insertId });
      result(null, { id: res.insertId, ...newUsuario });
    });
  };

  static findById = (id, result) => {
    sql.query(`SELECT * FROM usuarios WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Usuario encontrado", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  static findByUserPass = (usuario, clave, result) => {
    sql.query(`SELECT * FROM usuarios WHERE usuario = '${usuario}' AND clave = '${clave}'`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Usuario encontrado", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  static getAll = (result) => {
    sql.query("SELECT * FROM usuarios", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("Lista de usuarios");
      result(null, res);
    });
  };

  static updateById = (id, usuario, result) => {
    sql.query(
      "UPDATE usuarios SET usuario = ?, email = ?, rol = ?, premium = ? WHERE id = ?",
      [usuario.usuario, usuario.email, usuario.rol, usuario.premium, id],
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

        console.log("Usuario actualizado", { id, ...usuario });
        result(null, { id, ...usuario });
      }
    );
  };

  static remove = (id, result) => {
    sql.query("DELETE FROM usuarios WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affetedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Usuario eliminado con id: ", id);
      result(null, res);
    });
  };

  static removeAll = (result) => {
    sql.query("DELETE FROM usuarios", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log(`${res.affetedRows} Usuarios eliminados`);
      result(null, res);
    });
  };
}

module.exports = Usuario;

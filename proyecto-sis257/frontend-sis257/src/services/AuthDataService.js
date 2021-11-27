import Cookies from "js-cookie";
import http from "./http-common";

export default {
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  deleteUserLogged() {
    return Cookies.remove("userLogged");
  },
  async login(user, password) {
    var userDB = {};
    await http.post("/usuarios/login", { usuario: user, clave: password }).then(response => {
      userDB = response.data;
      if(user == userDB.usuario) {
        const userCookie = { user: userDB.usuario, rol: userDB.rol, email: user.userDB };
        localStorage.setItem("token", userDB.token);
        Cookies.set("userLogged", JSON.stringify(userCookie), { expires: (1/1440)*30 }); // 30 minutos
        return userCookie;
      }
      else return "";
    });
  }
};

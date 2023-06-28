class AuthFakerApi {
  routes = {
    "/login": function (instance, { username, password }) {
      instance._auth(username, password);
      return {
        success: true,
        message: "Usuario Logado",
      };
    },
    "/logout": function (instance, {}) {
      instance._logout();
      return {
        success: true,
        message: "Deslogado",
      };
    },
    "/register": function (instance, { name, username, password }) {
      if (!name || !username || !password) throw "Dados invalidos";

      const users = instance._allUsers();
      if (users.filter((userMap) => userMap.username === username)[0])
        throw "Usuario já cadastrado";

      instance._setUser({ name, username, password });
      return {
        success: true,
        message: "Usuario cadastrado",
      };
    },
    "/me": function (instance, {}) {
      instance._isAuthenticate();
      return {
        success: true,
        data: instance._getAuth(),
      };
    },
  };
  getRoute(route) {
    const routeFunction = this.routes[route];
    if (typeof routeFunction !== "function") {
      return (params) => {
        return {
          success: false,
          message: "Rota não existe",
        };
      };
    }
    return (params) => {
      try {
        return routeFunction(this, params);
      } catch (e) {
        return {
          success: false,
          message: e,
        };
      }
    };
  }
  request(route, params) {
    const routeFunction = this.getRoute(route);
    return new Promise(function (resolve, reject) {
      window.setTimeout(function () {
        const response = routeFunction(params);
        if (response.success) {
          resolve(response);
          return;
        }
        reject(response);
      }, Math.random() * 200 + 150);
    });
  }
  get(route, params) {
    return this.request(route, params);
  }
  post(route, params) {
    return this.request(route, params);
  }
  put(route, params) {
    return this.request(route, params);
  }
  delete(route, params) {
    return this.request(route, params);
  }

  /**
      User Section
     **/
  _allUsers() {
    return JSON.parse(window.localStorage.getItem("users")) || [];
  }
  _getNextUserId() {
    return parseInt(window.localStorage.getItem("nextUserId")) || 1;
  }
  _addNextUserId() {
    window.localStorage.setItem("nextUserId", this._getNextUserId() + 1);
  }
  _insertUsers(users) {
    window.localStorage.setItem("users", JSON.stringify(users));
  }
  _getUser(user_id) {
    const users = this._allUsers();
    return users.filter((item) => item.id === user_id)[0];
  }
  _getUserByUsername(username) {
    const users = this._allUsers();
    return users.filter((item) => item.username === username)[0];
  }
  _setUser(user) {
    let users = this._allUsers();
    if (!user.id) {
      user.id = this._getNextUserId();
      users.push(user);
      this._addNextUserId();
    } else {
      users = users.map((postMap) => (postMap.id === user.id ? user : postMap));
    }
    this._insertUsers(users);
  }
  _getAuth() {
    return JSON.parse(window.localStorage.getItem("auth"));
  }
  _isAuthenticate() {
    if (!this._getAuth()) {
      throw "Necessario autenticação";
    }
    return true;
  }
  _setAuth(user) {
    window.localStorage.setItem("auth", JSON.stringify(user));
  }
  _logout() {
    window.localStorage.removeItem("auth");
  }
  _auth(username, password) {
    const user = this._getUserByUsername(username);
    if (!user) {
      throw "Usuario não encontrado";
    }
    if (user.password !== password) {
      throw "Usuario ou senha divergentes";
    }
    this._setAuth(user);
    return true;
  }
}

export default AuthFakerApi = new AuthFakerApi();

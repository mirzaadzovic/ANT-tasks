import axios from "../axios/axios";

export default class AuthService {
  static async getLoggedInUser() {
    const response = await axios.get("/auth/user").catch((err) => err);

    if (response?.status === 200) return response.data;

    throw Error("Unauthorized");
  }

  static async logIn(username, password) {
    const response = await axios
      .post("/auth/login", { username: username, password: password })
      .catch((err) => err);

    if (response?.status === 200) return response.data;

    throw Error("Unauthorized");
  }

  static async register(username, password) {
    const response = await axios
      .post("/auth/register", { username: username, password: password })
      .catch((err) => err);

    if (response?.status === 201) return response.data;

    throw Error("Unauthorized");
  }

  static async logOut() {
    await axios.get("/auth/logout").catch((err) => err);
  }
}

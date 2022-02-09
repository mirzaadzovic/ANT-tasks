import axios from "../axios/axios";

export default class APIService {
  static async getAll(route) {
    const response = await axios.get(route).catch((err) => err);

    if (response.status === 200) return response.data;

    throw Error(response);
  }

  static async post(route, requestBody) {
    const response = await axios.post(route, requestBody).catch((err) => err);
    console.log(response);
    if (response?.status === 201) return response.data;

    throw Error(response);
  }
}

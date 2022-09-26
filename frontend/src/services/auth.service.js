import axios from "axios";
import Cookies from "js-cookie";

class AuthService {
  async login(identifier, password) {
    var data = new URLSearchParams();

    data.append("emailOrUsername", identifier);
    data.append("password", password);
    const response = await axios.post(
      "http://localhost:8000/users/login",
      data
    );

    if (response.data.access_token) {
      Cookies.set("user", response.data.access_token);
    }
    console.log(response.data.access_token);

    return response.data.access_token;
  }

  logout() {
    Cookies.remove("user");
  }

  register(username, firstname, lastname, email, password) {
    console.log(firstname);
    console.log(username);
    console.log(lastname);
    console.log(email);
    console.log(password);

    var data = new URLSearchParams();

    data.append("username", username);
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("email", email);
    data.append("password", password);

    return axios.post("http://localhost:8000/users", data);
  }

  getCurrentUser() {
    return Cookies.get("user");
  }
}
export default new AuthService();

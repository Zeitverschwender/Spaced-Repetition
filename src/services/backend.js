import axios from "axios";

import { RepeatingItem } from "../models/repeatingitem";

const ENDPOINT_REPEATING_ITEMS =
  process.env.REACT_APP_API_URL + "repeatingitems";
const ENDPOINT_REPEATING_INTERVALS =
  process.env.REACT_APP_API_URL + "repeatingintervals";
export const ENDPOINT_GOOGLE = process.env.REACT_APP_API_URL + "auth/google";
const ENDPOINT_GOOGLE_LOGOUT = process.env.REACT_APP_API_URL + "auth/logout";
const ENDPOINT_USER_STATUS = process.env.REACT_APP_API_URL + "user/status";
const ENDPOINT_USER_NAME = process.env.REACT_APP_API_URL + "user/name";
const ENDPOINT_USER_PHOTO = process.env.REACT_APP_API_URL + "user/photo";
axios.defaults.withCredentials = true;

const TOKEN_LOCATION = "loginToken";
class Backend {
  setToken(token) {
    localStorage.setItem(TOKEN_LOCATION, token);
  }
  getToken() {
    return localStorage.getItem(TOKEN_LOCATION);
  }
  removeToken() {
    localStorage.removeItem(TOKEN_LOCATION);
  }

  getRepeatingItems(onSuccess, onFailure) {
    axios
      .get(`${ENDPOINT_REPEATING_ITEMS}/${this.getToken()}/`)
      .then((res) => {
        const items = [];
        res.data.forEach((item) => {
          items.push(new RepeatingItem(item));
        });
        onSuccess(items);
      })
      .catch((err) => {
        onFailure("Error: ", "Could'nt get items.");
      });
  }

  getDefaultIntervals(onSuccess, onFailure) {
    axios
      .get(ENDPOINT_REPEATING_INTERVALS)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onFailure("Error: ", "Could'nt get default intervals.");
      });
  }
  getIntervals(onSuccess, onFailure) {
    axios
      .get(`${ENDPOINT_REPEATING_INTERVALS}/${this.getToken()}/`)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onFailure("Error: ", "Could'nt get your custom intervals.");
      });
  }

  createItem(data, onSuccess, onFailure) {
    axios
      .post(`${ENDPOINT_REPEATING_ITEMS}/${this.getToken()}/`, data)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onFailure(err);
      });
  }
  editItem(editedItem, onSuccess, onFailure) {
    axios
      .patch(
        `${ENDPOINT_REPEATING_ITEMS}/${this.getToken()}/${editedItem._id}`,
        editedItem
      )
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onFailure(err);
      });
  }
  deleteItem(id, onSuccess, onFailure) {
    axios
      .delete(`${ENDPOINT_REPEATING_ITEMS}/${this.getToken()}/${id}`)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onFailure(err);
      });
  }

  isUserLoggedIn(onSuccess, onFailure) {
    if (!this.getToken()) {
      onSuccess(false);
    }
    axios
      .get(`${ENDPOINT_USER_STATUS}/${this.getToken()}`)
      .then((res) => {
        onSuccess(res.data === 'Logged In');
      })
      .catch((err) => {
        onFailure(err);
      });
  }

  logout(onSuccess, onFailure) {
    axios
      .get(`${ENDPOINT_GOOGLE_LOGOUT}/${this.getToken()}`)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onFailure(err);
      });
  }
  getUserName(onSuccess, onFailure) {
    axios
      .get(`${ENDPOINT_USER_NAME}/${this.getToken()}`)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onFailure(err);
      });
  }
  getUserPhoto(onSuccess, onFailure) {
    axios
      .get(`${ENDPOINT_USER_PHOTO}/${this.getToken()}`)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onFailure(err);
      });
  }
  createInterval(newInterval, onSuccess, onFailure) {
    axios
      .post(`${ENDPOINT_REPEATING_INTERVALS}/${this.getToken()}`, newInterval)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onFailure(err);
      });
  }
}
export default Backend;

import axios from "axios";

import { RepeatingItem } from "../models/repeatingitem";

const ENDPOINT_REPEATING_ITEMS =
  process.env.REACT_APP_API_URL + "repeatingitems";
const ENDPOINT_REPEATING_INTERVALS =
  process.env.REACT_APP_API_URL + "repeatingintervals";
const ENDPOINT_GOOGLE = process.env.REACT_APP_API_URL + "auth/google";

const TOKEN_LOCATION = "loginToken";
class Backend {
  setToken(token) {
    localStorage.setItem(TOKEN_LOCATION, token);
  }
  getToken() {
    const token = localStorage.getItem(TOKEN_LOCATION);
    if (!token) {
      alert("Not Logged In"); // Doesn't get called
    }
    return token;
  }

  getRepeatingItems(onSuccess, onFailure) {
    axios
      .get(`${ENDPOINT_REPEATING_ITEMS}/${this.getToken()}/`)
      .then((res) => {
        const items = [];
        res.data.forEach((item) => {
          items.push(Object.assign(new RepeatingItem(), item));
        });
        onSuccess(items);
      })
      .catch((err) => {
        onFailure(err);
      });
  }

  getDefaultIntervals(onSuccess, onFailure) {
    axios
      .get(ENDPOINT_REPEATING_INTERVALS)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onFailure(err);
      });
  }
  getIntervals(onSuccess, onFailure) {
    axios
      .get(`${ENDPOINT_REPEATING_INTERVALS}/${this.getToken()}/`)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onFailure(err);
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
    console.log(editedItem);
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

  getLoginURL() {
    return ENDPOINT_GOOGLE;
  }
}
export default Backend;

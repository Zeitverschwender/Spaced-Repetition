import axios from "axios";

import { RepeatingItem } from "../models/repeatingitem";

const ENDPOINT_REPEATING_ITEMS = "repeatingitems";
const ENDPOINT_REPEATING_INTERVALS = "repeatingintervals";

class Backend {
  getRepeatingItems(onSuccess, onFailure) {
    axios
      .get(process.env.REACT_APP_API_URL + ENDPOINT_REPEATING_ITEMS)
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

  getIntervals(onSuccess, onFailure) {
    axios
      .get(process.env.REACT_APP_API_URL + ENDPOINT_REPEATING_INTERVALS)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onFailure(err);
      });
  }

  createItem(data, onSuccess, onFailure) {
    axios
      .post(process.env.REACT_APP_API_URL + ENDPOINT_REPEATING_ITEMS, data)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onFailure(err);
      });
  }
}
export default Backend;

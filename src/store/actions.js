import axios from "axios";
import actionTypes from "./action-types";
import { SET_DATA } from "./mutation-types";

const actions = {
  [actionTypes.UPDATE_GLOBAL_BLOGS]({ commit }) {
    axios
      .get("http://localhost:3001/main")
      .then(res => {
        const { data } = res;
        commit(SET_DATA, data);
        sessionStorage.setItem("data:blog", JSON.stringify(data.blog));
      })
      .catch(err => {
        throw new Error(err);
      });
  }
};

export default actions;

import * as types from './mutations';
import Vue from 'vue';

export const fetchList = ({ dispatch }) => {
  dispatch(types.GET_LIST);
  return Vue.http.get('https://cnodejs.org/api/v1/topics')
    .then(res => {
      dispatch(types.GET_LIST_SUCCESS, res.data.data);
    }, res => {
      dispatch(types.GET_LIST_FAILURE, res);
    });
};


export const fetchTopic = ({ dispatch }, tid) => {
  dispatch(types.GET_TOPIC);
  return Vue.http.get('https://cnodejs.org/api/v1/topic/' + tid)
    .then(res => {
      if (res.data.success) {
        dispatch(types.GET_TOPIC_SUCCESS, res.data.data);
      } else {
        dispatch(types.GET_TOPIC_FAILURE, res.data);
      }
    }, res => {
      dispatch(types.GET_TOPIC_FAILURE, res);
    });
};


export const fetchUser = ({ dispatch }, username) => {
  dispatch(types.GET_USER);
  return Vue.http.get('https://cnodejs.org/api/v1/user/' + username)
    .then(res => {
      if (res.data.success) {
        dispatch(types.GET_USER_SUCCESS, res.data.data);
      } else {
        dispatch(types.GET_USER_FAILURE, res.data);
      }
    }, res => {
      dispatch(types.GET_USER_FAILURE, res);
    });
}

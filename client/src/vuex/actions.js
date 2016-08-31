import * as types from './mutations';
import Vue from 'vue';

export const getList = ({ dispatch }) => {
  dispatch(types.GET_LIST);
  return Vue.http.get('https://cnodejs.org/api/v1/topics')
    .then(res => {
      dispatch(types.GET_LIST_SUCCESS, res.data.data);
    }, res => {
      dispatch(types.GET_LIST_FAILURE, res);
    });
};


export const getCurTopic = ({ dispatch }, tid) => {
  dispatch(types.GET_TOPIC);
  return Vue.http.get('https://cnodejs.org/api/v1/topic/' + tid)
    .then(res => {
      dispatch(types.GET_TOPIC_SUCCESS, res.data);
    }, res => {
      dispatch(types.GET_TOPIC_FAILURE, res);
    });
};

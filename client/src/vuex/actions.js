import * as types from './mutations';
import Vue from 'vue';

export const getNews = ({ dispatch }) => {
  dispatch(types.GET_NEWS);
  return Vue.http.get('http://localhost:5001/news/latest')
    .then(res => {
      dispatch(types.GET_NEWS_SUCCESS, res.data);
    }, res => {
      dispatch(types.GET_NEWS_FAILURE, res);
    });
};


export const getCurTopic = ({ dispatch }, tid) => {
  dispatch(types.GET_TOPIC);
  return Vue.http.get('http://localhost:5001/news/' + tid)
    .then(res => {
      dispatch(types.GET_TOPIC_SUCCESS, res.data);
    }, res => {
      dispatch(types.GET_TOPIC_FAILURE, res);
    });
};

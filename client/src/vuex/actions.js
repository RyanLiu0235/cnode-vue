import {
	GET_NEWS,
	GET_HISTORIES,
	GET_DATA_FAILURE,
	GET_DATA_SUCCESS
} from './mutations';
import Vue from 'vue';

export const getNews = ({ dispatch }) => {
  dispatch(GET_NEWS);
  return Vue.http.get('http://localhost:5001/news/latest')
  	.then(res => {
  		dispatch(GET_DATA_SUCCESS, res.data);
  	}, res => {
      dispatch(GET_DATA_FAILURE, res);
    });
};

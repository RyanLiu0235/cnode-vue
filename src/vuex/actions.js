import * as types from './mutations';
import Vue from 'vue';

/**
 * 获取首页列表数据
 */
export const fetchList = ({ dispatch }) => {
  dispatch(types.GET_LIST);
  return Vue.http.get('https://cnodejs.org/api/v1/topics')
    .then(res => {
      dispatch(types.GET_LIST_SUCCESS, res.data.data);
    }, res => {
      dispatch(types.GET_LIST_FAILURE, res);
    });
};


/**
 * 获取某个帖子数据
 */
export const fetchTopic = ({ dispatch }, tid) => {
  dispatch(types.GET_TOPIC);
  return Vue.http.get('https://cnodejs.org/api/v1/topic/' + tid)
    .then(res => {
      dispatch(types.GET_TOPIC_SUCCESS, res.data.data);
    }, res => {
      dispatch(types.GET_TOPIC_FAILURE, res);
    });
};


/**
 * 获取某个用户数据
 */
export const fetchUser = ({ dispatch }, username) => {
  dispatch(types.GET_USER);
  return Vue.http.get('https://cnodejs.org/api/v1/user/' + username)
    .then(res => {
      dispatch(types.GET_USER_SUCCESS, res.data.data);
    }, res => {
      dispatch(types.GET_USER_FAILURE, res);
    });
}

/**
 * 登录验证
 */
export const signin = ({ dispatch }, accesstoken) => {
  dispatch(types.SIGN_IN);
  return Vue.http.post('https://cnodejs.org/api/v1/accesstoken', {accesstoken: accesstoken})
    .then(res => {
      dispatch(types.SIGN_IN_SUCCESS, res.data.loginname);
      return Promise.resolve(res.data.loginname);
    }, res => {
      return Promise.reject(res.data.error_msg);
    });
}

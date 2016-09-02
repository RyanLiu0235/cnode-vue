import * as types from './mutations';
import Vue from 'vue';

/**
 * 获取首页列表数据
 */
export const fetchList = ({ dispatch }, tabType = 'all', page = 1) => {
  dispatch(types.GET_LIST);
  return Vue.http.get('https://cnodejs.org/api/v1/topics', { params: { tab: tabType, page: page } })
    .then(res => {
      dispatch(types.GET_LIST_SUCCESS, res.data.data);
      return Promise.resolve(res.data.data);
    }, res => {
      dispatch(types.GET_LIST_FAILURE);
      return Promise.reject(res);
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
      return Promise.resolve(res.data.data);
    }, res => {
      dispatch(types.GET_TOPIC_FAILURE);
      return Promise.reject(res);
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
      return Promise.resolve(res.data.data);
    }, res => {
      dispatch(types.GET_USER_FAILURE);
      return Promise.reject(res);
    });
}

/**
 * 登录验证
 */
export const signin = ({ dispatch }, accesstoken) => {
  dispatch(types.SIGN_IN);
  return Vue.http.post('https://cnodejs.org/api/v1/accesstoken', { accesstoken: accesstoken })
    .then(res => {
      dispatch(types.SIGN_IN_SUCCESS, res.data.loginname, accesstoken);
      return Promise.resolve(res.data.loginname);
    }, res => {
      dispatch(types.SIGN_IN_FAILURE);
      return Promise.reject(res.data.error_msg);
    });
}

/**
 * 收藏帖子
 */
export const collectTopic = ({ dispatch }, accesstoken, topic_id) => {
  console.log(accesstoken, topic_id)
  dispatch(types.COLLECT_TOPIC);
  return Vue.http.post('https://cnodejs.org/api/v1/topic_collect/collect', {accesstoken: accesstoken, topic_id: topic_id})
    .then(res => {
      dispatch(types.COLLECT_TOPIC_SUCCESS, res.data.success);
      return Promise.resolve(res);
    }, res => {
      dispatch(types.COLLECT_TOPIC_FAILURE);
      return Promise.reject(res);
    })
}






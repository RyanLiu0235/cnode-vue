import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import { saveLocalItem, getLocalItem, removeLocalItem } from '../utils';

import * as types from './mutations';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  topicList: [],
  topic: {},
  user: {},
  loginUser: {
    loginname: getLocalItem('loginname') || '',
    accesstoken: getLocalItem('accesstoken') || '',
    avatar_url: getLocalItem('avatar_url') || ''
  },
  collectedTopics: getLocalItem('collect_topics') ? getLocalItem('collect_topics').split(',') : false || []
};

const mutations = {
  [types.GET_LIST](state) {},
  [types.GET_LIST_SUCCESS](state, data) {
    state.topicList = data;
  },
  [types.GET_LIST_FAILURE](state) {},

  [types.GET_TOPIC](state) {},
  [types.GET_TOPIC_SUCCESS](state, data) {
    state.topic = data;
  },
  [types.GET_TOPIC_FAILURE](state) {},

  [types.GET_USER](state) {},
  [types.GET_USER_SUCCESS](state, data) {
    state.user = data;
  },
  [types.GET_USER_FAILURE](state) {},

  [types.SIGN_IN](state) {},
  [types.SIGN_IN_SUCCESS](state, user) {
    state.loginUser = user;
    // 本地存储
    saveLocalItem('loginname', user.loginname);
    saveLocalItem('accesstoken', user.accesstoken);
    saveLocalItem('avatar_url', user.avatar_url);
  },
  [types.SIGN_IN_FAILURE](state) {},

  [types.COLLECT_TOPIC](state) {},
  [types.COLLECT_TOPIC_SUCCESS](state, data) {
    // 每次收藏成功，就更新store以及sessionStorage里的收藏名单
    state.collectedTopics.push(data);
    saveLocalItem('collect_topics', state.collectedTopics);
  },
  [types.COLLECT_TOPIC_FAILURE](state) {},

  [types.DECOLLECT_TOPIC](state) {},
  [types.DECOLLECT_TOPIC_SUCCESS](state, data) {
    // 每次取消收藏成功，就更新store以及sessionStorage里的收藏名单
    state.collectedTopics.pop(data);
    saveLocalItem('collect_topics', state.collectedTopics);
  },
  [types.DECOLLECT_TOPIC_FAILURE](state) {},

  [types.SIGN_OUT](state) {
    state.loginUser.loginname = '';
    state.loginUser.accesstoken = '';
    state.loginUser.avatar_url = '';
    // 删除本地存储
    removeLocalItem('loginname');
    removeLocalItem('accesstoken');
    removeLocalItem('avatar_url');
  },

  [types.GET_USER_COLLECT](state, cids) {
    state.collectedTopics = cids;

    saveLocalItem('collect_topics', cids);
  }
};

export default new Vuex.Store({
  state,
  mutations
});

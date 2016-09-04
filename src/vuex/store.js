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
  loginname: getLocalItem('loginname') || '',
  accesstoken: getLocalItem('accesstoken') || '',
  avatar_url: getLocalItem('avatar_url') || '',
  collectedTopics: getLocalItem('collect_topics') ? getLocalItem('collect_topics').split(',') : false || [],
  unread: 0,
  notifications: {}
};

const mutations = {
  [types.GET_LIST_SUCCESS](state, data) {
    state.topicList = data;
  },
  [types.GET_TOPIC_SUCCESS](state, data) {
    state.topic = data;
  },
  [types.GET_USER_SUCCESS](state, data) {
    state.user = data;
  },
  [types.SIGN_IN_SUCCESS](state, user) {
    // 难不成Vue只能用这样赋值的方式来改变全局的store？
    // state = Object.assign({}, state, user);
    state.loginname = user.loginname;
    state.accesstoken = user.accesstoken;
    state.avatar_url = user.avatar_url;

    // 本地存储
    saveLocalItem('loginname', user.loginname);
    saveLocalItem('accesstoken', user.accesstoken);
    saveLocalItem('avatar_url', user.avatar_url);
  },
  [types.COLLECT_TOPIC_SUCCESS](state, data) {
    // 每次收藏成功，就更新store以及sessionStorage里的收藏名单
    state.collectedTopics.push(data);
    saveLocalItem('collect_topics', state.collectedTopics);
  },
  [types.DECOLLECT_TOPIC_SUCCESS](state, data) {
    // 每次取消收藏成功，就更新store以及sessionStorage里的收藏名单
    state.collectedTopics.pop(data);
    saveLocalItem('collect_topics', state.collectedTopics);
  },

  [types.SIGN_OUT](state) {
    state.loginname = '';
    state.accesstoken = '';
    state.avatar_url = '';
    // 删除本地存储
    removeLocalItem('loginname');
    removeLocalItem('accesstoken');
    removeLocalItem('avatar_url');
  },

  [types.GET_USER_COLLECT](state, cids) {
    state.collectedTopics = cids;
    saveLocalItem('collect_topics', cids);
  },

  [types.GET_USER_NOTIFICATION_NUM](state, num) {
    state.unread = num;
    saveLocalItem('unread_notifications', num);
  },

  [types.GET_USER_NOTIFICATION](state, notifications) {
    state.notifications = notifications;
  }
};

export default new Vuex.Store({
  state,
  mutations
});

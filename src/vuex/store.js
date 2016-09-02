import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import { saveLocalItem, getLocalItem } from '../localStore';

import * as types from './mutations';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  topicList: [],
  topic: {},
  user: {},
  loginname: getLocalItem('loginname') || '',
  accesstoken: getLocalItem('accesstoken') || '',
  collectTopics: []
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
  [types.SIGN_IN_SUCCESS](state, loginname, accesstoken) {
    state.loginname = loginname;
    state.accesstoken = accesstoken;
    // 本地存储 loginname
    saveLocalItem('loginname', loginname);
    saveLocalItem('accesstoken', accesstoken);
  },
  [types.SIGN_IN_FAILURE](state) {},

  [types.COLLECT_TOPIC](state) {},
  [types.COLLECT_TOPIC_SUCCESS](state, data) {

  },
  [types.COLLECT_TOPIC_FAILURE](state) {},
  
  [types.DECOLLECT_TOPIC](state) {},
  [types.DECOLLECT_TOPIC_SUCCESS](state, data) {

  },
  [types.DECOLLECT_TOPIC_FAILURE](state) {}
};

export default new Vuex.Store({
  state,
  mutations
});

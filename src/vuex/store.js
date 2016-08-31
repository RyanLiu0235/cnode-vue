import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

import * as types from './mutations';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  topicList: [],
  topic: {},
  user: {}
};

const mutations = {
  [types.GET_LIST](state) {},
  [types.GET_LIST_SUCCESS](state, data) {
    state.topicList.push(data);
  },
  [types.GET_LIST_FAILURE](state, data) {},
  [types.GET_TOPIC](state) {},
  [types.GET_TOPIC_SUCCESS](state, data) {
    state.topic = data;
  },
  [types.GET_TOPIC_FAILURE](state, data) {},
  [types.GET_USER](state) {},
  [types.GET_USER_SUCCESS](state, data) {
    state.user = data;
  },
  [types.GET_USER_FAILURE](state, data) {}
};

export default new Vuex.Store({
  state,
  mutations
});

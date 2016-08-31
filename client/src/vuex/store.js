import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

import * as types from './mutations';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  stories: [],
  topic: {},
  curDate: undefined
};

const mutations = {
  [types.GET_NEWS](state) {},
  [types.GET_NEWS_SUCCESS](state, data) {
    state.stories.push(data.stories);
    state.curDate = data.date;
  },
  [types.GET_NEWS_FAILURE](state, data) {},
  [types.GET_TOPIC](state) {},
  [types.GET_TOPIC_SUCCESS](state, data) {
    state.topic = data;
  },
  [types.GET_TOPIC_FAILURE](state, data) {}
};

export default new Vuex.Store({
  state,
  mutations
});

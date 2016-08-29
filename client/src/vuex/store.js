import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

import {
  GET_NEWS,
  GET_HISTORIES,
  GET_DATA_FAILURE,
  GET_DATA_SUCCESS
} from './mutations';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  stories: [],
  curDate: undefined
};

const mutations = {
  GET_NEWS (state) {},
  GET_DATA_SUCCESS (state, data) {
    state.stories.push(data.stories);
    state.curDate = data.date;
  },
  GET_DATA_FAILURE (state, data) {}
};

export default new Vuex.Store({
  state,
  mutations
});


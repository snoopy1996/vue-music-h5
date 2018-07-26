/*
 * @Author: 忍把浮名换此生
 * @Date: 2018-06-17 20:32:45
 * @Last Modified by: 忍把浮名换此生
 * @Last Modified time: 2018-06-26 16:58:02
 */
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import getter from './getter';
import actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  getter,
  actions
});

export default store;

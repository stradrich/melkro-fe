// src/plugins/vuetify.js
import Vue from 'vue';
import Vuetify, {
  VDataTable,
} from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VDataTable,
  },
});

const opts = {};

export default new Vuetify(opts);

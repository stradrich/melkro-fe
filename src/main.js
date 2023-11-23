import './assets/main.css'
import 'flatpickr/dist/flatpickr.css';
import '@mdi/font/css/materialdesignicons.css' 

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify

import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
// import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.min.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
// import '@mdi/font/css/materialdesignicons.css';


const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        },
      },
})

// const vuetify = new Vuetify({
//   icons: {
//     defaultSet: 'mdi',
//     aliases,
//     sets: {
//       mdi,
//     },
//   },
// });

// Import App.vue
import App from './App.vue'

import router from './router'
import './assets/main.css'
import './index.css'

// Create the app instance
const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')

// import './assets/main.css';
// import 'flatpickr/dist/flatpickr.css';
// import '@mdi/font/css/materialdesignicons.css';

// import { createApp } from 'vue';
// import { createPinia } from 'pinia';

// // Vuetify
// import 'vuetify/styles';
// import { createVuetify } from 'vuetify';
// import { VDataTable } from 'vuetify/labs/VDataTable'; // Manual import of VDataTable
// import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

// const vuetify = createVuetify({
//   components: {
//     VDataTable,
//   },
//   directives: {},
//   icons: {
//     defaultSet: 'mdi',
//     aliases,
//     sets: {
//       mdi,
//     },
//   },
// });

// // Import App.vue
// import App from './App.vue';

// import router from './router';

// // Create the app instance
// const app = createApp(App);

// app.use(createPinia());
// app.use(vuetify);
// app.use(router);

// app.mount('#app');

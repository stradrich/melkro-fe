import './assets/main.css'
import 'flatpickr/dist/flatpickr.css';
import '@mdi/font/css/materialdesignicons.css' 

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
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

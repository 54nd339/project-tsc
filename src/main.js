import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faAnglesUp, faPlus, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAnglesUp, faPenToSquare, faTrash, faPlus, faCheck)

import App from '@/App.vue'
import router from '@/router/index.js'
import '@/assets/styles.css'

const app = createApp(App)
    .use(BootstrapVue3)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    
app.mount('#app')
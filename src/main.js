import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faYoutube, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faAnglesUp, faPenToSquare, faPlus, faTrash, faCheck, faLocationDot,
    faMagnifyingGlass, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faYoutube, faInstagram, faFacebook, faAnglesUp, faPenToSquare, faTrash, faPlus,
    faCheck, faLocationDot, faMagnifyingGlass, faGear)

import App from '@/App.vue'
import router from '@/router/index.js'
import '@/assets/styles.css'

const app = createApp(App)
    .use(BootstrapVue3)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Talent Sprint Classes'
    next()
})
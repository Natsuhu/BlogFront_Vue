import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import './assets/css/typo.css'
import 'semantic-ui-css/semantic.min.css'
import './utils/TimeUtils'
import './utils/directive'

Vue.config.productionTip = false

console.log(
	'%c NatsuKazeBlog %c By NatsuKaze %c ',
	'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
	'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #000',
	'background:transparent'
)

Vue.use(VueAxios,axios)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

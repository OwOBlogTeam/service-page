import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const app = createApp(App)

const ignoreIonIconReg = /ion-/i;
app.config.warnHandler = (msg, instance, trace) => {
  if(!ignoreIonIconReg.test(msg)) {
    console.warn('[Vue Warn] ' + msg + '\n' + trace);
  }
}
app.use(router)
app.mount('#app')

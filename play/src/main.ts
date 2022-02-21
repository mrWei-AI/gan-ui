import {createApp} from 'vue'
import App from './App.vue';
import installer from '../../packages/gan/index';
import '../../packages/components/style'
const app = createApp(App);

app.use(installer)
app.mount('#app');
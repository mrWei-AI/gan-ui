import Loading from './src/loading'
import vLoading from './src/vLoading'
import type {App} from 'vue'

const GLoading = {
  install(app:App) {
    app.directive('loading',vLoading)
    app.config.globalProperties.$loading = Loading
  },
  service: Loading,
}
export default  GLoading
export { GLoading }
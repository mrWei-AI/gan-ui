import Loading from './src/loading'
import vLoading from './src/directives'
import type {App} from 'vue'

const GLoading = {
  install(app:App) {
    app.directive('loading',vLoading)
    app.config.globalProperties.$loading = Loading
  },
    directives:vLoading,
    service: Loading,
}
export default  GLoading
export { GLoading }

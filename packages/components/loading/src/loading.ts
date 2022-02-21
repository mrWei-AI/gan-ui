import createLoading from './createLoading'
import type { LoadingInstance, LoadingOptionsType } from './loading.type'

const defaults: LoadingOptionsType = {
  parent: null,
  background: '',
  path: null,
  svgText: undefined,
  svgViewBox: undefined,
  spinner: false,
  text: null,
  fullscreen: true,
  lock: false,
  customClass: '',
  instance: {},
  target: null,
  width: undefined,
  height: undefined,
  iconName:'circle',
}

const globalLoadingOption:{ fullLoading: LoadingInstance | null}  = {
  fullLoading: null,
}
const Loading = (options?: LoadingOptionsType) => {
  options = {
    ...defaults,
    ...options,
  }
  if (typeof options.target == 'string') {
    options.target = document.querySelector(`.${options.target}`) as HTMLElement
  }
  options.target = options.target || document.body

  if (options.fullscreen && globalLoadingOption.fullLoading) {
    globalLoadingOption.fullLoading.destory()
  }

  options.parent = options.target as HTMLElement

  const instance = createLoading({
    ...options,
  })

  options.parent.appendChild(instance.$el)

  if (options.fullscreen) {
    globalLoadingOption.fullLoading = instance
  }

  return instance

}
export default Loading
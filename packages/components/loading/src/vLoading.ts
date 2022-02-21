import type {DirectiveBinding} from 'vue'
import Loading from './loading'

const INSTANCE = 'GLoading'


interface VLoadingType extends HTMLElement{
  [INSTANCE]: {
    close: () => void
    open: () => void
  }
}

const createInstance = (el: VLoadingType, binding: DirectiveBinding) => {
  const { instance, modifiers: { fullscreen } } = binding
  el[INSTANCE] = Loading({
    target: fullscreen ? null : el
  })
}


export default {
  mounted(el: VLoadingType, binding: DirectiveBinding) {
    createInstance(el, binding)
  },
  updated(el: VLoadingType, binding: DirectiveBinding) {
    const { value, oldValue } = binding

    if (value != oldValue) {
      if (value) {
        createInstance(el, binding)
      } else {
        el[INSTANCE].close()
      }
    }
  },
}
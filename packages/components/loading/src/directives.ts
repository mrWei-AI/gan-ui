import type {DirectiveBinding} from 'vue'
import type {LoadingInstance} from "./loading.type";
import Loading from './loading'

const INSTANCE = 'GLoading'


export interface VLoadingType extends HTMLElement{
  [INSTANCE]: LoadingInstance
}

const createInstance = (el: VLoadingType, binding: DirectiveBinding) => {
  const { instance, modifiers: { fullscreen } } = binding
  el[INSTANCE] = Loading({
    target: fullscreen ? null : el
  })
}


 const vLoading={
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
export default vLoading

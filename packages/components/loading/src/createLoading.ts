import type { VNodeTypes } from 'vue'
import { createVNode, h, inject, reactive, render, toRefs, Transition, vShow, withCtx, withDirectives,unref } from 'vue'
import { customImg, svg } from './createLoadingImage'
import type { LoadingInstance, LoadingOptionsType } from './loading.type'

type CreateLoadingType = {
  color?: string
} & LoadingOptionsType

const createLoading = (options: CreateLoadingType): LoadingInstance => {
  const data = reactive({
    ...options,
    show: true,
  })


  function destory() {
    if (vm.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el)
    }
  }

  function close() {
    data.show = false
  }

  function open() {
    data.show = true
  }

  const GanComponent: VNodeTypes = {

    setup() {
      return {
        ...toRefs(data),
      }
    },

    render() {
      const _image = () => {
        return h(
          customImg,
          {
            path: this.path,
          },
        )
      }
      const _imageDefault = () => {
        return h(
          svg,
          {
            type: this.iconName,
            viewBox: this.svgViewBox,
            width: this.width,
            height: this.height,
          },
        )
      }
      return h(
        Transition,
        {
          name: 'gen-loading-fade',
        },
        {
          default: withCtx(() => [
            withDirectives(
              h(
                'div',
                {
                  class: ['gan-loading'],
                },
                [
                  this.path ? _image() : _imageDefault(),
                ],
              ),
              [
                [vShow, this.show],
              ],
            ),
          ]),
        },
      )
    },
  }

  const vm = createVNode(GanComponent)
  render(vm, document.createElement('div'))

  return {
    vm,
    get $el() {
      return vm.el as HTMLElement
    },
    close,
    open,
    destory,
  }
}
export default createLoading


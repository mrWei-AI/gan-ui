import type { ExtractPropTypes, PropType, UnwrapRef } from 'vue'
import { defineComponent, provide, reactive, watch } from 'vue'

export type SizeType = 'small' | 'large' | undefined

export const configProviderProps = {
  componentSize: {
    type: String as PropType<SizeType>,
    default:()=>'small'
  },
  prefixCls: String,
  getPrefixCls: {
    type: Function as PropType<
      (suffixCls?: string, customizePrefixCls?: string) => string
    >
  },
  loadingPath: Object as PropType<null | string>
}
export type ConfigProviderProps = Partial<ExtractPropTypes<typeof configProviderProps>>

export default defineComponent({
  name: 'GConfigProvider',
  props: configProviderProps,
  setup(props, { slots }) {
    const getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
      const { prefixCls = 'gan' } = props
      if (customizePrefixCls) return customizePrefixCls
      return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls
    }
    const configProvide = reactive({
      ...props,
      getPrefixCls: getPrefixCls,
    })
    Object.keys(props).forEach(key => {
      watch(
        () => props[key],
        () => (configProvide[key] = props[key])
      )
    })
    provide('configProvider', configProvide)
    return () => {
      return <div>{slots.default?.() ?? '请传入GanUI'}</div>
    }
  }
})

export const defaultConfigProvider: UnwrapRef<ConfigProviderProps> = reactive({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls
    return suffixCls ? `gan-${suffixCls}` : 'gan'
  },
  componentSize1:'small',
})

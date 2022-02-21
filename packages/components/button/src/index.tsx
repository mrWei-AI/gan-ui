import type { ExtractPropTypes, PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import useConfigInject from '../../../hooks/useConfigInject'
import PropTypes from '../../../utils/index'

export const buttonType = [
  'default',
  'primary',
  'success',
  'warning',
  'gray',
  'danger',
  'link'
] as const
const validateButtonType = function (value: unknown): boolean {
  return buttonType.includes(value as any)
}
const buttonProps = {
  size: PropTypes.string,
  type: {
    type: String as PropType<string>,
    values: buttonType,
    default: 'primary',
    validator: validateButtonType
  },
  shape: String as PropType<string>,
  disabled: Boolean as PropType<boolean>
}

export type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>

export default defineComponent({
  name: 'GButton',
  props: buttonProps,
  setup(props, { slots }) {
    const { prefixCls, size } = useConfigInject('button', props)

    const classes = computed(() => {
      const pre = prefixCls.value
      const { type, shape } = props

      return {
        [`${pre}`]: true,
        [`${pre}-${type}`]: type,
        [`${pre}-default`]: true,
        [`${pre}-${shape}`]: shape,
        [`${pre}-${size.value}`]: size.value
      }
    })
    return () => {
      const { disabled } = props
      const buttonAttrs = {
        disabled,
        class: [{ ...classes.value }]
      }
      return <button {...buttonAttrs}>{slots.default?.()}</button>
    }
  }
})

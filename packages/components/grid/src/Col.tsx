import { defineComponent, computed, inject, CSSProperties,ExtractPropTypes } from 'vue'
import PropTypes from '../../../utils/index'
import useConfigInject from '../../../hooks/useConfigInject'
import classNames from '../../../utils/classNames'

type ColSpanType = number | string
export interface ColSize {
  span?: ColSpanType
  offset?: ColSpanType
  push?: ColSpanType
  pull?: ColSpanType
}
const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number])
export const colSize = PropTypes.shape({
  span: stringOrNumber,
  offset: stringOrNumber,
  push: stringOrNumber,
  pull: stringOrNumber
}).loose
const objectOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  colSize
])
const colProps = {
  span: stringOrNumber,
  offset: stringOrNumber,
  push: stringOrNumber,
  pull: stringOrNumber,
  xs: objectOrNumber,
  sm: objectOrNumber,
  md: objectOrNumber,
  lg: objectOrNumber,
  xl: objectOrNumber
}
export type ColProps = Partial<ExtractPropTypes<typeof colProps>>;

export default defineComponent({
  name: 'GCol',
  props: colProps,
  setup(props, { slots }) {
    const { gutter, gutterType } = inject('GRow', {
      gutter: { value: 0 },
      gutterType: { value: 'padding' }
    })
    const { prefixCls } = useConfigInject('col', props)
    const pre = prefixCls.value

    const style = computed<CSSProperties>(() => {
      if (gutter.value) {
        return {
          [`${gutterType.value}Left`]: `${gutter.value / 2}px`,
          [`${gutterType.value}Right`]: `${gutter.value / 2}px`
        }
      }
      return {}
    })

    const classes = computed(() => {
      const { span, offset, push, pull } = props
      let sizeObject = {}

      ;['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'].forEach(size => {
        let sizeProps: ColSize = {}
        const propSize = props[size]
        if (typeof propSize === 'number') {
          sizeProps.span = propSize
        } else if (typeof propSize === 'object') {
          sizeProps = propSize || {}
        }
        sizeObject = {
          ...sizeObject,
          [`${pre}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
          [`${pre}-${size}-offset-${sizeProps.offset}`]:
            sizeProps.offset || sizeProps.offset === 0,
          [`${pre}-${size}-push-${sizeProps.push}`]:
            sizeProps.push || sizeProps.push === 0,
          [`${pre}-${size}-pull-${sizeProps.pull}`]:
            sizeProps.pull || sizeProps.pull === 0
        }
      })

      return classNames(
        pre,
        {
          [`${pre}-${span}`]: span !== undefined,
          [`${pre}-offset-${offset}`]: offset,
          [`${pre}-push-${push}`]: push,
          [`${pre}-pull-${pull}`]: pull
        },
        sizeObject
      )
    })
    return () => {
      return (
        <div class={classes.value} style={style.value}>
          {slots.default?.()}
        </div>
      )
    }
  }
})

import { defineComponent, computed, provide } from 'vue'
import useConfigInject from '../../../hooks/useConfigInject'
import type { ExtractPropTypes, CSSProperties } from 'vue'

const RowProps = {
  gutter: {
    type: Number,
    default: 0
  },
  gutterType: {
    type: String,
    value: ['padding', 'margin'],
    default: 'margin'
  },
  justify: {
    type: String,
    values: ['start', 'center', 'end', 'space-around', 'space-between'],
    default: 'start'
  },
  align: {
    type: String,
    values: ['top', 'middle', 'bottom'],
    default: 'top'
  }
}
export type RowProps = ExtractPropTypes<typeof RowProps>

export default defineComponent({
  name: 'GRow',
  props: RowProps,
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('row', props)
    const gutter = computed(() => props.gutter)
    const gutterType = computed(() => props.gutterType)
    provide('GRow', {
      gutter,
      gutterType
    })

    const classes = computed(() => {
      const pre = prefixCls.value

      const ret = {
        marginLeft: '',
        marginRight: ''
      }
      if (props.gutter) {
        ret.marginLeft = `-${props.gutter / 2}px`
        ret.marginRight = ret.marginLeft
      }
      return {
        [`${pre}`]: true,
        [`is-justify-${props.justify}`]: props.justify !== 'start',
        [`is-align-${props.align}`]: props.align !== 'top',
        ...ret
      }
    })

    return () => {
      return <div class={classes.value}>{slots.default?.()}</div>
    }
  }
})

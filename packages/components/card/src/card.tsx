import {
  defineComponent,
  ExtractPropTypes,
  getCurrentInstance,
  inject,
  PropType,
  reactive,
  ref,
  useSlots
} from 'vue'
import { defaultConfigProvider } from '../../config-provider/src'

const cardProps = {
  header: {
    type: String as PropType<string>,
    default: ''
  },
  shadow: {
    type: String as PropType<string>,
    default: ''
  }
} as const
export type CardProps = ExtractPropTypes<typeof cardProps>

export default defineComponent({
  name: 'GCard',
  props: cardProps,
  setup(props, { slots }) {
    const state = reactive({
      name: '123'
    })

    const config = inject('configProvider', defaultConfigProvider)

    //nav
    let a = ref(0)
    const testclick = () => {
      console.log(config.componentSize)
    }

    const sl = {
      default: () => <div>A</div>,
      bar: name => <span>B,{name}</span>
    }
    return () => {
      return (
        <div>
          <child></child>
        </div>
      )
    }
  }
})

const child = defineComponent({
  name: 'child',
  slots: ['will'],
  setup(_, { slots }) {
    console.log(getCurrentInstance())
    return () => {
      return (
        <div>
          child:
          <div>{slots?.bar?.('asd')}</div>
          {slots.default?.('明珠')}
        </div>
      )
    }
  }
})

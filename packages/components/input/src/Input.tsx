import { defineComponent, PropType, computed, ref } from 'vue'
import PropTypes from '../../../utils'
import useConfigInject from '../../../hooks/useConfigInject'
import type { ExtractPropTypes } from 'vue'
const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number])
const inputProps = {
  type: {
    type: String,
    values: ['text', 'textarea'],
    default: 'text'
  },
  width: stringOrNumber,
  size: PropTypes.string,
    readonly: {
        type: Boolean,
        default: false
    },
  placeholder: {
    type: String,
    default: 'please input..'
  }
}
export type InputProps = ExtractPropTypes<typeof inputProps>
export default defineComponent({
  name: 'GInput',
  props: inputProps,
  setup(props, { emit }) {
    const { prefixCls, size } = useConfigInject('input', props)
    const classes = computed(() => {
      const pre = prefixCls.value
      const { type, placeholder } = props
      return {
        container: {
          [`${pre}`]: true
        },
        inner: {
          [`${pre}-inner`]: true,
          [`${pre}-${size.value}`]: size,
          [`${pre}-${type}`]: type,
          [`${pre}-placeholder`]: placeholder
        }
      }
    })
    const suffixCls = computed(() => {
      const pre = prefixCls.value
      return {
        [`${pre}-suffix`]: true,
        [`${pre}-${size.value}`]: true
      }
    })
    const isComposing = ref(false)

    const handleInput = (event: Event) => {
      if (isComposing.value) return
      emit('input', event)
    }
    const handleFocus = (event: FocusEvent) => {
      emit('focus', event)
    }

    const handleBlur = (event: FocusEvent) => {
      emit('blur', event)
    }

    const handleKeydown = (event: KeyboardEvent) => {
      emit('keydown', event)
    }
    const handleCompositionStart = (event: CompositionEvent) => {
      emit('compositionstart', event)
      isComposing.value = true
    }

    const handleCompositionUpdate = (event: CompositionEvent) => {
      emit('compositionupdate', event)
      const text = (event.target as HTMLInputElement)?.value
      const lastCharacter = text[text.length - 1] || ''
    }

    const handleCompositionEnd = (event: CompositionEvent) => {
      emit('compositionend', event)
      if (isComposing.value) {
        isComposing.value = false
        handleInput(event)
      }
    }

    return () => {
      const { type, placeholder ,readonly} = props
      return (
        <div class={classes.value.container}>
          <input
            type={type}
            readonly={readonly}
            class={classes.value.inner}
            placeholder={placeholder}
            onCompositionstart={handleCompositionStart}
            onCompositionupdate={handleCompositionUpdate}
            onCompositionend={handleCompositionEnd}
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeydown={handleKeydown}
          />
          <span class={suffixCls.value}>{/*todo icon*/}G</span>
        </div>
      )
    }
  }
})

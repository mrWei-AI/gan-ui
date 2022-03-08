import type { ExtractPropTypes, PropType } from 'vue'
import { computed, defineComponent,ref,onMounted,watch ,watchEffect} from 'vue'
import useConfigInject from '../../../hooks/useConfigInject'
import PropTypes from '../../../utils/index'
import GInput from "../../input/src/Input";
import type {} from "vue";
const selectProps = {
    size: PropTypes.string,
}

export type SelectProps = Partial<ExtractPropTypes<typeof selectProps>>

export default defineComponent({
    name: 'GSelect',
    props: selectProps,
    components: {GInput},
    setup(props, {slots}) {
        const {prefixCls, size} = useConfigInject('select', props)
        const classes = computed(() => {
            const pre = prefixCls.value

            return {
                [`${pre}`]: true,
            }
        })
        let gInput = ref(HTMLElement);

        watch(()=>size.value,(val,val2)=>{
            console.log(val,val2)
        })
        onMounted(()=>{



        })


        //淦，不想写了


        return () => {

            return <div class={classes.value}>
                <GInput ref={gInput}></GInput>

            </div>
        }
    }
});

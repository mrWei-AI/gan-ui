import {defineComponent,ExtractPropTypes} from 'vue'


const tableBody = {
    data:{
        type:Object || Array,
        default: null
    }

};
export type TableBody = Partial<ExtractPropTypes<typeof tableBody>>

const GTableBody= defineComponent({
    name:'GTableBody',
    props:tableBody,
    setup(props,{slots}) {


        return () => {
            return <div>body</div>
        };
    }
})
export default GTableBody

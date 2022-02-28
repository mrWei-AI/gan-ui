import {defineComponent} from 'vue'
import type {Component} from 'vue'
import PropTypes from '../../../utils'
import tableHeader from './table-header'
import tableBody from './table-body/index'

//好JB难写改天写
const TableProps = {
    data:{
        type:Object || Array,
        default: null
    }

};
export default defineComponent({
    name: 'GTable',
    components:{tableBody},
    props:TableProps,
    setup(props,{slots}) {
        const {data} = props;

        return () => {
            return (<div>
                {slots.default?.(123)}
            </div>)
        };

    }
});

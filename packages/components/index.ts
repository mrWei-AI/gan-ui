import GCard  from './card'
import GConfigProvider from './config-provider'
import GButton from './button'
import GLoading from './loading'
import {GRow,GCol} from "./grid";
import {GTable,GTableColumn} from './table'
import Input from './input'
import Select from './select'

export default [
    GConfigProvider,
    GCard,
    GButton,
    GRow,
    GCol,
    GTable,
    GTableColumn,
    Input,
    Select
]

export const plugin=[
    GLoading
]

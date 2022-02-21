import {makeInstaller} from "./make-installer";
import components,{plugin} from '../components/index'
export const install = makeInstaller([...components,...plugin]);
export default install
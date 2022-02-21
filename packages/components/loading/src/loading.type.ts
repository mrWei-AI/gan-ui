import type  {VNode} from 'vue'
export type LoadingOptionsType = {
  parent?: HTMLElement | null
  target?:HTMLElement | string | null | any
  background?: string
  path?: string | HTMLElement | null
  svgViewBox?: string | null
  svgText?:string | null
  spinner?: boolean | string
  text?: string | null
  fullscreen?: boolean
  body?: boolean
  lock?: boolean
  customClass?: string
  visible?: boolean
  instance?:any,
  width?:number,
  height?:number,
  iconName?:string,
}


export type LoadingInstance = {
  vm: VNode,
  $el: HTMLElement,
  close: () => void,
  destory: () => void,
  open:()=>void

}
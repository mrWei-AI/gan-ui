import type { VNodeChild, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export type VueNode = VNodeChild | JSX.Element;

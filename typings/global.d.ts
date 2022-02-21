
declare module '*.tsx' {
    import type { DefineComponent,App } from 'vue'
    // eslint-disable-next-line @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
    export const install:string;
}
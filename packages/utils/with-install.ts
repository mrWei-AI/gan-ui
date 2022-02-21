import {SFCWithInstall} from "./types";
import type {App,Plugin} from "vue";

export const withInstall = (comp: any) => {
    comp.install = (app: App): void => {
        app.component(comp.name, comp)
    };
    return comp
}
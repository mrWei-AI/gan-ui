import type {App,Plugin} from 'vue'

export const makeInstaller = (components:Plugin[]=[]) => {
    const install = (app:any) => {
        components.forEach((c) => {
            app.use(c)
        });
    };
    return {
        version:1,
        install
    }
};
export default makeInstaller
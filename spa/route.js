
import { Render } from "../res/dabMain.js";

class SPA {

    #router = [];
    #previousComponentRendered = null;

    constructor(){

        window.addEventListener("DOMContentLoaded",()=>{

            document.body.onclick = (e)=>{

                if(e.target.matches("[data-link]")){
                    e.preventDefault();
                    this.navigateTo(e.target.href);
                }

            }

        })

        window.onpopstate = ()=>{

            this.render();

        }

    }

    navigateTo(url){

        history.pushState(null,null,url);
        this.render();

    }

    addNewRouter(path,handler){

        this.#router.push({
            path,
            event: handler,
            isMatch: false
        });

    }

    matchRoute(path){

        return location.pathname === path;

    }

    updateRouteHandler(){

        const match = this.matchRoute;

        this.#router = this.#router.map( e =>({
           path: e.path,
           event: e.event,
           isMatch: match(e.path)
        }))

    }

    render(){

        this.updateRouteHandler();
        let routeHandler = this.#router.find(e => e.isMatch);

        if(!routeHandler){

            routeHandler = {
                path: location.pathname,
                event: ()=>{

                    console.log("page not found");

                },
                isMatch: true
            }

        }

        if(this.#previousComponentRendered instanceof Object){

            this.#previousComponentRendered.destroy();
            this.#previousComponentRendered = routeHandler.event();

        }else{

            this.#previousComponentRendered = routeHandler.event();

        }

    }

    routeTo(path,handler){

        this.addNewRouter(path,handler);

    }

}

export const Router = {
    SPA: new SPA(),
    route({path,component,data = {}}){

        this.SPA.routeTo(path,()=>{

            const Component = Render(component,document.body,data);
            return Component;

        });

        this.SPA.render();

    }
}
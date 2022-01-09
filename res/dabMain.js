import { Main } from "./dabMainClass.js";

export const dabMain = new Main();

export function findById(id){

	return dabMain.findById(id);

}

export function Render(Component,target,embedData){

	return {
		...dabMain.renderComponent(Component,target,embedData),
		updateComponentProperty(componentFunction,property){

			const newComponent = dabMain.renderComponent(componentFunction(property),void 0,embedData);
			dabMain.replaceChild(newComponent.component,this.component.element);

		}
	};

}


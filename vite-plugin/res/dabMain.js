import { Main } from "./dabMainClass.js";

export const dabMain = new Main();

export function Render(Component,target){

	return {
		...dabMain.renderComponent(Component,target),
		updateComponentProperty(componentFunction,property){

			const newComponent = dabMain.renderComponent(componentFunction(property));
			dabMain.replaceChild(newComponent.component,this.component.element);

		}
	};

}


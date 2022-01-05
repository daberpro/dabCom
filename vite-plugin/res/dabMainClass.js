import { Reactivity } from "./Reactivity.js";


export class Main{

	/**
	 * 
	 * @param {String} name 
	 * @param {{content: String,attribute: Object,parentComponent: String,positionComponent: String, state: Object}} attribute 
	 * @returns 
	 */
	createRawComponent(name,attribute){

		return {
			name,
			content: attribute?.content,
			attribute: attribute?.attribute,
			parentComponent: attribute?.parentComponent,
			positionComponent: attribute?.positionComponent,
			state: attribute?.state || {},
			event: attribute?.event || {}
		}

	}

	/**
	 * 
	 * @param {Object} rawComponent 
	 * @returns element,content,parent,position,destroy
	 */
	createComponent(rawComponent){

		const element = document.createElement(rawComponent.name);
		
		if(rawComponent?.attribute instanceof Object){

			for(let x in rawComponent?.attribute){

				element.setAttribute(x,rawComponent?.attribute[x]);

			}

		}

		const textNode = document.createTextNode(rawComponent?.content);
		element.appendChild(textNode);

		if(rawComponent?.event instanceof Object){

			for(let x in rawComponent?.event){

				element[x] = rawComponent?.event[x];

			}

		}

		return {
			element,
			content: textNode,
			rawContent: rawComponent?.content,
			parent: rawComponent.parentComponent,
			position: rawComponent.positionComponent,
			state: rawComponent?.state,
			destroy(onDestroy = ()=>{}){

				onDestroy();
				element.remove();

			},
			updateTextNode(){

				const text = this.rawContent;
				const resultText = eval(text);
				this.content.replaceData(0,text.length,resultText);

			},
			updateAttribute(){



			}
		}

	}

	/**
	 * 
	 * @param {Array<rawComponentCreate} StackRawComponent 
	 * @param {HTMLElement} target 
	 * @returns target
	 */
	renderComponent(StackRawComponent,target){

		const StackComponent = [];
		let State = {};
		let kindOfComponentBindingData = {};

		for(let x of StackRawComponent){

			const componentCreated = this.createComponent(x);
			State = {...State,...componentCreated.state};

			for(let y of Object.keys(componentCreated.state)){

				if(kindOfComponentBindingData[y] instanceof Array){

					kindOfComponentBindingData[y].push(componentCreated);

				}else{

					kindOfComponentBindingData[y] = [];
					kindOfComponentBindingData[y].push(componentCreated);

				}

			};

			StackComponent.push(componentCreated);

		}

		const element = {};

		for(let x of StackComponent){

			x.updateTextNode();

			if(!(element[x.position])){

				element[x.position] = x.element;

				if(element[x.parent]){

					element[x.parent].appendChild(x.element);

				}

			}
			else{

				element[x.position].appendChild(x.element);

			}

		}

		if(target instanceof HTMLElement) target.appendChild(element[Object.keys(element)[0]]);

		return {
			component: StackComponent[0],
			state: new Reactivity({
				Getter(object,propertyName){

					return object[propertyName];

				},
				Setter(object,propertyName,valueSet){

					for(let x of kindOfComponentBindingData[propertyName]){

						x.state[propertyName] = valueSet;
						x.updateTextNode();

					}

				}
			}).setReactive(State),
			updateComponentRendered(){

				for(let x of StackComponent){

					x.updateTextNode();

				}

			}
		}

	}

	/**
	 * 
	 * @param {HTMLElement} newComponent 
	 * @param {HTMLElement} oldComponent 
	 */
	replaceChild(newComponent,oldComponent){
		
		oldComponent.parentElement.replaceChild(newComponent.element,oldComponent);

	}

}
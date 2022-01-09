import { Reactivity } from "./Reactivity.js";


export class Main {

	#allComponentId = {};
	#kindOfComponentBindingData = {};

	createRawComponent(name, attribute) {

		return {
			name,
			content: attribute?.content,
			attribute: attribute?.attribute,
			parentComponent: attribute?.parentComponent,
			positionComponent: attribute?.positionComponent,
			state: attribute?.state || {},
			event: attribute?.event || {},
			id: attribute?.id
		}

	}


	createComponent(rawComponent,embedData = {}) {

		const element = document.createElement(rawComponent.name);

		if (rawComponent?.attribute instanceof Object) {

			for (let x in rawComponent?.attribute) {

				element.setAttribute(x, rawComponent?.attribute[x]);

			}

		}

		const textNode = document.createTextNode(rawComponent?.content);
		element.appendChild(textNode);

		return {
			element,
			content: textNode,
			rawContent: rawComponent?.content,
			parent: rawComponent.parentComponent,
			position: rawComponent.positionComponent,
			state: rawComponent?.state,
			event: rawComponent?.event,
			...embedData,
			destroy(onDestroy = () => { }) {

				onDestroy();
				element.remove();

			},
			updateTextNode() {

				const text = this.rawContent;
				const resultText = eval(text);
				this.content.replaceData(0, text.length, resultText);

			},
			updateAttribute() {



			}
		}

	}

	
	renderComponent(StackRawComponent, target, embedData = {}) {

		const StackComponent = [];
		let State = {};

		const kindOfComponentBindingData = this.#kindOfComponentBindingData;

		for (let x of StackRawComponent) {

			const componentCreated = this.createComponent(x, embedData);
			State = { ...State, ...componentCreated.state };

			if (x?.id) {
				this.#allComponentId[x?.id] = {
					...componentCreated,
					state: new Reactivity({
						Getter(object, propertyName) {

							return object[propertyName];

						},
						Setter(object, propertyName, valueSet) {
							
							for (let x of kindOfComponentBindingData[propertyName]) {

								x.state[propertyName] = valueSet;
								x.updateTextNode();

							}

						}
					}).setReactive(State)
				};
			}
			if (x?.event instanceof Object) {

				for (let y in x?.event) {

					componentCreated.element[y] = () => x?.event[y]({
						state: new Reactivity({
							Getter(object, propertyName) {

								return object[propertyName];

							},
							Setter(object, propertyName, valueSet) {

								for (let x of kindOfComponentBindingData[propertyName]) {

									x.state[propertyName] = valueSet;
									x.updateTextNode();

								}

							}
						}).setReactive(State)
					});

				}

			}

			for (let y of Object.keys(componentCreated.state)) {

				if (kindOfComponentBindingData[y] instanceof Array) {

					kindOfComponentBindingData[y].push(componentCreated);

				} else {

					kindOfComponentBindingData[y] = [];
					kindOfComponentBindingData[y].push(componentCreated);

				}

			};

			StackComponent.push(componentCreated);

		}

		const element = {};

		for (let x of StackComponent) {

			x.updateTextNode();

			if (!(element[x.position])) {

				element[x.position] = x.element;

				if (element[x.parent]) {

					element[x.parent].appendChild(x.element);

				}

			}
			else {

				element[x.position].appendChild(x.element);

			}

		}

		if (target instanceof HTMLElement) target.appendChild(element[Object.keys(element)[0]]);

		return {
			destroy: StackComponent[0].destroy,
			component: StackComponent[0],
			state: new Reactivity({
				Getter(object, propertyName) {

					return object[propertyName];

				},
				Setter(object, propertyName, valueSet) {

					for (let x of kindOfComponentBindingData[propertyName]) {

						x.state[propertyName] = valueSet;
						x.updateTextNode();

					}

				}
			}).setReactive(State),
			updateComponentRendered() {

				for (let x of StackComponent) {

					x.updateTextNode();

				}

			}
		}

	}


	replaceChild(newComponent, oldComponent) {

		oldComponent.parentElement.replaceChild(newComponent.element, oldComponent);

	}

	findById(id) {

		return this.#allComponentId[id];

	}

}
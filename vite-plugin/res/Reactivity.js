export class Reactivity{

    #onGet = null;
    #onSet = null;

    /**
     * 
     * @param {Object} config 
     */
    constructor(config){

        this.#onGet = config.Getter;
        this.#onSet = config.Setter;

    }

    /**
     * 
     * @param {Object} Obj 
     * @returns Proxy
     */

    setReactive(Obj){

        if(typeof this.#onGet !== "function"){
            this.#onGet = ()=>{};
        }

        if(typeof this.#onSet !== "function"){
            this.#onGet = ()=>{};
        }

        const onGet = this.#onGet;
        const onSet = this.#onSet;

        const obj = new Proxy(Obj,{
            get(object,propertyName){

                return onGet(object,propertyName) || object[propertyName];

            },
            set(object,propertyName,valueSet){

                if(typeof valueSet === "function"){

                    Obj[propertyName] = valueSet(object,propertyName,valueSet) || null;

                }else{

                    Obj[propertyName] = valueSet;

                }

                onSet(object,propertyName,valueSet);

                return 1;

            }
        });

        return obj;

    }

}
const { parse, serialize } = require('parse5');
const beautify = require('js-beautify').js;
const fs = require("fs");

const HTMLElementTag = { "a": "a", "abbr": "abbr", "acronym": "acronym", "address": "address", "applet": "applet", "area": "area", "article": "article", "aside": "aside", "audio": "audio", "b": "b", "base": "base", "basefont": "basefont", "bdi": "bdi", "bdo": "bdo", "bgsound": "bgsound", "big": "big", "blink": "blink", "blockquote": "blockquote", "body": "body", "br": "br", "button": "button", "canvas": "canvas", "caption": "caption", "center": "center", "cite": "cite", "code": "code", "col": "col", "colgroup": "colgroup", "content": "content", "data": "data", "datalist": "datalist", "dd": "dd", "decorator": "decorator", "del": "del", "details": "details", "dfn": "dfn", "dir": "dir", "div": "div", "dl": "dl", "dt": "dt", "element": "element", "em": "em", "embed": "embed", "fieldset": "fieldset", "figcaption": "figcaption", "figure": "figure", "font": "font", "footer": "footer", "form": "form", "frame": "frame", "frameset": "frameset", "h1": "h1", "h2": "h2", "h3": "h3", "h4": "h4", "h5": "h5", "h6": "h6", "head": "head", "header": "header", "hgroup": "hgroup", "hr": "hr", "html": "html", "i": "i", "iframe": "iframe", "img": "img", "input": "input", "ins": "ins", "isindex": "isindex", "kbd": "kbd", "keygen": "keygen", "label": "label", "legend": "legend", "li": "li", "link": "link", "listing": "listing", "main": "main", "map": "map", "mark": "mark", "marquee": "marquee", "menu": "menu", "menuitem": "menuitem", "meta": "meta", "meter": "meter", "nav": "nav", "nobr": "nobr", "noframes": "noframes", "noscript": "noscript", "object": "object", "ol": "ol", "optgroup": "optgroup", "option": "option", "output": "output", "p": "p", "param": "param", "plaintext": "plaintext", "pre": "pre", "progress": "progress", "q": "q", "rp": "rp", "rt": "rt", "ruby": "ruby", "s": "s", "samp": "samp", "script": "script", "section": "section", "select": "select", "shadow": "shadow", "small": "small", "source": "source", "spacer": "spacer", "span": "span", "strike": "strike", "strong": "strong", "style": "style", "sub": "sub", "summary": "summary", "sup": "sup", "table": "table", "tbody": "tbody", "td": "td", "template": "template", "textarea": "textarea", "tfoot": "tfoot", "th": "th", "thead": "thead", "time": "time", "title": "title", "tr": "tr", "track": "track", "tt": "tt", "u": "u", "ul": "ul", "var": "var", "video": "video", "wbr": "wbr", "xmp": "xmp" }

function toString(b) {

	let c = Object.keys(b).map(e => {

		if (/\<.*?>.*?<\/.*?>/igm.test(b[e])) {

			return `"${e}": ${b[e]}`

		}

		if (b[e] instanceof Array) {
			return `"${e}":[${b[e]}]`
		}

		if (b[e] instanceof Object && typeof b[e] !== "function") {

			return `"${e}":${toString(b[e])}`

		}

		// if (typeof b[e] === "string") return `""${e}"":"${b[e]}"`;

		return `"${e}":${b[e]}`

	});

	let g = "{";

	for (let x in c) {

		if (parseInt(x) === c.length - 1) {

			g += c[x] + "}"

		} else {

			g += c[x] + ","
		}
	}

	if (g === "{") return "{}"

	return g;

}

/**
 * 
 * @param {Number} start 
 * @param {Number} end 
 * @param {String} what 
 * @returns 
 */
String.prototype.replaceBetween = function (start, end, what) {
	return this.substring(0, start - 1) + what + this.substring(end - 1);
};

function createNativeComponentFromHTML(Component, component, parent, rawText, autoParent, parentIsLoopComponent = false, parentUniqIndex) {

	let text = ``;
	let attr = {};
	let position = new Date().getTime().toString("36");
	let pos2 = (new Date().getTime() * Math.random()).toString("36");

	if (Component.childNodes instanceof Array && Component.childNodes.length > 0) {

		for (let x of Component.childNodes) {

			if (x.nodeName === "#text") {

				text += x.value;

			}

		}

	}

	if (Component.attrs instanceof Array && Component.attrs.length > 0) {

		for (let x of Component.attrs) {

			if (x.value[0] === "{" && x.value[x.value.length - 1] === "}") {

				attr[x.name] = x.value.replace(/\{/, "").replace(/\}$/, "");

			} else {

				attr[x.name] = x.value;

			}

		}

	}

	/**
	 * 
	 * @param {Object} attr 
	 * @returns 
	 */
	function createEventProperty(attr) {

		const newEvent = {};

		for (let x in attr) {

			if (x.match(/\on\:/igm) instanceof Array) {

				newEvent[x.replace(/\on\:/igm, "on")] = attr[x];

			}

		}

		return newEvent;

	}

	let template = ``;
	const elementAttribute = {};
	
	let loopComponent = (attr.hasOwnProperty("$loopcomponent"))? {
		parent: 'parentComponent',
		componentId: `"${new Date().getTime().toString('36')}" + ${attr["$loopcomponent"] || 0}`
	} : {};

	for (let x in attr) {

		if (!(/(state|on\:|parent|componentid|component\:|\$async|\$loopcomponent)/igm.test(x))) {

			elementAttribute[x] = (attr[x].length === 0)? "''" : attr[x];

		}

	}

	if (!(Component.tagName in HTMLElementTag)) {
		Component.functionName = Component.tagName;
		Component.attrs.push({
			name: "parentComponent",
			value: `"${parent}"` || ""
		});
		Component.attrs.push({
			name: "positionComponent",
			value: `"${position}"`
		});
		
		if(attr.hasOwnProperty("$async")){

			template = "...(await " + createCustomComponent(Component, rawText)+")";

		}else{

			template = "..." + createCustomComponent(Component, rawText);

		}
	
	} else {

		template = `dabMain.createRawComponent(
			\`${Component.tagName}\`,
			{
				content: '\`${text.replace(/\$\{/igm, "\${")}\`',
				parentComponent: ${(parentIsLoopComponent)? `"${parent}" + ${parentUniqIndex || attr["$loopcomponent"]}` :  autoParent || loopComponent?.parent?.replace(/\"/igm, "") || attr?.parent?.replace(/\"/igm, "") || '"' + parent + '"' || ""},
				positionComponent: ${loopComponent?.componentId || attr?.componentid?.replace(/\"/igm, "") || (parentIsLoopComponent)? `"${(attr["$loopcomponent"])? position : pos2}" + ${parentUniqIndex || attr["$loopcomponent"]}` : '"' + position + '"'},
				state: ${attr["state"] || "{}"},
				event: ${toString(createEventProperty(attr)).replace(/\"/igm, "")},
				attribute: ${toString(elementAttribute)},
				id: "${attr["component:id"] || ''}"
			}
		)`.replace(/(\r|\t|\n)/igm, "").replace(/\"/igm, "'");
	}

	component.push(template);

	if (Component.childNodes instanceof Array && Component.childNodes.length > 0) {

		for (let x of Component.childNodes) {

			if (x.nodeName !== "#text") {

				createNativeComponentFromHTML(x, component,position, rawText, (loopComponent.componentId)? loopComponent.componentId : 0  || attr?.componentid?.replace(/\"/igm, ""),parentIsLoopComponent || attr.hasOwnProperty("$loopcomponent"), parentUniqIndex || attr["$loopcomponent"]);

			}

		}

	}

	return component;

}

function createCustomComponent(Component, rawText) {

	let attr = {};

	if (Component.attrs instanceof Array && Component.attrs.length > 0) {

		for (let x of Component.attrs) {

			if (x.value[0] === "{" && x.value[x.value.length - 1] === "}" && !/\<.*?>/.test(x.value) && !/^\{\{.*?\}\}$/igm.test(x.value)) {

				attr[x.name] = eval(x.value.replace(/\{/, "").replace(/\}/, ""));

			}else if (x.value[0] === "{" && x.value[x.value.length - 1] === "}" && !/\<.*?>/.test(x.value) && /^\{\{.*?\}\}$/igm.test(x.value)) {

				attr[x.name] = eval(`Object.assign({},${x.value.replace(/\{/, "").replace(/\}/, "")})`);
				// console.log(attr[x.name])

			} else if (x.value[0] === "{" && x.value[x.value.length - 1] === "}" && /\<.*?>/.test(x.value)) {

				attr[x.name] = x.value.replace(/\{/, "").replace(/\}/, "");

			}else {

				attr[x.name] = x.value.replace(/\{/, "").replace(/\}/, "");

			}

		}


	}

	delete attr["$async"];

	Component.functionName = rawText.substring(Component.sourceCodeLocation.startCol, Component.sourceCodeLocation.startCol + Component.functionName.length);

	const template = `

		${Component.functionName}(${toString(attr)})

	`.replace(/(\r|\t|\n)/igm, "");

	return template;

}


function transformComponent(rawComponent, res, positionComponent, indexComponent) {

	const position = new Date().getTime().toString("36");

	rawComponent = rawComponent.replace(/\$beChildLoop/igm,`parent={parentComponent} componentId="new Date().getTime().toString('36') + index"`).replace(/\$beChild/igm, `parent={parentComponent} componentId={positionComponent}`)
		.replace(/\$toBeChild/igm, `parentComponent,positionComponent`);

	const componentLocation = parse(rawComponent, {
		sourceCodeLocationInfo: true
	}).childNodes[0].childNodes[1].childNodes;

	rawComponent = rawComponent.replace(/(\r|\t|\n)/igm, "");

	const component = parse(rawComponent, {
		sourceCodeLocationInfo: true
	}).childNodes[0].childNodes[1].childNodes

	if (component instanceof Array) for (let x of component) {

		if (x.nodeName !== "#text" && x.tagName !== null && x.tagName in HTMLElementTag) {

			res.push(x);

		}
		else if (x.nodeName !== "#text" && x.tagName !== null) {

			res.push({ ...x, functionName: x.tagName });

		}

	}

	if (indexComponent !== res.length && res[indexComponent].functionName !== void 0) rawComponent = transformComponent(rawComponent.replaceBetween(res[indexComponent].sourceCodeLocation.startCol, res[indexComponent].sourceCodeLocation.endCol, `${createCustomComponent(res[indexComponent], rawComponent)}`), [], [], indexComponent);
	if (indexComponent !== res.length && res[indexComponent].functionName === void 0) rawComponent = transformComponent(rawComponent.replaceBetween(res[indexComponent].sourceCodeLocation.startCol, res[indexComponent].sourceCodeLocation.endCol, `[${createNativeComponentFromHTML(res[indexComponent], [], "", rawComponent)}]`), [], [], indexComponent);

	return rawComponent;

}

fs.writeFileSync(__dirname + "/compile result/a.js", beautify(transformComponent(fs.readFileSync(__dirname + "/component test/card.js").toString(), [], [], 0), { indent_size: 2, space_in_empty_paren: true }))

module.exports.Compile = (fileSource) => {

	return {
		JS: beautify(transformComponent(fileSource.toString(), [], [], 0), { indent_size: 2, space_in_empty_paren: true })
	}

}
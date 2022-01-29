import { Render, dabMain, findById } from "./res/dabMain.js";
import { Router } from "/route.js";

const a = <h1 component:id="b" id="'hello world'" class="'box'" state="{{count: 0}}">
 			<p>create by daberdev</p>
			hello world ${this.state.count}
		  </h1>;

function Welcome({$toBeChild}){

	return  <div $beChild>
				welcome to seleku-kit
			</div>

}

function isLogged({check,username}){

	if(check){

		return <h1 
		on:click="{function({state}){

			state.username = new Date().getTime();
			console.log(findById('b'));

		}}"
		state="{{
			username
		}}"

		component:id="a"

		>${this.state.username} logged</h1>

	}else{

		return  <h1 state="{{
				 	 username,
					 fullYear: new Date().getFullYear()
				 }}">
					${this.state.username} logout ${this.state.fullYear}
					<b>hehehe</b>
					<Welcome name="'ari susanto'">

						<p>nice</p>

					</Welcome>
				</h1>

	}
	
}

function myp({$toBeChild}){

	let component = [];

	for(let x = 0; x < 10; x++){

		component = [...component,...<h1 state="{{x: x}}" $loopComponent="x">hello ${this.state.x}</h1>];


	}

	console.log(component);

	return component;

}

async function getUser({$toBeChild}){

	let object = [];

	const data = await (await fetch("https://api.github.com/repos/microsoft/vscode/contributors")).json();

	for(let x of data){

		object = [
			...object,
			...<h1 
				$loopComponent="x.node_id" 
				state="{{nama: x.login}}"
			>
				${this.state.nama}
				<img src="x.avatar_url" width="100" height="100"></img>

			</h1>];

	}

	console.log(object);

	return object;

}

function Home(){

	
	return <h1>
		Home ${this.nama}
		<myp></myp>
		</h1>;

}

<Router.route path="'/home'" component="<Home></Home>" data="{{nama: '`home`'}}" target="{()=>{ return document.body}}">
</Router.route>;

async function main(){

	Render(<div>
		<getUser $async></getUser>
	</div>,document.body);

}

main();

Render(a,document.body);
Render(<a href="'/home'" data-link>go home</a>,document.body);

Render(<button on:click="{function(){

	findById('b').state.count += 1;

}}">update islogged</button>,document.body)



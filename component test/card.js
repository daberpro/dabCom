import { Render, dabMain, findById } from "./res/dabMain.js";
import { Router } from "/route.js";

const a = <h1 component:id="b" id="hello world" class="box" state="{{count: 0}}">
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
					<Welcome name="ari susanto">

						<p>nice</p>

					</Welcome>
				</h1>

	}
	
}

function Home(){

	
	return <h1>Home ${this.nama}</h1>;

}

<Router.route path="/home" component="<Home></Home>" data="{{nama: 'home'}}">
</Router.route>;

Render(a,document.body);
Render(<a href="/home" data-link>go home</a>,document.body);

Render(<button on:click="{function(){

	findById('b').state.count = 1;

}}">update islogged</button>,document.body)



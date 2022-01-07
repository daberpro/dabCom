import { Render, dabMain, findById } from "../res/dabMain.js";

const a = <h1 component:id="b" id="hello world" class="box">
 			<p>create by daberdev</p>
			hello world
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

		on:mousemove="{()=>{
			console.log('mouse move')
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

Render(a,document.body);
const logged = Render(<isLogged username="Ari susanto" check={true} ></isLogged>,document.body);

Render(<button on:click="{function(){

	logged.updateComponentProperty(isLogged,{
		username: 'Ari Susanto',
		check: false
	})

}}">update islogged</button>,findById("a").element)


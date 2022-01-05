import { Render, dabMain } from "../res/dabMain.js";

const a = <h1 id="hello world">
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
		on:click="{function(){

			console.log('hello world');

		}}"

		on:mousemove="{()=>{
			console.log('mouse move')
		}}"

		state="{{
			username
		}}"

		>${this.state.username} logged</h1>

	}else{

		return <h1 state="{{
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


const logged = Render(<isLogged username="Ari susanto" check={false} ></isLogged>,document.body);
logged.state.username = "Daberdev";


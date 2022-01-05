import {
  Render,
  dabMain
} from "../res/dabMain.js";
const a = [dabMain.createRawComponent(`h1`, {
  content: "` hello world  `",
  parentComponent: "",
  positionComponent: "8spw6vlv",
  state: {},
  event: {}
}), dabMain.createRawComponent(`p`, {
  content: "`create by daberdev`",
  parentComponent: "8spw6vlv",
  positionComponent: "gogohgiu",
  state: {},
  event: {}
})];

function Welcome({
  parentComponent,
  positionComponent
}) {
  return [dabMain.createRawComponent(`div`, {
    content: "`welcome to seleku-kit`",
    parentComponent: parentComponent,
    positionComponent: positionComponent,
    state: {},
    event: {}
  })]
}

function isLogged({
  check,
  username
}) {
  if (check) {
    return [dabMain.createRawComponent(`h1`, {
      content: "`${this.state.username} logged`",
      parentComponent: "",
      positionComponent: "i8znkoyf",
      state: {
        username
      },
      event: {
        onclick: function() {
          console.log('hello world');
        },
        onmousemove: () => {
          console.log('mouse move')
        }
      }
    })]
  } else {
    return [dabMain.createRawComponent(`h1`, {
      content: "`${this.state.username} logout ${this.state.fullYear}`",
      parentComponent: "",
      positionComponent: "8n9a6c22",
      state: {
        username,
        fullYear: new Date().getFullYear()
      },
      event: {}
    }), dabMain.createRawComponent(`b`, {
      content: "`hehehe`",
      parentComponent: "8n9a6c22",
      positionComponent: "2ct92nbe",
      state: {},
      event: {}
    }), ...Welcome({
      name: "ari susanto",
      parentComponent: "8n9a6c22",
      positionComponent: "4fwescdg"
    }), dabMain.createRawComponent(`p`, {
      content: "`nice`",
      parentComponent: "4fwescdg",
      positionComponent: "4tgy5wfk",
      state: {},
      event: {}
    })]
  }
}
const logged = Render(isLogged({
  username: "Ari susanto",
  check: false
}), document.body);
logged.state.username = "Daberdev";
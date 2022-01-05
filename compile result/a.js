import {
  Render,
  dabMain
} from "../res/dabMain.js";
const a = [dabMain.createRawComponent(`h1`, {
  content: "` hello world  `",
  parentComponent: "",
  positionComponent: "ki0h8yhl",
  state: {},
  event: {}
}), dabMain.createRawComponent(`p`, {
  content: "`create by daberdev`",
  parentComponent: "ki0h8yhl",
  positionComponent: "bo5mbg5a",
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
      positionComponent: "kthg3069",
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
      positionComponent: "1qz736p7",
      state: {
        username,
        fullYear: new Date().getFullYear()
      },
      event: {}
    }), dabMain.createRawComponent(`b`, {
      content: "`hehehe`",
      parentComponent: "1qz736p7",
      positionComponent: "4jw2vkv",
      state: {},
      event: {}
    }), ...Welcome({
      name: "ari susanto",
      parentComponent: "1qz736p7",
      positionComponent: "awc6t4rk"
    }), dabMain.createRawComponent(`p`, {
      content: "`nice`",
      parentComponent: "awc6t4rk",
      positionComponent: "765plm7b",
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
import {
  Render,
  dabMain
} from "../res/dabMain.js";
const a = [dabMain.createRawComponent(`h1`, {
  content: "` hello world  `",
  parentComponent: "",
  positionComponent: "fn7m7o5q",
  state: {},
  event: {},
  attribute: {
    id: "hello world",
    class: "box"
  }
}), dabMain.createRawComponent(`p`, {
  content: "`create by daberdev`",
  parentComponent: "fn7m7o5q",
  positionComponent: "iii29sq3",
  state: {},
  event: {},
  attribute: {}
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
    event: {},
    attribute: {}
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
      positionComponent: "5zfa9hr7",
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
      },
      attribute: {}
    })]
  } else {
    return [dabMain.createRawComponent(`h1`, {
      content: "`${this.state.username} logout ${this.state.fullYear}`",
      parentComponent: "",
      positionComponent: "c8i3a8pc",
      state: {
        username,
        fullYear: new Date().getFullYear()
      },
      event: {},
      attribute: {}
    }), dabMain.createRawComponent(`b`, {
      content: "`hehehe`",
      parentComponent: "c8i3a8pc",
      positionComponent: "21zp6vcl",
      state: {},
      event: {},
      attribute: {}
    }), ...Welcome({
      name: "ari susanto",
      parentComponent: "c8i3a8pc",
      positionComponent: "kau0ko36"
    }), dabMain.createRawComponent(`p`, {
      content: "`nice`",
      parentComponent: "kau0ko36",
      positionComponent: "f3v5meg7",
      state: {},
      event: {},
      attribute: {}
    })]
  }
}
Render(a, document.body);
const logged = Render(isLogged({
  username: "Ari susanto",
  check: false
}), document.body);
logged.state.username = "Daberdev";
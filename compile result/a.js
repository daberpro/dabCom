import {
  Render,
  dabMain,
  findById
} from "../res/dabMain.js";
const a = [dabMain.createRawComponent(`h1`, {
  content: "` hello world  `",
  parentComponent: "",
  positionComponent: "9yaew9aq",
  state: {},
  event: {},
  attribute: {
    id: "hello world",
    class: "box"
  },
  id: "b"
}), dabMain.createRawComponent(`p`, {
  content: "`create by daberdev`",
  parentComponent: "9yaew9aq",
  positionComponent: "8rldqo4q",
  state: {},
  event: {},
  attribute: {},
  id: ""
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
    attribute: {},
    id: ""
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
      positionComponent: "1igblp59",
      state: {
        username
      },
      event: {
        onclick: function({
          state
        }) {
          state.username = new Date().getTime();
          console.log(findById('b'));
        },
        onmousemove: () => {
          console.log('mouse move')
        }
      },
      attribute: {},
      id: "a"
    })]
  } else {
    return [dabMain.createRawComponent(`h1`, {
      content: "`${this.state.username} logout ${this.state.fullYear}`",
      parentComponent: "",
      positionComponent: "a8fy6nw7",
      state: {
        username,
        fullYear: new Date().getFullYear()
      },
      event: {},
      attribute: {},
      id: ""
    }), dabMain.createRawComponent(`b`, {
      content: "`hehehe`",
      parentComponent: "a8fy6nw7",
      positionComponent: "e8h8687p",
      state: {},
      event: {},
      attribute: {},
      id: ""
    }), ...Welcome({
      name: "ari susanto",
      parentComponent: "a8fy6nw7",
      positionComponent: "3fuj1cyd"
    }), dabMain.createRawComponent(`p`, {
      content: "`nice`",
      parentComponent: "3fuj1cyd",
      positionComponent: "jsrqtdod",
      state: {},
      event: {},
      attribute: {},
      id: ""
    })]
  }
}
Render(a, document.body);
const logged = Render(isLogged({
  username: "Ari susanto",
  check: true
}), document.body);
Render([dabMain.createRawComponent(`button`, {
  content: "`update islogged`",
  parentComponent: "",
  positionComponent: "ksoc7yn7",
  state: {},
  event: {
    onclick: function() {
      logged.updateComponentProperty(isLogged, {
        username: 'Ari Susanto',
        check: false
      })
    }
  },
  attribute: {},
  id: ""
})], findById("a").element)
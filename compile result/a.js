import {
  Render,
  dabMain,
  findById
} from "./res/dabMain.js";
import {
  Router
} from "/route.js";
const a = [dabMain.createRawComponent(`h1`, {
  content: '` hello world ${this.state.count}  `',
  parentComponent: '',
  positionComponent: '3oaxlfzg',
  state: {
    count: 0
  },
  event: {},
  attribute: {
    'id': 'hello world',
    'class': 'box'
  },
  id: 'b'
}), dabMain.createRawComponent(`p`, {
  content: '`create by daberdev`',
  parentComponent: '3oaxlfzg',
  positionComponent: 'bicliekr',
  state: {},
  event: {},
  attribute: {},
  id: ''
})];

function Welcome({
  parentComponent,
  positionComponent
}) {
  return [dabMain.createRawComponent(`div`, {
    content: '`welcome to seleku-kit`',
    parentComponent: parentComponent,
    positionComponent: positionComponent,
    state: {},
    event: {},
    attribute: {},
    id: ''
  })]
}

function isLogged({
  check,
  username
}) {
  if (check) {
    return [dabMain.createRawComponent(`h1`, {
      content: '`${this.state.username} logged`',
      parentComponent: '',
      positionComponent: '46grr32b',
      state: {
        username
      },
      event: {
        onclick: function({
          state
        }) {
          state.username = new Date().getTime();
          console.log(findById('b'));
        }
      },
      attribute: {},
      id: 'a'
    })]
  } else {
    return [dabMain.createRawComponent(`h1`, {
      content: '`${this.state.username} logout ${this.state.fullYear}`',
      parentComponent: '',
      positionComponent: '3x5zb9b6',
      state: {
        username,
        fullYear: new Date().getFullYear()
      },
      event: {},
      attribute: {},
      id: ''
    }), dabMain.createRawComponent(`b`, {
      content: '`hehehe`',
      parentComponent: '3x5zb9b6',
      positionComponent: 'hluxgf6k',
      state: {},
      event: {},
      attribute: {},
      id: ''
    }), ...Welcome({
      "name": "ari susanto",
      "parentComponent": "3x5zb9b6",
      "positionComponent": "cnvg2ua1"
    }), dabMain.createRawComponent(`p`, {
      content: '`nice`',
      parentComponent: 'cnvg2ua1',
      positionComponent: '20h97lsy',
      state: {},
      event: {},
      attribute: {},
      id: ''
    })]
  }
}

function Home() {
  return [dabMain.createRawComponent(`h1`, {
    content: '`Home ${this.nama}`',
    parentComponent: '',
    positionComponent: 'gs1c665u',
    state: {},
    event: {},
    attribute: {},
    id: ''
  })];
}
Router.route({
  "path": "/home",
  component: Home({}),
  data: {
    "nama": "home"
  }
});
Render(a, document.body);
Render([dabMain.createRawComponent(`a`, {
  content: '`go home`',
  parentComponent: '',
  positionComponent: 'hnrk323p',
  state: {},
  event: {},
  attribute: {
    'href': '/home',
    'data-link': ''
  },
  id: ''
})], document.body);
Render([dabMain.createRawComponent(`button`, {
  content: '`update islogged`',
  parentComponent: '',
  positionComponent: '222t1igb',
  state: {},
  event: {
    onclick: function() {
      findById('b').state.count = 1;
    }
  },
  attribute: {},
  id: ''
})], document.body)
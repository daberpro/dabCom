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
  positionComponent: 'kyzzixmb',
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
  parentComponent: 'kyzzixmb',
  positionComponent: 'kyzzixme',
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
      positionComponent: 'kyzzixno',
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
      positionComponent: 'kyzzixnx',
      state: {
        username,
        fullYear: new Date().getFullYear()
      },
      event: {},
      attribute: {},
      id: ''
    }), dabMain.createRawComponent(`b`, {
      content: '`hehehe`',
      parentComponent: 'kyzzixnx',
      positionComponent: 'kyzzixnx',
      state: {},
      event: {},
      attribute: {},
      id: ''
    }), ...Welcome({
      "name": 'ari susanto',
      "parentComponent": "kyzzixnx",
      "positionComponent": "kyzzixnx"
    }), dabMain.createRawComponent(`p`, {
      content: '`nice`',
      parentComponent: 'kyzzixnx',
      positionComponent: 'kyzzixny',
      state: {},
      event: {},
      attribute: {},
      id: ''
    })]
  }
}

function myp({
  parentComponent,
  positionComponent
}) {
  let component = [];
  for (let x = 0; x < 10; x++) {
    component = [...component, ...[dabMain.createRawComponent(`h1`, {
      content: '`hello ${this.state.x}`',
      parentComponent: parentComponent,
      positionComponent: new Date().getTime().toString('36') + x,
      state: {
        x: x
      },
      event: {},
      attribute: {},
      id: ''
    })]];
  }
  console.log(component);
  return component;
}
async function getUser({
  parentComponent,
  positionComponent
}) {
  let object = [];
  const data = await (await fetch("https://api.github.com/repos/microsoft/vscode/contributors")).json();
  for (let x of data) {
    object = [...object, ...[dabMain.createRawComponent(`h1`, {
      content: '`${this.state.nama}`',
      parentComponent: parentComponent,
      positionComponent: new Date().getTime().toString('36') + x.node_id,
      state: {
        nama: x.login
      },
      event: {},
      attribute: {},
      id: ''
    }), dabMain.createRawComponent(`img`, {
      content: '``',
      parentComponent: new Date().getTime().toString('36') + x.node_id,
      positionComponent: x.node_id + x.login,
      state: {},
      event: {},
      attribute: {
        'src': x.avatar_url,
        'width': 100,
        'height': 100
      },
      id: ''
    })]];
  }
  return object;
}

function Home() {
  return [dabMain.createRawComponent(`h1`, {
    content: '`Home ${this.nama}`',
    parentComponent: '',
    positionComponent: 'kyzzixou',
    state: {},
    event: {},
    attribute: {},
    id: ''
  }), ...myp({
    "parentComponent": "kyzzixou",
    "positionComponent": "kyzzixov"
  })];
}
Router.route({
  "path": '/home',
  "component": Home({}),
  "data": {
    "nama": `home`
  },
  "target": () => {
    return document.body
  }
});
async function main() {
  Render([dabMain.createRawComponent(`div`, {
    content: '``',
    parentComponent: '',
    positionComponent: 'kyzzixqc',
    state: {},
    event: {},
    attribute: {},
    id: ''
  }), ...(await getUser({
    "parentComponent": "kyzzixqc",
    "positionComponent": "kyzzixqc"
  }))], document.body);
}
main();
Render(a, document.body);
Render([dabMain.createRawComponent(`a`, {
  content: '`go home`',
  parentComponent: '',
  positionComponent: 'kyzzixqh',
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
  positionComponent: 'kyzzixqu',
  state: {},
  event: {
    onclick: function() {
      findById('b').state.count += 1;
    }
  },
  attribute: {},
  id: ''
})], document.body)
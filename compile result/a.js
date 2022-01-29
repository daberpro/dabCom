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
  positionComponent: 'kz03vr7r',
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
  parentComponent: 'kz03vr7r',
  positionComponent: 'kz03vr7t',
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
    positionComponent: '9v544pbz.7e4' + undefined,
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
      positionComponent: 'kz03vr92',
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
      positionComponent: 'kz03vr9a',
      state: {
        username,
        fullYear: new Date().getFullYear()
      },
      event: {},
      attribute: {},
      id: ''
    }), dabMain.createRawComponent(`b`, {
      content: '`hehehe`',
      parentComponent: 'kz03vr9a',
      positionComponent: 'kz03vr9a',
      state: {},
      event: {},
      attribute: {},
      id: ''
    }), ...Welcome({
      "name": 'ari susanto',
      "parentComponent": "kz03vr9a",
      "positionComponent": "kz03vr9a"
    }), dabMain.createRawComponent(`p`, {
      content: '`nice`',
      parentComponent: 'kz03vr9a',
      positionComponent: 'kz03vr9b',
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
      positionComponent: 'kz03vr9p' + x,
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
      positionComponent: 'kz03vra2' + x.node_id,
      state: {
        nama: x.login
      },
      event: {},
      attribute: {},
      id: ''
    }), dabMain.createRawComponent(`img`, {
      content: '``',
      parentComponent: 'kz03vra2' + x.node_id,
      positionComponent: 'j7gxophy.3sd' + x.node_id,
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
  console.log(object);
  return object;
}

function Home() {
  return [dabMain.createRawComponent(`h1`, {
    content: '`Home ${this.nama}`',
    parentComponent: '',
    positionComponent: 'kz03vraa',
    state: {},
    event: {},
    attribute: {},
    id: ''
  }), ...myp({
    "parentComponent": "kz03vraa",
    "positionComponent": "kz03vraa"
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
    positionComponent: 'kz03vrb5',
    state: {},
    event: {},
    attribute: {},
    id: ''
  }), ...(await getUser({
    "parentComponent": "kz03vrb5",
    "positionComponent": "kz03vrb6"
  }))], document.body);
}
main();
Render(a, document.body);
Render([dabMain.createRawComponent(`a`, {
  content: '`go home`',
  parentComponent: '',
  positionComponent: 'kz03vrbc',
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
  positionComponent: 'kz03vrbm',
  state: {},
  event: {
    onclick: function() {
      findById('b').state.count += 1;
    }
  },
  attribute: {},
  id: ''
})], document.body)
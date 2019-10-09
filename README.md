# Iniciando

https://travis-ci.org/tecsinapse/ui-kit.svg?branch=master

***@tecsinapse/ui-kit*** é uma biblioteca contendo diversos componentes para facilitar a vida do dev react ;)

## Get Started

Para acessar os documentos acesse nosso [storybook](https://github.com/tecsinapse/ui-kit)

Para add em seu projeto:
```
    yarn add @tecsinapse/ui-kit
    npx install-peerdeps @tecsinapse/ui-kit
```

E adicione o ThemeProvider em seu projeto como abaixo:

```
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "@tecsinapse/ui-kit";

ReactDOM.render(
  <ThemeProvider variant="black">
    <App />
  </ThemeProvider>,

  document.getElementById("root")
);
```

### Desenvolvimento

Para rodar localmente
```
    yarn install && yarn start
```

Para buildar e publicar a lib:
```
    bumped release $VERSAO
```

Para rodar o app de exemplo, fazer o link da lib na pasta de exemplo após executar o build:
```
    yarn build && yarn link
    cd example/
    yarn link @tecsinapse/ui-kit
    yarn install && yarn start
```

As modificações na lib serão refletidas após build da lib.

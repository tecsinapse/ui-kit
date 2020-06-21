# Tecsinapse UI-KIT

[![Build Status](https://travis-ci.org/tecsinapse/ui-kit.svg?branch=master)](https://travis-ci.org/tecsinapse/ui-kit)



***@tecsinapse/ui-kit*** é uma biblioteca contendo diversos componentes para facilitar a vida do dev react ;)

## Get Started

Para acessar os documentos acesse nosso [storybook](https://github.com/tecsinapse/ui-kit)

É recomendável utilizar uma versão `"node": ">=12.0.0"` devido a performance de build superior

Para add em seu projeto:
```
    yarn add @tecsinapse/ui-kit
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

# Outras libs

| LIB                        |      Repo         | Storybook        |
| -------------------------- | ----------------- |----------------- |
| @tecsinapse/carousel    |  [Repo](https://github.com/tecsinapse/ui-kit)        |[Storybook](https://github.com/tecsinapse/ui-kit)        |
| @tecsinapse/wizard    |  [Repo](https://github.com/tecsinapse/wizard)        |[Storybook](https://github.com/tecsinapse/wizard)        |
| @tecsinapse/uploader    |  [Repo](https://github.com/tecsinapse/uploader)        |[Storybook](https://github.com/tecsinapse/uploader)        |
| @tecsinapse/chat    |  [Repo](https://github.com/tecsinapse/chat)        |[Storybook](https://github.com/tecsinapse/chat)        |
| @tecsinapse/table    |  [Repo](https://github.com/tecsinapse/table)        |[Storybook](https://github.com/tecsinapse/table)        |
| @tecsinapse/login    |  [Repo](https://github.com/tecsinapse/login)        |[Storybook](https://github.com/tecsinapse/login)        |
| @tecsinapse/pickers    |  [Repo](https://github.com/tecsinapse/pickers)        |[Storybook](https://github.com/tecsinapse/pickers)        |
| @tecsinapse/text-editor    |  [Repo](https://github.com/tecsinapse/text-editor)        |[Storybook](https://github.com/tecsinapse/text-editor)        |
| @tecsinapse/timeslot-selector    |  [Repo](https://github.com/tecsinapse/timeslot-selector)        |[Storybook](https://github.com/tecsinapse/timeslot-selector)        |

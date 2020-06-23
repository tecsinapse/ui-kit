# Tecsinapse UI-KIT

[![Build Status](https://travis-ci.org/tecsinapse/ui-kit.svg?branch=master)](https://travis-ci.org/tecsinapse/ui-kit)


***@tecsinapse/ui-kit*** é um conjuntos de bibliotecas contendo diversos componentes React para facilitar sua vida ;)

Neste repositório estão as seguintes bibliotecas:

- `@tecsinapse/ui-kit`
- `@tecsinapse/uploader`
- `@tecsinapse/carousel`
- `@tecsinapse/pickers`
- `@tecsinapse/wizard`
- `@tecsinapse/table`

## Get Started

Para acessar os documentos acesse nosso [storybook](https://github.com/tecsinapse/ui-kit)

É recomendável utilizar uma versão `"node": ">=14.0.0"` e `yarn > 1.17`

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

Para rodar localmente na porta 5555

```
    yarn && yarn dev 
```

Para buildar e publicar a lib:
```
    npx lerna publish
```


# Outras libs no ui-kit-verso

| LIB                        |      Repo         | Storybook        |
| -------------------------- | ----------------- |----------------- |
| @tecsinapse/chat    |  [Repo](https://github.com/tecsinapse/chat)        |[Storybook](https://github.com/tecsinapse/chat)        |
| @tecsinapse/login    |  [Repo](https://github.com/tecsinapse/login)        |[Storybook](https://github.com/tecsinapse/login)        |
| @tecsinapse/text-editor    |  [Repo](https://github.com/tecsinapse/text-editor)        |[Storybook](https://github.com/tecsinapse/text-editor)        |
| @tecsinapse/timeslot-selector    |  [Repo](https://github.com/tecsinapse/timeslot-selector)        |[Storybook](https://github.com/tecsinapse/timeslot-selector)        |

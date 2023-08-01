# Para novos projetos utilize o [design-system](https://github.com/tecsinapse/design-system)
# Tecsinapse UI-KIT

[![Build Status](https://travis-ci.org/tecsinapse/ui-kit.svg?branch=master)](https://travis-ci.org/tecsinapse/ui-kit)
[![Coverage Status](https://coveralls.io/repos/github/tecsinapse/ui-kit/badge.svg?branch=master)](https://coveralls.io/github/tecsinapse/ui-kit?branch=master)

***@tecsinapse/ui-kit*** é um conjuntos de bibliotecas contendo diversos componentes React para facilitar sua vida ;)

Neste repositório estão as seguintes bibliotecas:

| Package                  | folder   | Feature                                     |
| ------------------------ | -------- | ------------------------------------------- |
| `@tecsinapse/ui-kit`     | ui-ki    | [![npm version](https://badge.fury.io/js/%40tecsinapse%2Fui-kit.svg)](https://badge.fury.io/js/%40tecsinapse%2Fui-kit) |
| `@tecsinapse/uploader`   | uploader | [![npm version](https://badge.fury.io/js/%40tecsinapse%2Fuploader.svg)](https://badge.fury.io/js/%40tecsinapse%2Fuploader) |
| `@tecsinapse/carousel`   | carousel | [![npm version](https://badge.fury.io/js/%40tecsinapse%2Fcarousel.svg)](https://badge.fury.io/js/%40tecsinapse%2Fcarousel)  |
| `@tecsinapse/pickers`    | pickers  | [![npm version](https://badge.fury.io/js/%40tecsinapse%2Fpickers.svg)](https://badge.fury.io/js/%40tecsinapse%2Fpickers)  |
| `@tecsinapse/wizard`     | wizard   | [![npm version](https://badge.fury.io/js/%40tecsinapse%2Fwizard.svg)](https://badge.fury.io/js/%40tecsinapse%2Fwizard) |
| `@tecsinapse/table`      | table    | [![npm version](https://badge.fury.io/js/%40tecsinapse%2Ftable.svg)](https://badge.fury.io/js/%40tecsinapse%2Ftable) |


## Get Started

Para acessar os documentos acesse nosso [storybook](https://tecsinapse.github.io/ui-kit/)

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

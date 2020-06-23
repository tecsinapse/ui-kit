# Tecsinapse UI-KIT

[![Build Status](https://travis-ci.org/tecsinapse/ui-kit.svg?branch=master)](https://travis-ci.org/tecsinapse/ui-kit)


***@tecsinapse/ui-kit*** é um conjuntos de bibliotecas contendo diversos componentes React para facilitar sua vida ;)

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

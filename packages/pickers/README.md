# Iniciando

[![Build Status](https://travis-ci.org/tecsinapse/ui-kit.svg?branch=master)](https://travis-ci.org/tecsinapse/ui-kit)



***@tecsinapse/pickers*** é uma biblioteca contendo componentes seletores de data para facilitar a vida do dev react ;)

## Get Started

Para acessar os documentos acesse nosso [storybook](https://tecsinapse.github.io/ui-kit/)

É recomendável utilizar uma versão `"node": ">=12.0.0"` devido a performance de build superior

Para add em seu projeto:
```
    yarn add @tecsinapse/pickers
```

E adicione o ThemeProvider em seu projeto como abaixo:

```
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@tecsinapse/ui-kit";
import { DatePicker } from "@tecsinapse/pickers";

ReactDOM.render(
  <ThemeProvider variant="black">
    <DatePicker />
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
    yarn link @tecsinapse/pickers
    yarn install && yarn start
```

As modificações na lib serão refletidas após build da lib.

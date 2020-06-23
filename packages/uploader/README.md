# Iniciando

[![Build Status](https://travis-ci.org/tecsinapse/ui-kit.svg?branch=master)](https://travis-ci.org/tecsinapse/ui-kit)



***@tecsinapse/uploader*** é uma biblioteca contendo componentes de Upload para facilitar a vida do dev react ;)

## Get Started

Para acessar os documentos acesse nosso [storybook](https://tecsinapse.github.io/ui-kit/)

É recomendável utilizar uma versão `"node": ">=12.0.0"` devido a performance de build superior

Para add em seu projeto:
```
    yarn add @tecsinapse/uploader
```

E adicione o componente em seu projeto como abaixo:

```
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@tecsinapse/ui-kit";
import { Uploader } from "@tecsinapse/uploader";

ReactDOM.render(
  <ThemeProvider variant="black">
    <Uploader />
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

As modificações na lib serão refletidas após build.

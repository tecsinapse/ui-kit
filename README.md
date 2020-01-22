# Iniciando

[![Build Status](https://travis-ci.org/tecsinapse/carousel.svg?branch=master)](https://travis-ci.org/tecsinapse/carousel)



***@tecsinapse/carousel*** é uma biblioteca contendo componentes de Carousel para facilitar a vida do dev react ;)

## Get Started

Para acessar os documentos acesse nosso [storybook](https://github.com/tecsinapse/carousel)

É recomendável utilizar uma versão `"node": ">=12.0.0"` devido a performance de build superior

Para add em seu projeto:
```
    yarn add @tecsinapse/carousel
```

E adicione o ThemeProvider em seu projeto como abaixo:

```
import React from "react";
import ReactDOM from "react-dom";
import { AutoRotatingCarousel } from "@tecsinapse/carousel";
import { ThemeProvider } from "@tecsinapse/ui-kit";

ReactDOM.render(
  <ThemeProvider variant="black">
    <AutoRotatingCarousel />
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

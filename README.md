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

## Deploy
### Gerando a biblioteca para o ambiente de produção
Após enviar as suas alterações para a branch [master]((https://github.com/tecsinapse/portal-menu-kit/tree/master)), execute a construção da release [aqui](https://jenkins.portaltecsinapse.com.br/job/ui-kit_prod_shell_script_release/).

### Gerando a biblioteca para o ambiente de homologação
Podemos utilizar a ferramenta Lerna para publicarmos os nossos pacotes para homologação. Caso necessite de mais informações, elas podem ser obtidas [aqui](https://github.com/lerna/lerna).).

Envie as suas alterações para o git.
Execute o comando ```npx lerna publish --canary patch --preid beta```

### Gerando a biblioteca no ambiente local
Podemos utilizar a ferramente Yalc para criarmos pacotes em seu ambiente local. A documentação pode ser consultada [aqui](https://www.npmjs.com/package/yalc)).

### Instalação da ferramente
##### Utilizando NPM:
```
npm i yalc -g
```

##### Utilizando Yarn:
```
yarn global add yalc
```

### Publicação
1. Após modificar o código, utilize o comando ```yarn build```
2. Com a conclusão do processo de build, execute o comando yalc publish. Com isso, o pacote será disponibilizada no seu ambiente local.
3. Caso o pacote já tenha sido publicado, utilize o comando yalc push para enviar as suas alterações.
4. Para adicionar a biblioteca em outro projeto, utilize ```yalc add my-package``` no projeto dependente.


# Outras libs no ui-kit-verso

| LIB                        |      Repo         | Storybook        |
| -------------------------- | ----------------- |----------------- |
| @tecsinapse/chat    |  [Repo](https://github.com/tecsinapse/chat)        |[Storybook](https://github.com/tecsinapse/chat)        |
| @tecsinapse/login    |  [Repo](https://github.com/tecsinapse/login)        |[Storybook](https://github.com/tecsinapse/login)        |
| @tecsinapse/text-editor    |  [Repo](https://github.com/tecsinapse/text-editor)        |[Storybook](https://github.com/tecsinapse/text-editor)        |
| @tecsinapse/timeslot-selector    |  [Repo](https://github.com/tecsinapse/timeslot-selector)        |[Storybook](https://github.com/tecsinapse/timeslot-selector)        |

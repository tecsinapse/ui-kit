# Iniciando

Rodar
```
    yarn install
```
Para buildar e publicar a lib:
```
    yarn build && yarn publish
```

# Desenvolvendo

Rodar storybook:
```
    yarn storybook
```
Abrir server de documentação do DOCZ
```
    yarn docz:dev
```
Ambos são atualizados automaticamente com alterações nos arquivos.

Para rodar o app de exemplo, fazer o link da lib na pasta de exemplo após executar o build:
```
    yarn build && yarn link
    cd example/
    yarn link @tecsinapse/ui-kit
    yarn install && yarn start
```

As modificações na lib serão refletidas após build da lib.

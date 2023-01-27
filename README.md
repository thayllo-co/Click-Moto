# Click Moto

## Tech Stack  
**Client:** React Native 

**Server:** Firebase

## Run Locally  
Clone o projeto
~~~bash  
cd caminho/da/pasta/do/projeto
~~~
Instale as dependências
~~~bash  
yarn install
~~~
Iniciar o servidor local
~~~bash  
yarn start
~~~
Execute o projeto no Android
~~~bash  
yarn android
~~~
Instale as dependências no iOS
~~~bash  
cd ios
pod instalar
cd ..
~~~
Execute o projeto no iOS
~~~bash  
yarn ios
~~~

## Roadmap  
- Additional browser support  
+ Projeto React Native versões:
    + react@18.2.0
    + react-native@0.71.1
+ [Configuração do ambiente de desenvolvimento](https://reactnative.dev/docs/environment-setup)
+ Esqueleto do projeto adicionado
    + Estrutura da pasta (atomização, navegação, loja redux, estilo e utilitários)
+ Adicionando navegação e tela de abertura
    + [Documentação](https://reactnative.dev/docs/navigation);
    + Comandos usados:
        ~~~bash  
        yarn add @react-navigation/native @react-navigation/native-stack
        yarn add react-native-screens react-native-safe-area-context
        ~~~

- Add more integrations  
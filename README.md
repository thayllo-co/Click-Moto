# Click Moto

## Tech Stack  
**Client:** React Native 

**Server:** Firebase

## Run Locally [(configuração)](https://reactnative.dev/docs/environment-setup)
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
+ Adicionando componentes de interface do usuário de login
    + Comando usado:
        ~~~bash  
        yarn add react-native-animatable react-native-image-crop-picker react-native-modal react-native-masked-text react-native-toast-message react-native-keyboard-aware-scroll-view
        ~~~
    + Documentação:
        + [react-native-animatable](https://github.com/oblador/react-native-animatable);
        + [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker);
        + [react-native-modal](https://github.com/react-native-modal/react-native-modal);
        + [react-native-masked-text](https://github.com/bhrott/react-native-masked-text);
        + [react-native-toast-message](https://github.com/calintamas/react-native-toast-message);
        + [react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view);

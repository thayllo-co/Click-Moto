# Click Moto 🛵💨

## Tech Stack  
**Client:** React Native 

**Server:** Firebase

## Executar localmente [(configuração)](https://reactnative.dev/docs/environment-setup)
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

## Log de alterações 
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
+ Adicionando e configurado redux
    + Comando usado:
        ~~~bash  
        yarn add redux react-redux redux-thunk 
        ~~~
    + Documentação:
        + [redux](https://github.com/reduxjs/redux);
        + [react-redux](https://github.com/reduxjs/react-redux);
        + [redux-thunk](https://github.com/reduxjs/redux-thunk);   
+ Adicionando Firebase Authentication, Database e Storage ao Redux no fluxo de login e configurado debuger e logs
    + Comando usado:
        ~~~bash  
        yarn add @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/database @react-native-firebase/storage react-native-logs react-native-fs react-native-zip-archive @redux-devtools/extension
        ~~~
    + Documentação:
        + [@react-native-firebase/app](https://github.com/invertase/react-native-firebase);
        + [@react-native-firebase/auth](https://rnfirebase.io/auth/usage);
        + [@react-native-firebase/database](https://rnfirebase.io/database/usage);
        + [@react-native-firebase/storage](https://rnfirebase.io/storage/usage);
        + [react-native-logs](https://github.com/onubo/react-native-logs);
        + [react-native-fs](https://github.com/itinance/react-native-fs);
        + [react-native-zip-archive](https://github.com/mockingbot/react-native-zip-archive);
        + [@redux-devtools/extension](https://github.com/reduxjs/redux-devtools);
    + Nota (🐞): 
        + Adicionalmente, para ativar o modo de depuração para inspecionar o app no React Native Debugger:
            + Baixe e instale a ferramenta em seu computador ([página de lançamentos](https://github.com/jhen0409/react-native-debugger/releases));
            + Na linha de comando onde você executou seu aplicativo com yarn start, digite "d" para abrir o menu do desenvolvedor no dispositivo ou emulador;
            + No dispositivo quando a janela de opções do desenvolvedor aparecer, selecione a opção "Debug" (depurar);
            + Concluído, as informações de depuração do seu aplicativo aparecerão na janela da ferramenta 🐞✨;
+ Adicionado componentes de UI e APIs de mapas com Redux no fluxo de corrida
    + Comando usado:
        ~~~bash  
        yarn add react-native-maps react-native-geocoding react-native-geolocation-service react-native-maps-directions react-native-google-places-autocomplete react-native-permissions react-native-ratings
        ~~~
    + Documentação:
        + [react-native-maps](https://github.com/react-native-maps/react-native-maps);
        + [react-native-geocoding](https://github.com/marlove/react-native-geocoding);
        + [react-native-geolocation-service](https://github.com/Agontuk/react-native-geolocation-service);
        + [react-native-maps-directions](https://github.com/bramus/react-native-maps-directions);
        + [react-native-google-places-autocomplete](https://github.com/FaridSafi/react-native-google-places-autocomplete);
        + [react-native-permissions](https://github.com/zoontek/react-native-permissions);
        + [react-native-ratings](https://github.com/Monte9/react-native-ratings);
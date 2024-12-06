# Instruções para rodar o projeto:

(caso não tenha o yarn instalado use: npm i -g yarn)

- adicione o arquivo .env na raiz do projeto (pergunte a quem te passou o repositório);

- yarn - instalar dependencias;
- yarn expo prebuild - gerar pastas nativas ios e android;

ao fazer o prebuild se estiver usando a pasta do android é necessario adicionar o arquivo local.properties
nesse arquivo adicione isso: sdk.dir=C:\\Users\\NOMEDOUSUARIO\\AppData\\Local\\Android\\sdk

e altere o NOMEDOUSUARIO para o nome da sua maquina.

- yarn android|ios - rodar o projeto (se for no android é so android, se for ios é so ios);

# Erros conhecidos:

- Caso ao rodar o aplicativo apareça um erro de "EMFILE: too many open files"

pare de rodar o aplicativo use o comando yarn start --clear 
ao finalizar a execução desse comando (depois de gerar o qrcode)

rode novamente o app usando yarn (android)|(ios)
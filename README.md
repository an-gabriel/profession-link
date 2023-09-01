# profession link service

Gerencia o cadastro de profissionais e suas informações

Esta ferramenta  tem como dependência

## Dependências
- Node.js LTS
- Inversify
- Mongoose
- Docker

e foi  desenvolvida com Node
- muito energetico e altas doses de brincadeira com meu filho Nicolas :D

## Instalação para o uso local
Para instalar a ferramenta em sua máquina, basta realizar o clone deste repositório.<br>

Em um diretorio de sua escolha execute o comando de clone do repositório:
```bash
git@github.com:an-gabriel/profession-link.git
```

Após clonar o projeto, entre no diretório `profession-link/server/` e execute o arquivo de `npm install`.<br>
Abaixo é possível visualizar o comando de execução do arquivo de setup:

```bash
cd ~/server && npm install
```
>___IMPORTANTE___: o server vai rodar mesmo sem a comunicação com o banco de dados, o ideal é subir o container completo para execuçao, proximo passo

## Instalação para o com docker

Para instalar o `profession-link` para utilizar com docker, basta realizar o clone deste repositório.<br>

Em um diretorio de sua escolha execute o comando de clone do repositório:
```bash
git@github.com:an-gabriel/profession-link.git
```

Após clonar o projeto, entre no diretório `profession-link/` e execute o comando abaixo.<br>

```bash
cd ~/profession-link && docker-compose build --up
```

aqui deixa o processo rolar, pode ir tomar um cafézin que é rapido... lembrando que o docker também está configurado para subir uma aplicação web.

>___IMPORTANTE___: abaixo o coteudo do .env caso precise, no docker

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=professional_link
```


## TYPEORM
### create migration code exemplo :
> npm run migrate:create --name=CreateProfessionalTable --module=professional

## Swagger
### Para gerar o código do swagger e iniciar o projeto em modo de desenvolvimento :
> npm run dev

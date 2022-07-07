# API DE GAMES
Esta API é utilizada para Criar, Ler, Editar e Deletar jogos no banco de dados.
## Endpoints
### GET /games
Esse Endpoit é responsável por retornar todos os games cadastrados no banco de dados.
#### Parametros
Nenhum.
#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os games. 

Exemplo de resposta:
```
[
    {
        "id": 12,
        "title": "Sifu",
        "year": 2022,
        "price": 60,
        "createdAt": "2022-02-10T18:23:20.000Z",
        "updatedAt": "2022-02-10T19:18:52.000Z"
    },
    {
        "id": 13,
        "title": "Terraria",
        "year": 2012,
        "price": 20,
        "createdAt": "2022-02-10T18:24:21.000Z",
        "updatedAt": "2022-02-10T18:24:21.000Z"
    },
    {
        "id": 16,
        "title": "CS:GO",
        "year": 2012,
        "price": 0,
        "createdAt": "2022-02-10T19:20:24.000Z",
        "updatedAt": "2022-02-10T19:20:40.000Z"
    }
]
```

##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:
```
{
    "err": "Token inválido"
}
```



### POST /auth
Esse Endpoit é responsável por fazer o processo de login.
#### Parametros
email: E-mail do usuário cadastrado no sistema com aquele determinado e-mail.

password: Senha do usuário cadastrado no sistema.

Exemplo:
```
{
    "email": "usuario@email.com",
    "password": "123456"
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber o token JWT para acessar os endpoits protegidos na API. 

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsdWNhc2VzcGFzc2luaUBob3RtYWlsLmNvbSIsImlhdCI6MTY0NTMzNDk0MSwiZXhwIjoxNjQ1NTA3NzQxfQ._91L5A-_cdBHNE_2B7V2LmRcd6cM2I3wF9CTutX6NWU"
}
```

##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. 

Motivos: Senha ou E-mail incorretos.

Exemplo de resposta:
```
{"err": "Credenciais incorretas"}
```

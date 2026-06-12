# 🏨 Hotel Reservas

Sistema de gerenciamento de quartos e reservas desenvolvido para facilitar o controle de hospedagens, permitindo o cadastro de quartos, gerenciamento de reservas e visualização de informações de forma simples e organizada.

## 🚀 Tecnologias Utilizadas

### Backend

* Node.js
* Express.js
* Prisma ORM
* MySQL

### Frontend

* HTML5
* CSS3
* JavaScript

## 📋 Funcionalidades

### 🛏️ Gerenciamento de Quartos

* Cadastro de quartos
* Listagem de quartos cadastrados
* Exclusão de quartos
* Visualização das reservas vinculadas a cada quarto

### 📅 Gerenciamento de Reservas

* Cadastro de reservas
* Listagem de reservas por quarto
* Exclusão de reservas
* Relacionamento entre quartos e reservas

## 📂 Estrutura do Projeto

```text
hotelreservas/
│
├── api/
│   ├── controllers/
│   │   ├── quartoController.js
│   │   └── reservaController.js
│   │
│   ├── routes/
│   │   ├── quartoRoutes.js
│   │   └── reservaRoutes.js
│   │
│   ├── config/
│   │   └── prisma.js
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   └── server.js
│
├── web/
│   ├── index.html
│   ├── reservas.html
│   ├── style.css
│   └── script.js
│
├── docs/
│   ├── insomnia.json
│   └── migration.sql
│
├── wireframes/
│   ├── tela-quartos.png
│   └── tela-reservas.png
│
└── README.md
```

## ⚙️ Instalação

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd hotelreservas
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/hotel_db"
PORT=3000
```

### 4. Executar as migrations

```bash
npx prisma migrate dev
```

### 5. Gerar o Prisma Client

```bash
npx prisma generate
```

### 6. Iniciar o servidor

```bash
npm start
```

## 🔗 Endpoints da API

### Quartos

| Método | Endpoint      | Descrição        |
| ------ | ------------- | ---------------- |
| GET    | `/quarto`     | Listar quartos   |
| POST   | `/quarto`     | Cadastrar quarto |
| DELETE | `/quarto/:id` | Excluir quarto   |

### Reservas

| Método | Endpoint              | Descrição                 |
| ------ | --------------------- | ------------------------- |
| POST   | `/reserva`            | Cadastrar reserva         |
| GET    | `/reserva/:quarto_id` | Listar reservas do quarto |
| DELETE | `/reserva/:id`        | Excluir reserva           |

## 📸 Protótipos

### Tela de Quartos


![Quartos Cadastrados](./wireframes/Quartos cadastrados.png)


### Tela de Reservas



## 📖 Documentação

* Arquivo de testes da API (Insomnia): `docs/insomnia.json`
* Script de banco de dados: `docs/migration.sql`

## 👩‍💻 Autora

**Heloá Vitória de Oliveira**

Projeto desenvolvido para fins acadêmicos e de aprendizado, aplicando conceitos de desenvolvimento web full stack com Node.js, Express, Prisma e MySQL.

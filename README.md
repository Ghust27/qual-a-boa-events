# Qual A Boa Events

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="./owl-logo.png" width="200" alt="Qual A Boa Events Logo" /></a>
</p>

API REST para gerenciamento de eventos, desenvolvida com AdonisJS. O sistema permite que organizadores criem e gerenciem eventos, enquanto participantes podem se registrar e acompanhar seus eventos.

## 🚀 Tecnologias

- **AdonisJS 6** - Framework Node.js
- **TypeScript** - Tipagem estática
- **PostgreSQL** - Banco de dados relacional
- **Lucid ORM** - ORM para AdonisJS
- **VineJS** - Validação de dados
- **Luxon** - Manipulação de datas
- **Docker** - Containerização do banco de dados

## 📋 Funcionalidades

### Autenticação
- Registro de usuários (ORGANIZER ou PARTICIPANT)
- Login com geração de token de acesso
- Atualização de perfil

### Eventos (Organizadores)
- Criar eventos com nome, descrição, localização, data e capacidade máxima
- Listar eventos criados
- Editar eventos próprios
- Deletar eventos próprios
- Visualizar participantes de um evento

### Registros (Participantes)
- Registrar-se em eventos
- Visualizar minhas inscrições
- Cancelar inscrição em eventos
- Validação de conflitos de horário
- Validação de capacidade máxima

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas:

```
app/
├── controllers/     # Controladores HTTP
├── use_cases/       # Lógica de negócio
├── repositories/    # Acesso a dados
├── models/          # Modelos do banco de dados
├── dtos/            # Data Transfer Objects
├── validators/      # Validação de entrada
└── middleware/      # Middlewares HTTP
```

### Fluxo de Requisição

1. **Controller** - Recebe a requisição HTTP
2. **Validator** - Valida os dados de entrada
3. **Use Case** - Executa a lógica de negócio
4. **Repository** - Acessa o banco de dados
5. **Model** - Representa a entidade no banco

## 🛠️ Instalação

### Pré-requisitos

- Node.js 18+ 
- PostgreSQL 16+ (ou Docker)
- npm ou yarn

### Passos

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd qual_a_boa_events
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=your-app-key-here

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=adonis
DB_PASSWORD=password
DB_DATABASE=qual_a_boa_events_db
```

4. Inicie o banco de dados com Docker:
```bash
docker-compose up -d
```

5. Execute as migrations:
```bash
node ace migration:run
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`

## 📚 Endpoints da API

Todas as rotas estão prefixadas com `/api`

### Rotas Públicas

#### POST `/api/register`
Registra um novo usuário.

**Body:**
```json
{
  "fullName": "João Silva",
  "email": "joao@example.com",
  "password": "senha123",
  "cpf": "12345678900",
  "role": "PARTICIPANT"
}
```

#### POST `/api/login`
Realiza login e retorna token de acesso.

**Body:**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "token": {
    "value": "token-aqui",
    "expiresAt": "2024-01-01T00:00:00.000Z"
  },
  "user": {
    "id": 1,
    "fullname": "João Silva",
    "email": "joao@example.com",
    "role": "PARTICIPANT"
  }
}
```

### Rotas Protegidas (Requerem autenticação)

#### POST `/api/events`
Cria um novo evento (apenas ORGANIZER).

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "Workshop de TypeScript",
  "description": "Aprenda TypeScript do zero",
  "location": "São Paulo, SP",
  "eventDate": "2024-12-15 14:00:00",
  "maxCapacity": 50
}
```

#### GET `/api/events/:id/participants`
Lista participantes de um evento (apenas o organizador).

#### PUT `/api/events/:id`
Atualiza um evento (apenas o organizador dono).

**Body:** (todos os campos opcionais)
```json
{
  "name": "Novo nome",
  "description": "Nova descrição",
  "location": "Nova localização",
  "eventDate": "2024-12-20 15:00:00",
  "maxCapacity": 100
}
```

#### DELETE `/api/events/:id`
Deleta um evento (apenas o organizador dono).

#### POST `/api/events/:id/register`
Registra-se em um evento (apenas PARTICIPANT).

#### GET `/api/my-registrations`
Lista minhas inscrições em eventos.

#### DELETE `/api/events/:id/register`
Cancela inscrição em um evento.

#### PUT `/api/profile`
Atualiza perfil do usuário autenticado.

**Body:** (todos os campos opcionais)
```json
{
  "fullName": "Novo Nome",
  "cpf": "98765432100"
}
```

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento com hot-reload
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start

# Verificar tipos TypeScript
npm run typecheck

# Linter
npm run lint

# Formatar código
npm run format
```

## 🔐 Autenticação

A API usa **Access Tokens** para autenticação. Após fazer login, você receberá um token que deve ser enviado no header `Authorization`:

```
Authorization: Bearer <seu-token-aqui>
```

## 🧪 Testando a API com Insomnia

O projeto inclui uma coleção completa de requisições para o **Insomnia**, facilitando o teste de todos os endpoints.

### Como importar

1. Abra o **Insomnia**
2. Clique em **Application** → **Preferences** → **Data** → **Import Data**
3. Selecione o arquivo `Insomnia_2025-11-30.yaml` na raiz do projeto
4. A coleção "Qual A Boa Events" será importada com todas as rotas configuradas

### Estrutura da coleção

A coleção está organizada em pastas:
- **Auth** - Rotas de autenticação (register, login)
- **Events** - Gerenciamento de eventos (criar, editar, deletar, listar participantes)
- **Registrations** - Inscrições em eventos (registrar, listar, cancelar)
- **Profile** - Atualização de perfil

### Variáveis de ambiente

A coleção usa variáveis para facilitar o uso:
- `base_url` - URL base da API (padrão: `http://localhost:3333`)
- `token_organizer` - Cole aqui o token de um usuário ORGANIZER.
- `token_participant` - Cole aqui o token de um usuário PARTICIPANT.

**Dica:** Ao fazer login nas respectivas rotas, copie o token retornado e cole nessas variáveis. As rotas protegidas (como "Criar Evento" ou "Inscrever-se") usarão o token correto automaticamente.

## 📊 Modelos de Dados

### User
- `id` - ID único
- `fullName` - Nome completo
- `email` - Email (único)
- `password` - Senha (hasheada)
- `cpf` - CPF (único)
- `role` - ORGANIZER ou PARTICIPANT
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

### Event
- `id` - ID único
- `organizerId` - ID do organizador
- `name` - Nome do evento
- `description` - Descrição (opcional)
- `location` - Localização
- `eventDate` - Data e hora do evento
- `maxCapacity` - Capacidade máxima
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

### Registration
- `id` - ID único
- `userId` - ID do participante
- `eventId` - ID do evento
- `createdAt` - Data de registro
- `updatedAt` - Data de atualização

## ✅ Validações Implementadas

- **Registro em Eventos:**
  - Usuário deve ser PARTICIPANT
  - Evento deve existir
  - Usuário não pode estar já registrado
  - Evento não pode estar lotado
  - Não pode haver conflito de horário com outros eventos

- **Criação de Eventos:**
  - Usuário deve ser ORGANIZER
  - Data do evento deve ser futura
  - Capacidade mínima de 1 participante

- **Edição/Exclusão:**
  - Apenas o organizador dono pode editar/deletar

## 🐳 Docker

O projeto inclui um `docker-compose.yml` para facilitar o setup do banco de dados:

```bash
# Iniciar PostgreSQL
docker-compose up -d

# Parar PostgreSQL
docker-compose down
```

## 👨‍💻 Desenvolvimento

### Estrutura de Pastas

```
qual_a_boa_events/
├── app/
│   ├── controllers/      # Controladores HTTP
│   ├── use_cases/        # Casos de uso (lógica de negócio)
│   ├── repositories/     # Repositórios (acesso a dados)
│   ├── models/           # Modelos do ORM
│   ├── dtos/             # Data Transfer Objects
│   ├── validators/       # Validadores VineJS
│   └── middleware/       # Middlewares
├── config/               # Arquivos de configuração
├── database/
│   └── migrations/       # Migrations do banco
├── start/
│   ├── routes.ts         # Definição de rotas
│   └── kernel.ts         # Configuração de middlewares
```

### Convenções

- **Controllers**: Apenas recebem requisições e retornam respostas
- **Use Cases**: Contêm toda a lógica de negócio
- **Repositories**: Apenas acesso a dados, sem lógica de negócio
- **DTOs**: Definem a estrutura de dados entre camadas
- **Validators**: Validam dados de entrada usando VineJS

## 🚨 Tratamento de Erros

A API retorna erros no formato:

```json
{
  "message": "Mensagem de erro descritiva"
}
```

Códigos HTTP comuns:
- `200` - Sucesso
- `201` - Criado com sucesso
- `204` - Sucesso sem conteúdo
- `400` - Erro de validação
- `401` - Não autenticado
- `403` - Não autorizado
- `404` - Não encontrado
- `500` - Erro interno do servidor

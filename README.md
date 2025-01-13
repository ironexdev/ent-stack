# ENT Stack

<p align="center">
<img src="https://github.com/user-attachments/assets/c3c579a8-6ae8-46cf-a854-46d382473dbc" width="300">
</p>

![ent-title](https://github.com/user-attachments/assets/9b4b4cf5-a2ca-4e9b-b498-3362cc7953b1)

<div align="center">
  
[![NPM version][npm-image]][npm-url] [![Setup Guide][setup-guide-image]][setup-guide-url] [![ffn][documentation-image]][documentation-url]

</div>

## Table of Contents

- [What is the ENT Stack](#table-of-contents)
- [Features](#features)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)

## What is the ENT Stack?

The ENT Stack is a robust, full-stack monorepo starter kit that integrates <ins>**E**</ins>xpress 5, <ins>**N**</ins>ext.js 15, and <ins>**T**</ins>RPC, offering a streamlined solution for web app development.

It allows you to build and **share code** between frontend and backend in a single project while maintaining the flexibility to **host them separately**.

## Features

🌀 **PNPM Workspace - Monorepo**

- The stack uses <a href="https://pnpm.io" target="_blank">PNPM</a> Workspace because it's simple and painless to use. With its efficient dependency management and shared package architecture, <a href="https://pnpm.io" target="_blank">PNPM</a> ensures faster installs and a clean, modular workflow.
- Within the monorepo, each top-level folder plays a distinct role:
  - **apps** folder contains both the backend (`apps/backend`) and frontend (`apps/frontend`) codebases.
  - **packages** folder contains a `shared` directory (`packages/shared`) that centralizes common configurations, utilities, services type definitions, and translations.
- To maintain uniform code quality, each of these directories includes an `eslint.config.js` file featuring consistent rules. A root-level `tsconfig.json` provides a base set of TypeScript configurations, while each subproject extends these defaults to meet its own requirements.

🤝 **Type-Safe API Layer**

- The stack leverages <a href="https://trpc.io" target="_blank">TRPC</a> to create a type-safe bridge between the frontend and backend. This ensures that your IDE automatically provides type hints and autocompletion for API endpoints, eliminating the need for manual type definitions.

🌐 **Translations and Routing (i18n)** 
  
  - A custom, lightweight solution handles localization using standalone functions that use <a href="https://unicode-org.github.io/icu/userguide/format_parse/messages" target="_blank">ICU message syntax</a>.
  - Translation functions can be used anywhere in the stack (both backend and frontend).
  - The stack includes two scripts for message import and export.
  - Frontend routes are fully translatable, defined in standalone .ts file, and dynamically evaluated at runtime through <a href="https://nextjs.org" target="_blank">Next.js</a> middleware.

🔒 **Authentication & Authorization**

- The stack provides passwordless registration and login through short verification PINs, secure JWT access tokens, and UUID-based refresh tokens. Additionally, frontend routes can be marked as protected in `routes.ts`, restricting them to authenticated users - this is evaluated in `middleware.ts`.

⚙️ **Environment & Configuration**

- Leverages <a href="https://env.t3.gg" target="_blank">T3 Env</a> type-safe environment variables validation in both backend and frontend
- Contains Shared configuration file `shared-config.ts` that is extended by both Backend `backend-config.ts` and Frontend `frontend-config.ts` files for feature-focused settings

🪵 **Logging**

- The stack employs <a href="https://getpino.io" target="_blank">Pino</a> for lightweight and efficient logging across both backend and frontend. Its simple API and minimal overhead ensure clear, structured logs without impacting performance. 

🪲 **Error Handling and Validation**

- The stack uses <a href="https://zod.dev" target="_blank">Zod</a> for consistent input validation across the frontend and backend, integrated with <a href="https://trpc.io" target="_blank">TRPC</a> for type-safe error management.
- Input is sanitized to prevent injection attacks.
- Errors are categorized into client, server, and userland types for precise handling.
- <a href="https://tanstack.com/query/v5/docs/framework/react/overview" target="_blank">Tanstack Query</a> handles errors through a custom handler with callbacks for server, client, and userland errors.

🔄 **State Management**

- Uses <a href="https://zustand-demo.pmnd.rs" target="_blank">Zustand</a> for lightweight, synchronous global state management, delivering a minimal overhead approach for storing and controlling shared data across the application.
- Uses <a href="https://tanstack.com/query/latest" target="_blank">Tanstack Query</a> for asynchronous data fetching and caching, providing an SSR-friendly solution that keeps the UI and server in sync.

🛢️ **Database**

- The backend uses <a href="https://orm.drizzle.team/" target="_blank">Drizzle ORM</a> for interacting with a <a href="https://www.mysql.com" target="_blank">MySQL</a> database, providing a type-safe and developer-friendly API.
- It also contains <a href="https://docs.docker.com/reference/cli/docker/#option-types" target="_blank">Docker</a> Image and a script `bin/docker/run-local-db.sh` to run the database locally.

✉️ **Email Sending**

- integrates <a href="https://resend.com" target="_blank">Resend</a> for developer friendly e-mail sending.
- Backend also contains email test router for email previews and testing.
- Email templates are written in <a href="https://handlebarsjs.com" target="_blank">Handlebars</a>.

🤖 **Testing**

- The stack uses <a href="https://playwright.dev" target="_blank">Playwright</a> for unified frontend and backend testing, ensuring consistency and reliability.
- <a href="https://malslurp.dev" target="_blank">Mailslurp</a> is used for comprehensive email testing, verifying email workflows and content.

## Getting Started

Get up and running with the <a href="https://ent-stack.com" target="_blank">ENT Stack</a> in just two steps:

**Prerequisites**
<small>
- <a href="https://nodejs.org" target="_blank">Node.js</a>
- <a href="https://pnpm.io" target="_blank">PNPM</a>
- <a href="https://docs.docker.com/reference/cli/docker/#option-types" target="_blank">Docker CLI</a> (for local MySQL database)
- A Unix-like shell environment (e.g., Bash, Zsh)
</small>

### 1/ 🚀 Create your project

```bash
pnpm create ent-stack@latest
```
- Creates a new project (folder) based on specific version of this repository.
- The version used is specified in the description of the <a href="https://www.npmjs.com/package/create-ent-stack" target="_blank">npm package</a>.

### 2/ 🔥 Setup

```bash
pnpm fire
```
- Installs dependencies
- Starts the local database in a Docker container
- Creates the database and tables
- Runs dev environments for both the backend and frontend

At this point, your application should be up and running locally. But to enable email sending and testing, you need to follow the final step below.

### 3/ 🧪 Configure Mailing and Run Tests

To enable mailing, you need to do the following:
- **[Sign up for a free Resend account](https://resend.com/signup)** and set **SERVICE_EMAIL**, **SECURITY_EMAIL** and **RESEND_API_KEY** in `apps/backend/.env`
  - Serves as a service for sending e-mails
<table align="center" width="100%">
  <tr>
    <td width="50%">
      <img src="https://github.com/user-attachments/assets/57bc026b-dc0b-4c88-abc6-d4006b9ff8ae" alt="Resend domain" width="100%">
    </td>
    <td width="50%">
      <img src="https://github.com/user-attachments/assets/3b7975a9-8749-4729-97a5-efb136ad3622" alt="Resend API Key" width="100%">
    </td>
  </tr>
</table>

- **[Sign up for a free MailSlurp account](https://app.mailslurp.com/sign-up)** and set **MAILSLURP_API_KEY**, **MAILSLURP_INBOX_ID** and **MAILSLURP_EMAIL** in `apps/backend/.env`
  - Serves as a service for receiving e-mails (for testing purposes)
<table align="center" width="100%">
  <tr>
    <td width="50%">
      <img src="https://github.com/user-attachments/assets/41affe10-ad42-4d89-a2b3-f69dd8597997" alt="MailSlurp inbox and inbox id" width="100%">
    </td>
    <td width="50%">
      <img src="https://github.com/user-attachments/assets/60f53cd3-bede-4fb0-9175-7be92955a153" alt="MailSlurp API Key" width="100%">
    </td>
  </tr>
</table> 

After that, you can run the tests by executing the following commands:
- Test Backend
```bash
pnpm backend:test
```
- Test Frontend
```bash
pnpm frontend:test
```

Here is the list of values that **MUST BE THE SAME** in both backend and frontend **.env** files:

| Backend       | Frontend                  |
|---------------|---------------------------|
| SITE_NAME     | NEXT_PUBLIC_SITE_NAME     |
| COOKIE_DOMAIN | NEXT_PUBLIC_COOKIE_DOMAIN |
| BACKEND_URL   | NEXT_PUBLIC_BACKEND_URL   |
| FRONTEND_URL  | NEXT_PUBLIC_FRONTEND_URL  |
| JWT_SECRET    | JWT_SECRET                |

## Documentation

For information about ENT Stack features go to the 📄 [Documentation](https://ent-stack.com/ent-stack/documentation/)

[npm-url]: https://www.npmjs.com/package/create-ent-stack
[npm-image]: https://img.shields.io/npm/v/create-ent-stack?color=b45bf5&logoColor=0b7285

[setup-guide-url]: https://ent-stack.com/ent-stack/setup/
[setup-guide-image]: https://img.shields.io/badge/setup_guide-726fff

[documentation-url]: https://ent-stack.com/ent-stack/documentation
[documentation-image]: https://img.shields.io/badge/documentation-726fff

## Troubleshooting

1/ **IDE issues**
```
- Node interpreter is not set
- Eslint/Prettier is not working on save
- TypeScript highlights non-existent errors
```
- These issues can occur if your IDE is not properly configured. For reference, I'm attaching my PHPStorm (WebStorm) configuration on WSL2 with Ubuntu, showing the settings for ESLint, Prettier, and Node.js.:
<table align="center">
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/6b509924-f8a7-4ec3-b569-721784527fc8" width="250" alt="Eslint Settings"/>
    </td>
    <td><img src="https://github.com/user-attachments/assets/2d60cea8-f295-4667-a0d8-7553dd863070" width="250" alt="Prettier Settings" />
    </td>
    <td><img src="https://github.com/user-attachments/assets/0e42aa53-f420-42ad-85ab-e61881ccc2e9" width="250" alt="Node.js Settings"/>
    </td>
  </tr>
</table>

2/ **MySQL container name conflict**
```
docker: Error response from daemon: Conflict. The container name "/mysql" is already in use by container
```
- Remove the existing container by running `docker rm mysql`
- Or for more nuclear solution, run `bin/docker/cleanup.sh`
  - this script forcefully cleans up Docker by removing all build caches, containers, images, and unused networks to free disk space and reset the environment.


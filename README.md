# ENT Stack

<p align="center">
<img src="https://github.com/user-attachments/assets/c3c579a8-6ae8-46cf-a854-46d382473dbc" width="300">
</p>

![ent-title](https://github.com/user-attachments/assets/9b4b4cf5-a2ca-4e9b-b498-3362cc7953b1)

<div align="center">
  
[![NPM version][npm-image]][npm-url] [![Setup Guide][setup-guide-image]][setup-guide-url] [![ffn][documentation-image]][documentation-url]

</div>

## What is the ENT Stack?

The ENT Stack is a robust, full-stack monorepo starter kit that integrates <ins>**E**</ins>xpress 5, <ins>**N**</ins>ext.js 15, and <ins>**T**</ins>RPC, offering a streamlined solution for web app development.

It allows you to build and **share code** between frontend and backend in a single project while maintaining the flexibility to **host them separately**.

## Getting Started

Get up and running with the [ENT Stack](https://ironexdev.github.io/ent-stack-documentation) in just two steps:

**Prerequisites**
<small>
- Node.js
- PNPM
- Docker CLI (for local MySQL database)
- A Unix-like shell environment (e.g., Bash, Zsh
</small>

### 1/ 🚀 Create your project

```bash
pnpm create ent-stack
```

### 2/ 🔥 Setup

```bash
pnpm fire
```
- Installs dependencies
- Starts the local database in a Docker container
- Creates the database and tables
- Runs dev environments for both the backend and frontend

### Environment Variables

If you ran create and setup scripts, then your application should be running just fine, but email sending and testing won't work until adjust env variables listed below:
- To enable email sending, you need to **[sign up for a Resend account](https://resend.com/signup)** and set **RESEND_API_KEY**
- To enable email testing, you need to **[sign up for a Mailslurp account](https://app.mailslurp.com/sign-up)** and set **MAILSLURP_API_KEY**, **MAILSLURP_INBOX_ID** and **MAILSLURP_EMAIL**

Here is the list of values that **MUST BE THE SAME** in both backend and frontend **.env** files:

| Backend       | Frontend                  |
|---------------|---------------------------|
| SITE_NAME     | NEXT_PUBLIC_SITE_NAME     |
| COOKIE_DOMAIN | NEXT_PUBLIC_COOKIE_DOMAIN |
| BACKEND_URL   | NEXT_PUBLIC_BACKEND_URL   |
| FRONTEND_URL  | NEXT_PUBLIC_FRONTEND_URL  |
| JWT_SECRET    | JWT_SECRET                |

**Note:** SERVICE_EMAIL and SECURITY_EMAIL don't need real domains (they are only used in translations).

At this point, your application should be up and running locally. Adjust values, domains, and environment settings as needed.

## Documentation

For information about ENT Stack features go to the 📄 [Documentation](https://ironexdev.github.io/ent-stack-documentation)

## What's Inside

| Tool/Tech                                                      | Role                         |
|----------------------------------------------------------------|------------------------------|
| [Express 5](https://expressjs.com)                             | Backend Framework            |
| [Next.js 15](https://nextjs.org)                               | Frontend Framework           |
| [TRPC 11](https://trpc.io)                                     | Typesafe APIs                |
| Custom i18n solution                                           | Route & Message Translations |
| [Drizzle](https://orm.drizzle.team)                            | Database ORM                 |
| [Lucide React](https://lucide.dev/guide/packages/lucide-react) | Icons                        |
| [Mailslurp](https://mailslurp.com)                             | Email Testing                |
| [MySQL 8](https://www.mysql.com)                               | Database                     |
| [Pino](https://getpino.io)                                     | Logging                      |
| [Playwright](https://playwright.dev)                           | Testing Framework            |
| [Resend](https://resend.com)                                   | Email Sending                |
| [T3 Env](https://env.t3.gg)                                    | Environment Variables        |
| [Tanstack Query](https://tanstack.com/query)                   | Async State Management       |
| [Zod](https://zod.dev)                                         | Validation                   |
| [Zustand](https://zustand-demo.pmnd.rs)                        | State Management             |

[npm-url]: https://www.npmjs.com/package/create-ent-stack
[npm-image]: https://img.shields.io/npm/v/create-ent-stack?color=b45bf5&logoColor=0b7285

[setup-guide-url]: https://ironexdev.github.io/ent-stack-documentation/ent-stack/setup/
[setup-guide-image]: https://img.shields.io/badge/setup_guide-726fff

[documentation-url]: https://ironexdev.github.io/ent-stack-documentation/ent-stack/documentation
[documentation-image]: https://img.shields.io/badge/documentation-726fff

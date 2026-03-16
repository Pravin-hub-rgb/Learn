# Project 1 — Server Actions 🚀

## Project Overview

Yeh project Server Actions seekhne ke liye banaya gaya hai. Isme hum:

1. **Server Actions** - Data ko server par process karte hain
2. **Prisma + PostgreSQL** - Database ko manage karte hain
3. **Form Handling** - Form se data submit karte hain
4. **Error Handling** - Errors ko properly handle karte hain

---

## Project Structure

```
server-actions-project/
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── prisma.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env
├── package.json
└── README.md
```

---

## Documentation

### Phase 1: Setup & Database
1. [Project Setup](doc-01.1-project-setup.md) - Next.js + Prisma + PostgreSQL setup
2. [Database Schema](doc-01.2-database-schema-design.md) - Todo model design
3. [Prisma Client](doc-01.3-prisma-client-setup.md) - Database client setup
4. [Environment Variables](doc-01.4-environment-variables-connection.md) - Secure connection setup

### Phase 2: Server Actions
5. [Server Actions Concept](doc-02.1-server-actions-kya-hote-hain.md) - Server Actions kya hote hain?
6. [Add Todo](doc-02.2-add-todo-create.md) - Create operation
7. [Get Todos](doc-02.3-get-todos-read.md) - Read operation
8. [Update Todo](doc-02.4-update-todo-toggle-done.md) - Update operation
9. [Delete Todo](doc-02.5-delete-todo.md) - Delete operation
10. [Error Handling](doc-02.6-error-handling-validation.md) - Error handling & validation
11. [Custom Error Types](doc-02.7-custom-error-types.md) - Custom error classes

### Phase 3: Frontend Integration
12. [Form with Server Actions](doc-03.1-form-with-server-actions.md) - Form handling
13. [Display Todos](doc-03.2-display-todos.md) - Data display & UI

---

## Learning Objectives

✅ **Server Actions** - Next.js ki built-in feature
✅ **Database Operations** - CRUD operations with Prisma
✅ **Form Handling** - Form se data submit karna
✅ **Error Handling** - Errors ko properly handle karna
✅ **Type Safety** - TypeScript se type checking

---

## Prerequisites

- Node.js installed
- PostgreSQL database
- Basic understanding of Next.js
- Basic understanding of TypeScript

---

## Getting Started

1. Clone this project
2. Install dependencies: `npm install`
3. Setup database: `npx prisma migrate dev`
4. Start development server: `npm run dev`

---

## Key Concepts

### Server Actions
- Next.js ki built-in feature
- Data ko server par process karta hai
- No separate API routes needed
- Type safety provide karta hai

### Prisma
- Database ORM
- Type-safe database queries
- Easy database management
- Migration support

### Form Handling
- Form se data collect karna
- Validation karna
- Server ko data bhejna
- Response handle karna

---

## Best Practices

✅ **Error Handling** - Always handle errors properly
✅ **Validation** - Always validate user input
✅ **Type Safety** - Use TypeScript for type checking
✅ **Security** - Use environment variables for sensitive data
✅ **Performance** - Optimize database queries

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Database connection error | Check DATABASE_URL in .env file |
| Prisma not found | Run `npx prisma generate` |
| Type errors | Check TypeScript configuration |
| Form not submitting | Check form onSubmit handler |

---

## Next Steps

After completing this project, you can:

1. **Deploy** - Deploy on Vercel or other platforms
2. **Scale** - Add more features and functionality
3. **Learn** - Move to next project (Zod + React Hook Form)
4. **Practice** - Build more projects using these concepts

---

## Support

If you face any issues:

1. Check documentation
2. Search online for solutions
3. Ask in developer communities
4. Review your code for errors

---

## Project Status

✅ **Complete** - All documentation created
✅ **Functional** - Ready to use
✅ **Tested** - Basic functionality tested
✅ **Documented** - Complete documentation available

---

## License

This project is for learning purposes only. Feel free to use, modify, and share the code and documentation.
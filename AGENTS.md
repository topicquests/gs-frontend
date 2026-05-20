# Frontend Development Guidelines

## Development Principles

- Use `backlog.md` to track project backlog, code review findings, and features in progress. This is the main source of truth for project status and next steps.
- Use `README.md` for high-level documentation, architecture overview, and user-facing information about the project.


## Dev Environment

- Develop the frontend application using TypeScript and React using Vite. Use one of the skills as appropriate: `vercel-react-best-practices` or `vite`.
- See `argdown-syntax.md` for Argdown syntax reference.
- Never run blocking server commands (`npm start`, `npm run dev` etc.) but instead provide commands for user to run separately.

## Testing

- Run `npm run lint` often to ensure code quality.

# Frontend Development Guidelines

## Development Guidelines

- Use `backlog.md` to track project backlog, code review findings, and features in progress. This is the main source of truth for project status and next steps.
- Use `README.md` for high-level documentation, architecture overview, and user-facing information about the project.
- Develop the frontend application using TypeScript and React using Vite. Use one of the skills as appropriate: `vercel-react-best-practices` or `vite`.
- Include comments in the code at a high level to explain the purpose of components, functions, and complex logic.
- Include print statements (e.g. `console.log`) to help trace execution flow and debug issues.
- See `argdown-syntax.md` for Argdown syntax reference.
- Never run blocking server commands (`npm start`, `npm run dev` etc.) but instead provide commands for user to run separately.
- We are not writing this code for production use, so focus on functionality and clarity rather than performance optimizations. Continue to follow best practices while creating a working prototype.

## Testing

- To ensure code quality, run `npm run format`, `npm run typecheck`, and `npm run lint` after every task.
- Always add or update unit tests for any new features or fixes.

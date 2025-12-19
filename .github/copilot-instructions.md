# Copilot Instructions

You are working on the `loveUrl` project, a TypeScript library for URL handling with React and Next.js integrations.

## Tech Stack
- **Language:** TypeScript
- **Build Tool:** tsup
- **Frameworks:** React, Next.js
- **Testing:** Jest/Vitest (implied by `tests/` folder structure)

## Coding Guidelines

### TypeScript
- Use strict typing. Avoid `any` whenever possible.
- Define shared types in `src/types/index.ts`.
- Prefer interfaces over types for object definitions.

### Project Structure
- Core logic goes in `src/internal/`.
- React hooks and components go in `src/react/`.
- Next.js specific integrations go in `src/next/`.
- Public exports should be managed in `src/index.ts`.

### Testing
- Write unit tests for all new core logic in `tests/`.
- Ensure tests cover edge cases, especially for URL encoding/decoding.

### Best Practices
- Keep functions small and pure where possible.
- Use `const` for variables that don't change.
- Ensure proper error handling for URL parsing.

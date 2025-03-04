# JLPT

Simple website for quizzing your japanese dictionary

## Development
> pnpm install

> pnpm dev

## Deployment
> pnpm run deploy

## Creating new page

To create a new page with it's route, first create a new file:
> touch src/routes/new_route_name.lazy.tsx

Then, copy this template code for the route
```
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/new_route_name")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div />;
}
```

After that, run the development server
> pnpm dev


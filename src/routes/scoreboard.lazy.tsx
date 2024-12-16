import { ScoreboardPage } from "@pages";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/scoreboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ScoreboardPage />;
}

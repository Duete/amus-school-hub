import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/faculty")({
  component: () => <Outlet />,
});

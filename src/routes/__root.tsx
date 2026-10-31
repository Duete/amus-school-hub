import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import { SchoolHeader, SchoolFooter } from "@/components/school-layout";
import { MafabiChatbot } from "@/components/mafabi-chatbot";
import { AuthProvider } from "@/lib/auth";

import appCss from "../styles.css?url";

const publicOrigin = (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined)?.replace(
  /\/$/,
  "",
);

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mbale Progressive Secondary School" },
      {
        name: "description",
        content:
          "A mixed day and boarding secondary school in Mbale City, Uganda, offering UCE/O-Level and UACE/A-Level education. Established in 1993.",
      },
      {
        name: "keywords",
        content: "Mbale secondary school, UCE, UACE, O-Level, A-Level, boarding school, Uganda",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Mbale Progressive Secondary School" },
      {
        property: "og:description",
        content:
          "A mixed day and boarding secondary school in Mbale City, offering UCE/O-Level and UACE/A-Level education. Established in 1993.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Mbale Progressive Secondary School" },
      ...(publicOrigin ? [{ property: "og:url", content: publicOrigin }] : []),
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Mbale Progressive Secondary School" },
      {
        name: "twitter:description",
        content:
          "A mixed day and boarding secondary school in Mbale City, Uganda, offering UCE/O-Level and UACE/A-Level education.",
      },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Mbale Progressive Secondary School",
          description:
            "A mixed day and boarding secondary school in Mbale City, Uganda, offering UCE/O-Level and UACE/A-Level education.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Mbale",
            addressRegion: "Eastern Uganda",
            addressCountry: "UG",
          },
          ...(publicOrigin ? { url: publicOrigin } : {}),
        },
      },
    ],
    links: [
      ...(publicOrigin ? [{ rel: "canonical", href: publicOrigin }] : []),
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Nunito+Sans:wght@400;500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <SchoolHeader />
        <main>
          <Outlet />
        </main>
        <MafabiChatbot />
        <SchoolFooter />
      </AuthProvider>
    </QueryClientProvider>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { AuthProvider } from "../lib/auth";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Page not found.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Interop Intelligence 2.0" },
      {
        name: "description",
        content: "AI-powered healthcare interoperability governance for HL7 to FHIR modernization.",
      },
      { property: "og:title", content: "Interop Intelligence 2.0" },
      { name: "twitter:title", content: "Interop Intelligence 2.0" },
      {
        property: "og:description",
        content: "AI-powered healthcare interoperability governance for HL7 to FHIR modernization.",
      },
      {
        name: "twitter:description",
        content: "AI-powered healthcare interoperability governance for HL7 to FHIR modernization.",
      },
      { name: "twitter:card", content: "summary" },
      { property: "og:type", content: "website" },
      { name: "description", content: "AI-powered healthcare interoperability governance for HL7 to FHIR modernization." },
      { property: "og:description", content: "AI-powered healthcare interoperability governance for HL7 to FHIR modernization." },
      { name: "twitter:description", content: "AI-powered healthcare interoperability governance for HL7 to FHIR modernization." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
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
        <Outlet />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

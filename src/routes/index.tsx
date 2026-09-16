import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SDR da Sua Empresa" },
      { name: "description", content: "SDR da Sua Empresa — site em construção." },
      { property: "og:title", content: "SDR da Sua Empresa" },
      { property: "og:description", content: "SDR da Sua Empresa — site em construção." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">
        SDR da Sua Empresa
      </h1>
      <p className="text-lg text-muted-foreground">Em construção</p>
      <Link to="/auth" className="text-sm text-muted-foreground underline underline-offset-4">
        Entrar
      </Link>
    </main>
  );
}

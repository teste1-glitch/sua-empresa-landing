import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar | SDR da Sua Empresa" },
      { name: "description", content: "Acesse sua conta do SDR da Sua Empresa." },
      { property: "og:title", content: "Entrar | SDR da Sua Empresa" },
      { property: "og:description", content: "Acesse sua conta do SDR da Sua Empresa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    navigate({ to: "/" });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-card p-6"
      >
        <h1 className="text-xl font-semibold text-card-foreground">
          {mode === "login" ? "Entrar" : "Criar conta"}
        </h1>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
        />
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
        />
        {message && <p className="text-sm text-destructive">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Cadastrar"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="w-full text-sm text-muted-foreground underline underline-offset-4"
        >
          {mode === "login" ? "Criar uma conta" : "Já tenho conta"}
        </button>
      </form>
    </main>
  );
}

import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { RequireAuth } from "@/components/require-auth";
import { useServidor } from "@/lib/servidores";

export const Route = createFileRoute("/servidor/$id")({
  head: () => ({
    meta: [
      { title: "Ficha do servidor — Arquivo Funcional" },
      { name: "description", content: "Ficha completa do servidor: dados, contatos, férias, licenças e atestados." },
      { property: "og:title", content: "Ficha do servidor — Arquivo Funcional" },
      {
        property: "og:description",
        content: "Ficha completa do servidor: dados, contatos, férias, licenças e atestados.",
      },
    ],
  }),
  component: () => (
    <RequireAuth>
      <ServidorLayout />
    </RequireAuth>
  ),
});

const TABS = [
  { to: "/servidor/$id", label: "Dados pessoais", exact: true },
  { to: "/servidor/$id/trabalho", label: "Dados de trabalho", exact: false },
  { to: "/servidor/$id/contatos", label: "Contatos", exact: false },
  { to: "/servidor/$id/observacoes", label: "Observações", exact: false },
  { to: "/servidor/$id/ferias", label: "Férias / Atestados", exact: false },
] as const;

function ServidorLayout() {
  const { id } = Route.useParams();
  const { data: servidor } = useServidor(id);

  return (
    <div className="min-h-screen">
      <AppHeader />
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 pt-5">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Voltar
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">
            {servidor?.["nome"] ?? "Servidor"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {[servidor?.["matricula"], servidor?.["cargo"]].filter(Boolean).join(" · ") || "Ficha funcional"}
          </p>
          <nav className="mt-4 flex flex-wrap gap-1 overflow-x-auto">
            {TABS.map((tab) => (
              <Link
                key={tab.to}
                to={tab.to}
                params={{ id }}
                activeOptions={{ exact: tab.exact }}
                className="rounded-t-md border-b-2 border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:border-primary data-[status=active]:text-primary"
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

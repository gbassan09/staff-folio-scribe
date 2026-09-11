import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Plus, Search, UserRound } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useServidores } from "@/lib/servidores";
import { RequireAuth } from "@/components/require-auth";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arquivo Funcional de Servidores" },
      {
        name: "description",
        content:
          "Cadastro e arquivamento de servidores: dados pessoais, dados de trabalho, contatos, férias, licenças e atestados.",
      },
      { property: "og:title", content: "Arquivo Funcional de Servidores" },
      {
        property: "og:description",
        content: "Cadastro e arquivamento de servidores públicos com férias, licenças e atestados.",
      },
    ],
  }),
  component: () => (
    <RequireAuth>
      <ServidoresPage />
    </RequireAuth>
  ),
});

function ServidoresPage() {
  const [search, setSearch] = useState("");
  const { data: servidores = [], isLoading, refetch } = useServidores(search);
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const criar = async () => {
    if (!nome.trim()) {
      toast.error("Informe o nome do servidor");
      return;
    }
    setBusy(true);

    const { data: userData } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("servidores")
      .insert({
        nome: nome.trim(),
        matricula: matricula.trim() || null,
        created_by: userData.user?.id ?? null,
      })
      .select("id")
      .single();
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setOpen(false);
    setNome("");
    setMatricula("");
    void refetch();
    navigate({ to: "/servidor/$id", params: { id: data.id } });
  };

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Servidores</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Selecione um servidor para abrir a ficha completa.
            </p>
          </div>
          <Button onClick={() => setOpen(true)}>
            <Plus className="size-4" /> Novo servidor
          </Button>
        </div>

        <div className="relative mt-6 max-w-md">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar por nome, matrícula ou CPF"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Carregando...</p>
          ) : servidores.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum servidor cadastrado ainda.</p>
          ) : (
            servidores.map((s) => (
              <Link key={s["id"]} to="/servidor/$id" params={{ id: s["id"] as string }}>
                <Card className="h-full transition-colors hover:border-primary">
                  <CardContent className="flex items-center gap-3 py-5">
                    <div className="flex size-11 items-center justify-center rounded-full bg-secondary">
                      <UserRound className="size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{s["nome"]}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {[s["matricula"], s["cargo"], s["secretaria_atual"]].filter(Boolean).join(" · ") ||
                          "Sem dados de trabalho"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo servidor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome completo</Label>
              <Input id="nome" className="mt-1.5" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="matricula">Matrícula</Label>
              <Input
                id="matricula"
                className="mt-1.5"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={criar} disabled={busy}>
              {busy ? "Criando..." : "Criar ficha"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

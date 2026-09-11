import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useDeleteSubRecord,
  useSaveSubRecord,
  useSubRecords,
  type ServidorRow,
  type SubTable,
} from "@/lib/servidores";
import type { FieldDef } from "@/components/data-section";

export function SubList({
  title,
  table,
  servidorId,
  fields,
  defaults,
}: {
  title: string;
  table: SubTable;
  servidorId: string;
  fields: FieldDef[];
  defaults?: Record<string, string>;
}) {
  const { data: rows = [], isLoading } = useSubRecords(table, servidorId);
  const save = useSaveSubRecord(table, servidorId);
  const remove = useDeleteSubRecord(table, servidorId);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [form, setForm] = useState<Record<string, string>>({});

  const openNew = () => {
    setEditingId(undefined);
    const next: Record<string, string> = { ...(defaults ?? {}) };
    for (const f of fields) next[f.key] = next[f.key] ?? "";
    setForm(next);
    setOpen(true);
  };

  const openEdit = (row: ServidorRow) => {
    setEditingId(row.id as string);
    const next: Record<string, string> = { ...(defaults ?? {}) };
    for (const f of fields) next[f.key] = (row[f.key] as string) ?? "";
    setForm(next);
    setOpen(true);
  };

  const submit = () => {
    const values: Record<string, string | null> = { ...(defaults ?? {}) };
    for (const f of fields) {
      const raw = form[f.key] ?? "";
      values[f.key] = raw.trim() ? raw : null;
    }
    save.mutate(
      { id: editingId, values },
      {
        onSuccess: () => {
          toast.success(editingId ? "Registro atualizado" : "Registro adicionado");
          setOpen(false);
        },
        onError: (e) => toast.error(e.message),
      },
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
        <CardTitle className="text-sm font-semibold tracking-wide uppercase">{title}</CardTitle>
        <Button size="sm" variant="secondary" onClick={openNew}>
          <Plus className="size-4" /> Adicionar
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum registro cadastrado.</p>
        ) : (
          <ul className="divide-y">
            {rows.map((row) => (
              <li key={row.id as string} className="flex flex-wrap items-start gap-x-8 gap-y-2 py-3">
                <div className="grid flex-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                  {fields.map((f) => (
                    <div key={f.key}>
                      <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{f.label}</p>
                      <p className="text-sm">{formatValue(row[f.key], f.type)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(row)} aria-label="Editar">
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Excluir"
                    onClick={() =>
                      remove.mutate(row.id as string, {
                        onSuccess: () => toast.success("Registro excluído"),
                        onError: (e) => toast.error(e.message),
                      })
                    }
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar registro" : `Adicionar em ${title.toLowerCase()}`}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.key} className={f.wide ? "sm:col-span-2" : ""}>
                <Label className="text-xs text-muted-foreground" htmlFor={`${table}-${f.key}`}>
                  {f.label}
                </Label>
                <Input
                  id={`${table}-${f.key}`}
                  type={f.type === "date" ? "date" : "text"}
                  className="mt-1.5"
                  value={form[f.key] ?? ""}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={submit} disabled={save.isPending}>
              {save.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function formatValue(value: unknown, type?: FieldDef["type"]) {
  if (value === null || value === undefined || value === "") return "—";
  if (type === "date") {
    const [y, m, d] = String(value).split("-");
    return `${d}/${m}/${y}`;
  }
  return String(value);
}

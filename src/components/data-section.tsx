import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateServidor, type ServidorRow } from "@/lib/servidores";

export type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "date" | "textarea";
  wide?: boolean;
};

export function DataSection({
  title,
  servidorId,
  data,
  fields,
}: {
  title: string;
  servidorId: string;
  data: ServidorRow;
  fields: FieldDef[];
}) {
  const [form, setForm] = useState<Record<string, string>>({});
  const update = useUpdateServidor(servidorId);

  useEffect(() => {
    const next: Record<string, string> = {};
    for (const f of fields) next[f.key] = (data?.[f.key] as string) ?? "";
    setForm(next);
  }, [data, fields]);

  const save = () => {
    const values: Record<string, string | null> = {};
    for (const f of fields) values[f.key] = form[f.key]?.trim() ? form[f.key] : null;
    update.mutate(values, {
      onSuccess: () => toast.success("Informações salvas"),
      onError: (e) => toast.error(e.message),
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
        <CardTitle className="text-sm font-semibold tracking-wide uppercase">{title}</CardTitle>
        <Button size="sm" onClick={save} disabled={update.isPending}>
          {update.isPending ? "Salvando..." : "Salvar"}
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((f) => (
          <div key={f.key} className={f.wide || f.type === "textarea" ? "sm:col-span-2 lg:col-span-3" : ""}>
            <Label className="text-xs text-muted-foreground" htmlFor={f.key}>
              {f.label}
            </Label>
            {f.type === "textarea" ? (
              <Textarea
                id={f.key}
                className="mt-1.5 min-h-32"
                value={form[f.key] ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
              />
            ) : (
              <Input
                id={f.key}
                type={f.type === "date" ? "date" : "text"}
                className="mt-1.5"
                value={form[f.key] ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

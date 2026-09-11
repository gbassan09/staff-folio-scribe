import { createFileRoute } from "@tanstack/react-router";
import { DataSection, type FieldDef } from "@/components/data-section";
import { useServidor } from "@/lib/servidores";

export const Route = createFileRoute("/servidor/$id/contatos")({
  component: Contatos,
});

const CONTATOS: FieldDef[] = [
  { key: "endereco", label: "Endereço" },
  { key: "numero", label: "Número" },
  { key: "complemento", label: "Complemento" },
  { key: "bairro", label: "Bairro" },
  { key: "estado", label: "Estado" },
  { key: "cep", label: "CEP" },
  { key: "ponto_referencia", label: "Ponto de referência", wide: true },
  { key: "tipo_telefone_1", label: "Tipo de telefone - 01" },
  { key: "telefone_1", label: "Telefone - 01" },
  { key: "tipo_telefone_2", label: "Tipo de telefone - 02" },
  { key: "telefone_2", label: "Telefone - 02" },
  { key: "tipo_telefone_3", label: "Tipo de telefone - 03" },
  { key: "telefone_3", label: "Telefone - 03" },
  { key: "email_1", label: "E-mail - 01" },
  { key: "email_2", label: "E-mail - 02" },
];

function Contatos() {
  const { id } = Route.useParams();
  const { data: servidor, isLoading } = useServidor(id);

  if (isLoading || !servidor) return <p className="text-sm text-muted-foreground">Carregando...</p>;

  return <DataSection title="Contatos" servidorId={id} data={servidor} fields={CONTATOS} />;
}

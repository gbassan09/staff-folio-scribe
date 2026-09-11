import { createFileRoute } from "@tanstack/react-router";
import { DataSection, type FieldDef } from "@/components/data-section";
import { SubList } from "@/components/sub-list";
import { useServidor } from "@/lib/servidores";

export const Route = createFileRoute("/servidor/$id/trabalho")({
  component: DadosTrabalho,
});

const TRABALHO: FieldDef[] = [
  { key: "status", label: "Status" },
  { key: "matricula", label: "Matrícula" },
  { key: "secretaria_origem", label: "Secretaria de origem" },
  { key: "secretaria_atual", label: "Secretaria atual" },
  { key: "departamento", label: "Departamento" },
  { key: "equipamento", label: "Equipamento" },
  { key: "data_admissao", label: "Data de admissão", type: "date" },
  { key: "vinculo_empregaticio", label: "Vínculo empregatício" },
  { key: "cargo", label: "Cargo" },
  { key: "fg_das", label: "FG / DAS" },
  { key: "funcao", label: "Função" },
];

const REGISTRO_FIELDS: FieldDef[] = [
  { key: "tipo", label: "Tipo (NOMEAÇÃO / EXONERAÇÃO)" },
  { key: "dom", label: "D.O.M." },
  { key: "portaria", label: "Portaria" },
  { key: "cargo_funcao", label: "Cargo / Função" },
  { key: "fg_das", label: "FG / DAS" },
  { key: "a_partir_de", label: "A partir de", type: "date" },
];

function DadosTrabalho() {
  const { id } = Route.useParams();
  const { data: servidor, isLoading } = useServidor(id);

  if (isLoading || !servidor) return <p className="text-sm text-muted-foreground">Carregando...</p>;

  return (
    <>
      <DataSection title="Dados de trabalho" servidorId={id} data={servidor} fields={TRABALHO} />
      <SubList
        title="Registro de nomeação e exoneração"
        table="registros_nomeacao"
        servidorId={id}
        fields={REGISTRO_FIELDS}
        defaults={{ tipo: "NOMEAÇÃO" }}
      />
    </>
  );
}

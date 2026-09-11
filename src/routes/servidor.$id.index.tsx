import { createFileRoute } from "@tanstack/react-router";
import { DataSection, type FieldDef } from "@/components/data-section";
import { useServidor } from "@/lib/servidores";

export const Route = createFileRoute("/servidor/$id/")({
  component: DadosPessoais,
});

const PESSOAIS: FieldDef[] = [
  { key: "nome", label: "Nome" },
  { key: "nome_social", label: "Nome social" },
  { key: "data_nascimento", label: "Data de nascimento", type: "date" },
  { key: "sexo", label: "Sexo" },
  { key: "nome_pai", label: "Nome do pai" },
  { key: "nome_mae", label: "Nome da mãe" },
  { key: "raca_cor", label: "Raça / Cor" },
  { key: "deficiencia", label: "Deficiência" },
  { key: "tipo_sanguineo", label: "Tipo sanguíneo" },
  { key: "nacionalidade", label: "Nacionalidade" },
  { key: "naturalidade", label: "Naturalidade" },
  { key: "uf", label: "UF" },
  { key: "grau_instrucao", label: "Grau de instrução" },
  { key: "tipo_formacao", label: "Tipo de formação" },
  { key: "foto_url", label: "Link da foto do servidor", wide: true },
];

const DOCUMENTOS: FieldDef[] = [
  { key: "identidade", label: "Identidade" },
  { key: "identidade_orgao", label: "Órgão" },
  { key: "identidade_uf", label: "UF do documento" },
  { key: "identidade_expedicao", label: "Data de expedição", type: "date" },
  { key: "cpf", label: "CPF" },
  { key: "titulo_eleitor", label: "Título de eleitor" },
  { key: "titulo_zona", label: "Zona" },
  { key: "titulo_secao", label: "Seção" },
  { key: "titulo_uf", label: "UF do título" },
  { key: "titulo_expedicao", label: "Expedição do título", type: "date" },
  { key: "carteira_trabalho", label: "Carteira de trabalho" },
  { key: "carteira_serie", label: "Série" },
  { key: "carteira_uf", label: "UF da carteira" },
  { key: "carteira_expedicao", label: "Expedição da carteira", type: "date" },
];

function DadosPessoais() {
  const { id } = Route.useParams();
  const { data: servidor, isLoading } = useServidor(id);

  if (isLoading || !servidor) return <p className="text-sm text-muted-foreground">Carregando...</p>;

  return (
    <>
      {servidor["foto_url"] ? (
        <img
          src={servidor["foto_url"] as string}
          alt={`Foto de ${servidor["nome"]}`}
          className="size-32 rounded-lg border object-cover"
        />
      ) : null}
      <DataSection title="Dados pessoais" servidorId={id} data={servidor} fields={PESSOAIS} />
      <DataSection title="Documentação" servidorId={id} data={servidor} fields={DOCUMENTOS} />
    </>
  );
}

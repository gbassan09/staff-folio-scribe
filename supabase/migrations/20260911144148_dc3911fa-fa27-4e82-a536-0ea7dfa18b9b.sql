CREATE TABLE public.servidores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by uuid,
  foto_url text,
  nome text NOT NULL,
  nome_social text,
  data_nascimento date,
  sexo text,
  nome_pai text,
  nome_mae text,
  raca_cor text,
  deficiencia text,
  tipo_sanguineo text,
  nacionalidade text,
  naturalidade text,
  uf text,
  grau_instrucao text,
  tipo_formacao text,
  identidade text,
  identidade_orgao text,
  identidade_uf text,
  identidade_expedicao date,
  cpf text,
  titulo_eleitor text,
  titulo_zona text,
  titulo_secao text,
  titulo_uf text,
  titulo_expedicao date,
  carteira_trabalho text,
  carteira_serie text,
  carteira_uf text,
  carteira_expedicao date,
  status text,
  matricula text,
  secretaria_origem text,
  secretaria_atual text,
  departamento text,
  equipamento text,
  data_admissao date,
  vinculo_empregaticio text,
  cargo text,
  fg_das text,
  funcao text,
  endereco text,
  numero text,
  complemento text,
  bairro text,
  estado text,
  cep text,
  ponto_referencia text,
  tipo_telefone_1 text,
  telefone_1 text,
  tipo_telefone_2 text,
  telefone_2 text,
  tipo_telefone_3 text,
  telefone_3 text,
  email_1 text,
  email_2 text,
  observacao text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.registros_nomeacao (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  servidor_id uuid NOT NULL REFERENCES public.servidores(id) ON DELETE CASCADE,
  tipo text NOT NULL DEFAULT 'NOMEACAO',
  dom text,
  portaria text,
  cargo_funcao text,
  fg_das text,
  a_partir_de date,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.ferias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  servidor_id uuid NOT NULL REFERENCES public.servidores(id) ON DELETE CASCADE,
  processo_sei text,
  periodo_aquisitivo text,
  periodo_fruicao text,
  data_inicial date,
  data_final date,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.atestados (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  servidor_id uuid NOT NULL REFERENCES public.servidores(id) ON DELETE CASCADE,
  processo_sei text,
  periodo_vigencia text,
  periodo_licenca text,
  data_inicial date,
  data_final date,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.licencas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  servidor_id uuid NOT NULL REFERENCES public.servidores(id) ON DELETE CASCADE,
  processo_sei text,
  tipo_licenca text,
  periodo_licenca text,
  data_inicial date,
  data_final date,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.servidores TO authenticated;
GRANT ALL ON public.servidores TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.registros_nomeacao TO authenticated;
GRANT ALL ON public.registros_nomeacao TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ferias TO authenticated;
GRANT ALL ON public.ferias TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.atestados TO authenticated;
GRANT ALL ON public.atestados TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.licencas TO authenticated;
GRANT ALL ON public.licencas TO service_role;

ALTER TABLE public.servidores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registros_nomeacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ferias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.atestados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licencas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "servidores_all" ON public.servidores FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "registros_nomeacao_all" ON public.registros_nomeacao FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "ferias_all" ON public.ferias FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "atestados_all" ON public.atestados FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "licencas_all" ON public.licencas FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_servidores_updated_at BEFORE UPDATE ON public.servidores
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
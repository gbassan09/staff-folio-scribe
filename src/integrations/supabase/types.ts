export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      atestados: {
        Row: {
          created_at: string
          data_final: string | null
          data_inicial: string | null
          id: string
          periodo_licenca: string | null
          periodo_vigencia: string | null
          processo_sei: string | null
          servidor_id: string
        }
        Insert: {
          created_at?: string
          data_final?: string | null
          data_inicial?: string | null
          id?: string
          periodo_licenca?: string | null
          periodo_vigencia?: string | null
          processo_sei?: string | null
          servidor_id: string
        }
        Update: {
          created_at?: string
          data_final?: string | null
          data_inicial?: string | null
          id?: string
          periodo_licenca?: string | null
          periodo_vigencia?: string | null
          processo_sei?: string | null
          servidor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "atestados_servidor_id_fkey"
            columns: ["servidor_id"]
            isOneToOne: false
            referencedRelation: "servidores"
            referencedColumns: ["id"]
          },
        ]
      }
      ferias: {
        Row: {
          created_at: string
          data_final: string | null
          data_inicial: string | null
          id: string
          periodo_aquisitivo: string | null
          periodo_fruicao: string | null
          processo_sei: string | null
          servidor_id: string
        }
        Insert: {
          created_at?: string
          data_final?: string | null
          data_inicial?: string | null
          id?: string
          periodo_aquisitivo?: string | null
          periodo_fruicao?: string | null
          processo_sei?: string | null
          servidor_id: string
        }
        Update: {
          created_at?: string
          data_final?: string | null
          data_inicial?: string | null
          id?: string
          periodo_aquisitivo?: string | null
          periodo_fruicao?: string | null
          processo_sei?: string | null
          servidor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ferias_servidor_id_fkey"
            columns: ["servidor_id"]
            isOneToOne: false
            referencedRelation: "servidores"
            referencedColumns: ["id"]
          },
        ]
      }
      licencas: {
        Row: {
          created_at: string
          data_final: string | null
          data_inicial: string | null
          id: string
          periodo_licenca: string | null
          processo_sei: string | null
          servidor_id: string
          tipo_licenca: string | null
        }
        Insert: {
          created_at?: string
          data_final?: string | null
          data_inicial?: string | null
          id?: string
          periodo_licenca?: string | null
          processo_sei?: string | null
          servidor_id: string
          tipo_licenca?: string | null
        }
        Update: {
          created_at?: string
          data_final?: string | null
          data_inicial?: string | null
          id?: string
          periodo_licenca?: string | null
          processo_sei?: string | null
          servidor_id?: string
          tipo_licenca?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "licencas_servidor_id_fkey"
            columns: ["servidor_id"]
            isOneToOne: false
            referencedRelation: "servidores"
            referencedColumns: ["id"]
          },
        ]
      }
      registros_nomeacao: {
        Row: {
          a_partir_de: string | null
          cargo_funcao: string | null
          created_at: string
          dom: string | null
          fg_das: string | null
          id: string
          portaria: string | null
          servidor_id: string
          tipo: string
        }
        Insert: {
          a_partir_de?: string | null
          cargo_funcao?: string | null
          created_at?: string
          dom?: string | null
          fg_das?: string | null
          id?: string
          portaria?: string | null
          servidor_id: string
          tipo?: string
        }
        Update: {
          a_partir_de?: string | null
          cargo_funcao?: string | null
          created_at?: string
          dom?: string | null
          fg_das?: string | null
          id?: string
          portaria?: string | null
          servidor_id?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "registros_nomeacao_servidor_id_fkey"
            columns: ["servidor_id"]
            isOneToOne: false
            referencedRelation: "servidores"
            referencedColumns: ["id"]
          },
        ]
      }
      servidores: {
        Row: {
          bairro: string | null
          cargo: string | null
          carteira_expedicao: string | null
          carteira_serie: string | null
          carteira_trabalho: string | null
          carteira_uf: string | null
          cep: string | null
          complemento: string | null
          cpf: string | null
          created_at: string
          created_by: string | null
          data_admissao: string | null
          data_nascimento: string | null
          deficiencia: string | null
          departamento: string | null
          email_1: string | null
          email_2: string | null
          endereco: string | null
          equipamento: string | null
          estado: string | null
          fg_das: string | null
          foto_url: string | null
          funcao: string | null
          grau_instrucao: string | null
          id: string
          identidade: string | null
          identidade_expedicao: string | null
          identidade_orgao: string | null
          identidade_uf: string | null
          matricula: string | null
          nacionalidade: string | null
          naturalidade: string | null
          nome: string
          nome_mae: string | null
          nome_pai: string | null
          nome_social: string | null
          numero: string | null
          observacao: string | null
          ponto_referencia: string | null
          raca_cor: string | null
          secretaria_atual: string | null
          secretaria_origem: string | null
          sexo: string | null
          status: string | null
          telefone_1: string | null
          telefone_2: string | null
          telefone_3: string | null
          tipo_formacao: string | null
          tipo_sanguineo: string | null
          tipo_telefone_1: string | null
          tipo_telefone_2: string | null
          tipo_telefone_3: string | null
          titulo_eleitor: string | null
          titulo_expedicao: string | null
          titulo_secao: string | null
          titulo_uf: string | null
          titulo_zona: string | null
          uf: string | null
          updated_at: string
          vinculo_empregaticio: string | null
        }
        Insert: {
          bairro?: string | null
          cargo?: string | null
          carteira_expedicao?: string | null
          carteira_serie?: string | null
          carteira_trabalho?: string | null
          carteira_uf?: string | null
          cep?: string | null
          complemento?: string | null
          cpf?: string | null
          created_at?: string
          created_by?: string | null
          data_admissao?: string | null
          data_nascimento?: string | null
          deficiencia?: string | null
          departamento?: string | null
          email_1?: string | null
          email_2?: string | null
          endereco?: string | null
          equipamento?: string | null
          estado?: string | null
          fg_das?: string | null
          foto_url?: string | null
          funcao?: string | null
          grau_instrucao?: string | null
          id?: string
          identidade?: string | null
          identidade_expedicao?: string | null
          identidade_orgao?: string | null
          identidade_uf?: string | null
          matricula?: string | null
          nacionalidade?: string | null
          naturalidade?: string | null
          nome: string
          nome_mae?: string | null
          nome_pai?: string | null
          nome_social?: string | null
          numero?: string | null
          observacao?: string | null
          ponto_referencia?: string | null
          raca_cor?: string | null
          secretaria_atual?: string | null
          secretaria_origem?: string | null
          sexo?: string | null
          status?: string | null
          telefone_1?: string | null
          telefone_2?: string | null
          telefone_3?: string | null
          tipo_formacao?: string | null
          tipo_sanguineo?: string | null
          tipo_telefone_1?: string | null
          tipo_telefone_2?: string | null
          tipo_telefone_3?: string | null
          titulo_eleitor?: string | null
          titulo_expedicao?: string | null
          titulo_secao?: string | null
          titulo_uf?: string | null
          titulo_zona?: string | null
          uf?: string | null
          updated_at?: string
          vinculo_empregaticio?: string | null
        }
        Update: {
          bairro?: string | null
          cargo?: string | null
          carteira_expedicao?: string | null
          carteira_serie?: string | null
          carteira_trabalho?: string | null
          carteira_uf?: string | null
          cep?: string | null
          complemento?: string | null
          cpf?: string | null
          created_at?: string
          created_by?: string | null
          data_admissao?: string | null
          data_nascimento?: string | null
          deficiencia?: string | null
          departamento?: string | null
          email_1?: string | null
          email_2?: string | null
          endereco?: string | null
          equipamento?: string | null
          estado?: string | null
          fg_das?: string | null
          foto_url?: string | null
          funcao?: string | null
          grau_instrucao?: string | null
          id?: string
          identidade?: string | null
          identidade_expedicao?: string | null
          identidade_orgao?: string | null
          identidade_uf?: string | null
          matricula?: string | null
          nacionalidade?: string | null
          naturalidade?: string | null
          nome?: string
          nome_mae?: string | null
          nome_pai?: string | null
          nome_social?: string | null
          numero?: string | null
          observacao?: string | null
          ponto_referencia?: string | null
          raca_cor?: string | null
          secretaria_atual?: string | null
          secretaria_origem?: string | null
          sexo?: string | null
          status?: string | null
          telefone_1?: string | null
          telefone_2?: string | null
          telefone_3?: string | null
          tipo_formacao?: string | null
          tipo_sanguineo?: string | null
          tipo_telefone_1?: string | null
          tipo_telefone_2?: string | null
          tipo_telefone_3?: string | null
          titulo_eleitor?: string | null
          titulo_expedicao?: string | null
          titulo_secao?: string | null
          titulo_uf?: string | null
          titulo_zona?: string | null
          uf?: string | null
          updated_at?: string
          vinculo_empregaticio?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

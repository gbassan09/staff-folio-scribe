import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type ServidorRow = Record<string, any>;

export const SUB_TABLES = ["registros_nomeacao", "ferias", "atestados", "licencas"] as const;
export type SubTable = (typeof SUB_TABLES)[number];

export function useServidores(search: string) {
  return useQuery({
    queryKey: ["servidores", search],
    queryFn: async () => {
      let query = supabase.from("servidores").select("*").order("nome", { ascending: true });
      if (search.trim()) {
        query = query.or(`nome.ilike.%${search}%,matricula.ilike.%${search}%,cpf.ilike.%${search}%`);
      }
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as ServidorRow[];
    },
  });
}

export function useServidor(id: string) {
  return useQuery({
    queryKey: ["servidor", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("servidores").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data as ServidorRow | null;
    },
  });
}

export function useUpdateServidor(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: ServidorRow) => {
      const { error } = await (supabase.from("servidores") as any).update(values).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["servidor", id] });
      qc.invalidateQueries({ queryKey: ["servidores"] });
    },
  });
}

export function useSubRecords(table: SubTable, servidorId: string) {
  return useQuery({
    queryKey: [table, servidorId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("servidor_id", servidorId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as ServidorRow[];
    },
  });
}

export function useSaveSubRecord(table: SubTable, servidorId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, values }: { id?: string; values: ServidorRow }) => {
      if (id) {
        const { error } = await (supabase.from(table) as any).update(values).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await (supabase.from(table) as any).insert({
          ...values,
          servidor_id: servidorId,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [table, servidorId] }),
  });
}

export function useDeleteSubRecord(table: SubTable, servidorId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [table, servidorId] }),
  });
}

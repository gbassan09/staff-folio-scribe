import { Link, useNavigate } from "@tanstack/react-router";
import { FolderArchive, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function AppHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <FolderArchive className="size-5 text-primary" />
          Arquivo Funcional
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:inline">{user?.email}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
          >
            <LogOut className="size-4" /> Sair
          </Button>
        </div>
      </div>
    </header>
  );
}

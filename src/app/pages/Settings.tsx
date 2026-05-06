import { useMemo, useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ActionButton, GlassPanel, PageHeader, SectionTitle, cn } from "../components/ui";
import { defaultMetaConfig, useMetaConfig } from "../data/metaConfig";

export function SettingsPage() {
  const [metaConfig, setMetaConfig] = useMetaConfig();
  const [pageId, setPageId] = useState(metaConfig.pageId);
  const [instagramUserId, setInstagramUserId] = useState(metaConfig.instagramUserId);

  const hasMetaConfig = useMemo(
    () => Boolean(metaConfig.pageId.trim() || metaConfig.instagramUserId.trim()),
    [metaConfig.pageId, metaConfig.instagramUserId],
  );

  const saveMetaConfig = () => {
    setMetaConfig({
      pageId: pageId.trim(),
      instagramUserId: instagramUserId.trim(),
    });
    toast.success("Configuração da Meta salva.");
  };

  const clearMetaConfig = () => {
    setPageId("");
    setInstagramUserId("");
    setMetaConfig(defaultMetaConfig);
    toast.success("Configuração da Meta removida.");
  };

  return (
    <div className="space-y-6 p-2 sm:p-4">
      <PageHeader
        eyebrow="CONFIGURAÇÕES"
        title="Preferências da conta"
        description="Centralize ajustes básicos e também a configuração da Meta usada pelos insights."
      />

      <GlassPanel className="space-y-4 p-6">
        <SectionTitle
          title="Ajustes básicos"
          description="Espaço reservado para idioma, tema, notificações e outras preferências simples."
        />
        <p className="text-sm leading-6 text-muted-foreground">
          Essa área continua disponível para crescimento futuro sem mexer no fluxo principal do app.
        </p>
      </GlassPanel>

      <GlassPanel className="space-y-6 p-6">
        <SectionTitle
          title="Meta Insights"
          description="Se o token enxergar mais de uma Página ou conta, fixe aqui os IDs corretos para a consulta não depender só da descoberta automática."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">META_IG_PAGE_ID</span>
            <input
              value={pageId}
              onChange={(event) => setPageId(event.target.value)}
              placeholder="ID da Página do Facebook"
              className="h-12 w-full rounded-2xl border border-border/70 bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">META_IG_USER_ID</span>
            <input
              value={instagramUserId}
              onChange={(event) => setInstagramUserId(event.target.value)}
              placeholder="ID da conta profissional do Instagram"
              className="h-12 w-full rounded-2xl border border-border/70 bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary"
            />
          </label>
        </div>

        <div className="rounded-[24px] border border-border/60 bg-muted/35 p-4 text-sm leading-6 text-muted-foreground">
          <p>
            Esses campos não são segredos. Eles só ajudam o app a apontar para a Página ou conta certa quando o token
            sozinho não for suficiente.
          </p>
          <p className="mt-2">
            Se você não souber os IDs agora, pode deixar em branco. A descoberta automática continua tentando
            encontrar a Página vinculada ao token.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <ActionButton onClick={saveMetaConfig}>
            <Save className="h-4 w-4" />
            Salvar
          </ActionButton>
          <button
            type="button"
            onClick={clearMetaConfig}
            disabled={!hasMetaConfig}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition",
              hasMetaConfig
                ? "bg-muted text-foreground hover:bg-muted/80"
                : "cursor-not-allowed bg-muted/50 text-muted-foreground",
            )}
          >
            <Trash2 className="h-4 w-4" />
            Limpar
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}

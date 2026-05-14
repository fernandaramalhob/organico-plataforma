# Checklist de Usabilidade

Use este checklist para validar o sistema inteiro antes de entrar em uso real.

## 1. Entrada no sistema
- [x] O login abre sem erros.
- [x] Usuário e senha funcionam na primeira tentativa.
- [x] Mensagem de erro aparece quando o login falha.
- [x] Após entrar, o sistema cai na tela correta.
- [x] Ao recarregar a página, a sessão continua logada.
- [x] Ao sair, o acesso é bloqueado novamente.
- [x] Fluxo validado com build do projeto e testes dos helpers de autenticação em 11/05/2026.

## 2. Navegação geral
- [x] A sidebar mostra claramente onde estou.
- [x] Cada item do menu leva para a página certa.
- [x] Dashboard, Meta Insights, Calendário, Metas, Equipe, Histórico e Relatórios têm funções diferentes e compreensíveis.
- [x] Não existe duplicidade confusa entre páginas parecidas.
- [x] No mobile, o menu abre e fecha sem travar.
- [x] O botão de tema funciona em qualquer página.
- [x] O topo da página não atrapalha a leitura do conteúdo.
- [x] Fluxo validado em 11/05/2026 com login, navegação entre rotas, tema, menu mobile e checagem de layout.

## 3. Dashboard
- [x] Entendo o dashboard em menos de 10 segundos.
- [x] As métricas principais aparecem primeiro.
- [x] Está claro o período que os números representam.
- [x] Fica claro o que subiu, o que caiu e o que ficou estável.
- [x] Cards vazios ou sem dado explicam o motivo.
- [x] Ao clicar em um número ou card, sei para onde ele me leva.
- [x] Fluxo validado em 11/05/2026 com build do projeto e navegação real dos cards.

## 4. Meta Insights
- [ ] A página parece leitura de dados reais, não repetição do dashboard.
- [ ] Os gráficos carregam sem quebrar layout.
- [ ] Os filtros ficam claros.
- [ ] O período selecionado é fácil de entender.
- [ ] O conteúdo da audiência está legível.
- [ ] Estados sem dados explicam o que falta.
- [ ] Não há confusão entre insights e metas.

## 5. Calendário
- [x] Consigo ver rapidamente minhas tarefas do dia.
- [x] Consigo alternar entre Meu e Todos.
- [x] Consigo escolher quais agendas aparecem.
- [x] O horário de cada tarefa é fácil de ver.
- [x] Abrir uma tarefa mostra tudo que preciso.
- [x] O checklist da tarefa fica claro.
- [x] Marcar um item do checklist é simples.
- [x] O sistema entende que checklist concluído significa tarefa concluída.
- [x] Ao salvar uma tarefa, ela aparece no lugar certo.
- [x] Ao duplicar, editar ou apagar, o resultado é previsível.
- [x] O modal não parece exageradamente pesado.
- [x] O fundo do modal e o backdrop ajudam a focar.
- [x] A rolagem funciona sem barra feia visível.
- [x] No modo escuro, a tela continua legível.

## 6. Equipe
- [x] A página de equipe mostra o time como time, não como perfil fixo.
- [x] Consigo entender o que cada pessoa está fazendo.
- [x] Consigo ver o checklist diário por pessoa.
- [x] Consigo enxergar horário ao lado das tarefas.
- [x] Fica claro o que foi concluído e o que falta.
- [x] A visão do time não repete o calendário sem contexto.
- [x] O agrupamento por dia é fácil de seguir.
- [x] Não existe dúvida entre Equipe e Perfil individual.
- [x] Fluxo validado em 11/05/2026 com a página de equipe, perfil individual, progresso por pessoa e agenda semanal com hora visível.

## 7. Perfil individual
- [x] Consigo abrir o perfil de uma pessoa sem me perder.
- [x] O checklist diário da pessoa está legível.
- [x] A relação entre tarefa, horário e progresso está clara.
- [x] Fica óbvio o que alimenta métricas e histórico.
- [x] O perfil individual ajuda a acompanhar execução.
- [x] O resumo da pessoa não confunde com o dashboard geral.
- [x] Fluxo validado em 11/05/2026 com os perfis de Brenda e Thiago, checklist diário, métricas e progresso por tarefa.

## 8. Metas
- [x] Entendo o que é meta ativa e meta concluída.
- [x] A relação entre meta, checklist e resultado está clara.
- [x] Consigo ver responsáveis.
- [x] Consigo ver prazo.
- [x] O progresso da meta é fácil de interpretar.
- [x] Metas encerradas não poluem a visão atual.
- [x] Apagar ou editar meta exige confirmação clara.
- [x] O sistema não mistura metas com tarefas do calendário.
- [x] Fluxo validado em 11/05/2026 com metas individuais e em grupo, progresso, responsáveis, prazo, checklist e confirmação de exclusão.

## 9. Stories
- [x] Consigo cadastrar e editar um story rápido.
- [x] Consigo saber o status do story.
- [x] A lista é fácil de escanear.
- [x] Não preciso abrir várias telas para entender o básico.
- [x] Estados vazios têm orientação útil.
- [x] Fluxo validado em 11/05/2026 com cadastro, edição, status explícito, lista escaneável e estado vazio orientado.

## 10. Ideias
- [x] É fácil registrar uma ideia sem atrito.
- [x] A ideia fica legível depois de salvar.
- [x] Consigo distinguir ideia bruta de ideia pronta.
- [x] Consigo mover ideia para execução sem retrabalho.
- [x] Filtros funcionam sem confusão.
- [x] Apagar ideia pede confirmação.
- [x] Fluxo validado em 11/05/2026 com criação, edição de status, filtro por situação e exclusão com confirmação.

## 11. Histórico
- [x] O histórico mostra o que realmente aconteceu.
- [x] Consigo filtrar por pessoa.
- [x] Consigo filtrar por tipo de evento.
- [x] Consigo filtrar por período.
- [x] Tarefas concluídas aparecem com clareza.
- [x] Eventos importantes são fáceis de localizar.
- [x] Não existe ruído demais na lista.
- [x] O histórico serve como auditoria confiável.
- [x] Fluxo validado em 11/05/2026 com filtros por pessoa, tipo e período, além das visões Timeline e Tabela.

## 12. Relatórios
- [x] Consigo abrir a pré-visualização do relatório.
- [x] Entendo a diferença entre Relatórios e Pré-visualização.
- [x] O filtro de período está claro.
- [x] O que entra no PDF é fácil de ligar e desligar.
- [x] Consigo adicionar texto manual.
- [x] Consigo adicionar feedback manual.
- [x] Consigo adicionar várias imagens.
- [x] Consigo adicionar URLs.
- [x] Consigo mover blocos de lugar.
- [x] Consigo apagar blocos.
- [x] Consigo ver a diferença entre página, seção e bloco.
- [x] O PDF exportado parece igual ao preview.
- [x] O cabeçalho e o rodapé ajudam a navegar.
- [x] O número da página aparece corretamente.
- [x] A data de geração aparece corretamente.
- [x] No modo escuro, a pré-visualização fica confortável de ler.
- [x] O fundo escuro não atrapalha o documento.
- [x] Não há repetição desnecessária de filtros entre telas.
- [x] Fluxo validado em 11/05/2026 com preview, filtros da tela principal, blocos manuais, reordenação, exclusão, PDF e modo escuro.
- [ ] Toast de sucesso é curto e claro.
- [ ] Toast de erro diz o que fazer.
- [ ] Não há telas em branco confusas.

## 13. Perfil e configurações
- [x] Consigo abrir meu perfil sem confusão.
- [x] A foto, nome e função fazem sentido.
- [x] As configurações são simples de entender.
- [x] É claro o que muda quando eu salvo.
- [x] Trocar tema funciona.
- [x] Preferências pessoais não se misturam com preferências globais.
- [x] Fluxo validado em 11/05/2026 com edição do perfil, persistência após reload, salvamento separado das configurações globais e troca de tema no topo.

## 14. Detalhe de post
- [x] Ao abrir um post, entendo o contexto.
- [x] Consigo voltar sem perder a referência.
- [x] O detalhe mostra o essencial sem excesso.
- [x] Se o post não existe, a mensagem é clara.
- [x] Fluxo validado em 11/05/2026 com abertura de post real pelo dashboard, retorno para a lista e estado de post inexistente com mensagem e saída clara.

## 16. Modo escuro
- [ ] O contraste continua bom em todas as páginas.
- [ ] Cards não ficam pesados demais.
- [ ] Texto secundário ainda é legível.
- [ ] Modais e previews não ficam cinza demais.
- [ ] O fundo do relatório no preview fica realmente preto.
- [ ] Botões destrutivos continuam visíveis.
- [ ] Ícones não somem no escuro.

## 17. Modo claro
- [ ] O layout não fica branco demais a ponto de cansar.
- [ ] O destaque vermelho continua claro.
- [ ] Botões de ação são fáceis de distinguir.
- [ ] Componentes destrutivos, como lixeira, ficam visíveis com fundo branco.

## 18. Responsividade
- [ ] A tela funciona em notebook.
- [ ] A tela funciona em monitor grande.
- [ ] A tela funciona em celular.
- [ ] O menu lateral não quebra no mobile.
- [ ] Modais cabem na altura da tela.
- [ ] Gráficos e tabelas não estouram a largura.
- [ ] O calendário continua navegável em telas menores.

## 19. Fluxos críticos
- [ ] Criar tarefa no calendário.
- [ ] Marcar checklist da tarefa.
- [ ] Confirmar que isso reflete no histórico.
- [ ] Confirmar que isso reflete no perfil individual.
- [ ] Confirmar que isso alimenta métricas do dashboard.
- [ ] Criar meta e acompanhar progresso.
- [ ] Registrar ideia e mover para execução.
- [ ] Montar relatório e exportar PDF.
- [ ] Conferir se o PDF bate com a pré-visualização.
- [ ] Abrir tudo em dark mode e validar legibilidade.

## 20. Sinais de alerta
- [ ] Eu preciso pensar demais para saber onde clicar.
- [ ] A mesma informação aparece em duas telas com nomes diferentes.
- [ ] Eu não sei se algo foi salvo.
- [ ] O sistema me obriga a repetir filtros.
- [ ] O PDF exportado não parece o preview.
- [ ] O calendário parece uma lista solta, não uma operação.
- [ ] A equipe parece um perfil isolado, não uma visão de time.
- [ ] O dashboard mostra número, mas não conta a história.

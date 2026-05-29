import { authStorageKey } from "../../src/app/auth";
import { createStorageKey } from "../../src/app/data/sharedState";

describe("Relatórios", () => {
  function formatDateKey(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  it("salva relatório, exporta CSV/imagem/PDF e alterna os filtros de período", () => {
    const reportsHistoryKey = createStorageKey("reports-history");
    const startKey = formatDateKey(new Date("2026-04-10T12:00:00"));
    const endKey = formatDateKey(new Date("2026-04-20T12:00:00"));

    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.clear();
        win.localStorage.setItem(authStorageKey, "true");
        win.localStorage.removeItem(reportsHistoryKey);
      },
    });

    cy.get('a[href="/reports"]').click();

    cy.window().then((win) => {
      cy.stub(win.URL, "createObjectURL").returns("blob:mock-url");
      cy.stub(win.HTMLAnchorElement.prototype, "click").as("anchorClick");
      cy.stub(win, "print").as("printWindow");
    });

    cy.url().should("include", "/reports");

    cy.get('[data-cy="reports-save"]').click();
    cy.contains("Relatório salvo no histórico.").should("be.visible");
    cy.get('[data-cy="reports-history-restore"]').should("be.visible");

    cy.window().then((win) => {
      const stored = win.localStorage.getItem(reportsHistoryKey);
      expect(stored).to.not.equal(null);

      const reports = JSON.parse(stored ?? "[]") as Array<{ label: string }>;
      expect(reports).to.have.length(1);
      expect(reports[0].label).to.contain("Relatório");
    });

    cy.get('[data-cy="reports-export-csv"]').click();
    cy.get("@anchorClick").should("have.callCount", 1);

    cy.get('[data-cy="reports-export-image"]').click();
    cy.get("@anchorClick").should("have.callCount", 2);

    cy.get('[data-cy="reports-export-pdf"]').click();
    cy.get("@printWindow").should("have.been.calledOnce");

    cy.get('[data-cy="reports-period-7"]').click();
    cy.get('[data-cy="reports-period-7"]').should("have.attr", "aria-pressed", "true");
    cy.get('[data-cy="reports-period-30"]').should("have.attr", "aria-pressed", "false");

    cy.get('[data-cy="reports-period-30"]').click();
    cy.get('[data-cy="reports-period-30"]').should("have.attr", "aria-pressed", "true");
    cy.get('[data-cy="reports-period-7"]').should("have.attr", "aria-pressed", "false");

    cy.get('[data-cy="reports-period-custom"]').click();
    cy.get('[data-cy="reports-period-custom"]').should("have.attr", "aria-pressed", "true");
    cy.get('[data-cy="reports-custom-mode-range"]').click();
    cy.get('[data-cy="reports-custom-range-trigger"]').click();
    cy.get(`[data-cy="reports-custom-range-day-${startKey}"]`).click();
    cy.get(`[data-cy="reports-custom-range-day-${endKey}"]`).click();
    cy.get('[data-cy="reports-custom-range-trigger"]').should("contain.text", "10").and("contain.text", "20");

    cy.get('[data-cy="reports-filter-type-trigger"]').click();
    cy.get('[data-cy="reports-filter-type-option-Reels"]').click();
    cy.get('[data-cy="reports-filter-type-trigger"]').should("contain.text", "Reels");

    cy.get('[data-cy="reports-filter-responsible-trigger"]').click();
    cy.get('[data-cy="reports-filter-responsible-option-1"]').click();
    cy.get('[data-cy="reports-filter-responsible-trigger"]').should("contain.text", "Brenda");

    cy.get('[data-cy="reports-filter-type-trigger"]').click();
    cy.get('[data-cy="reports-filter-type-option-todos"]').click();
    cy.get('[data-cy="reports-filter-responsible-trigger"]').click();
    cy.get('[data-cy="reports-filter-responsible-option-todos"]').click();
  });
});

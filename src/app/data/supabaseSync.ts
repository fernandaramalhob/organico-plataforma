import { useEffect, useMemo, useRef, useState } from "react";
import { useAuthSession } from "../auth";
import { readLocalJson, subscribeLocalKey, writeLocalJson } from "./localStore";

type RowEnvelope<T> = {
  id: number;
  sort_order: number;
  data: T;
};

function normalizeId(value: unknown) {
  const parsed = typeof value === "string" ? Number(value) : typeof value === "number" ? value : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function toRowEnvelope<T extends { id: number }>(item: T, sortOrder: number): RowEnvelope<T> {
  return {
    id: item.id,
    sort_order: sortOrder,
    data: item,
  };
}

export function useSupabaseSyncedListState<T extends { id: number }>(options: {
  key: string;
  table: string;
  fallback: T[];
}) {
  const { session } = useAuthSession();
  const storageKey = useMemo(
    () => `great-organico:list:${session?.user.id ?? "guest"}:${options.table}`,
    [options.table, session?.user.id],
  );
  const [value, setValue] = useState<T[]>(options.fallback);
  const [hydrated, setHydrated] = useState(false);
  const hydratedRef = useRef(false);
  const lastSnapshotRef = useRef<string | null>(null);

  useEffect(() => {
    const loadedRows = readLocalJson<RowEnvelope<T>[]>(storageKey, options.fallback.map((item, index) => toRowEnvelope(item, index)));
    const loadedItems = loadedRows
      .map((row) => row.data)
      .filter((item): item is T => Boolean(item) && normalizeId((item as { id?: unknown }).id) !== null);

    setValue(loadedItems.length > 0 ? loadedItems : options.fallback);
    lastSnapshotRef.current = snapshotOf(loadedItems.length > 0 ? loadedItems : options.fallback);
    hydratedRef.current = true;
    setHydrated(true);

    return subscribeLocalKey(storageKey, () => {
      const nextRows = readLocalJson<RowEnvelope<T>[]>(storageKey, options.fallback.map((item, index) => toRowEnvelope(item, index)));
      const nextItems = nextRows
        .map((row) => row.data)
        .filter((item): item is T => Boolean(item) && normalizeId((item as { id?: unknown }).id) !== null);
      setValue(nextItems.length > 0 ? nextItems : options.fallback);
      lastSnapshotRef.current = snapshotOf(nextItems.length > 0 ? nextItems : options.fallback);
    });
  }, [options.fallback, storageKey]);

  useEffect(() => {
    if (!hydratedRef.current) {
      return;
    }

    const snapshot = snapshotOf(value);
    if (snapshot === lastSnapshotRef.current) {
      return;
    }

    const rows = value.map((item, index) => toRowEnvelope(item, index));
    writeLocalJson(storageKey, rows);
    lastSnapshotRef.current = snapshot;
  }, [storageKey, value]);

  return [value, setValue, hydrated] as const;
}

function snapshotOf<T>(value: T) {
  return JSON.stringify(value);
}

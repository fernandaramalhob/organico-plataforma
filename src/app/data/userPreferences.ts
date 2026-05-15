import { useEffect, useMemo, useRef, useState } from "react";
import { useAuthSession } from "../auth";
import { readLocalJson, subscribeLocalKey, writeLocalJson } from "./localStore";

function snapshotOf<T>(value: T) {
  return JSON.stringify(value);
}

export function useSupabasePreference<T>(key: string, fallback: T) {
  const { session, ready: authReady } = useAuthSession();
  const [value, setValue] = useState<T>(fallback);
  const [ready, setReady] = useState(false);
  const lastSavedSnapshotRef = useRef<string | null>(null);
  const storageKey = useMemo(() => `great-organico:pref:${session?.user.id ?? "guest"}:${key}`, [key, session?.user.id]);

  useEffect(() => {
    if (!authReady) {
      return;
    }

    const loadedValue = readLocalJson<T>(storageKey, fallback);
    setValue(loadedValue);
    lastSavedSnapshotRef.current = snapshotOf(loadedValue);
    setReady(true);

    return subscribeLocalKey(storageKey, () => {
      const nextValue = readLocalJson<T>(storageKey, fallback);
      setValue(nextValue);
      lastSavedSnapshotRef.current = snapshotOf(nextValue);
      setReady(true);
    });
  }, [authReady, fallback, storageKey]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    const nextSnapshot = snapshotOf(value);
    if (nextSnapshot === lastSavedSnapshotRef.current) {
      return;
    }

    writeLocalJson(storageKey, value);
    lastSavedSnapshotRef.current = nextSnapshot;
  }, [ready, storageKey, value]);

  return [value, setValue, ready] as const;
}

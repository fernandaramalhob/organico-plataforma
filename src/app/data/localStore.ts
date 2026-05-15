const LOCAL_STORAGE_EVENT = "great-organico:local-storage-change";

type LocalStorageChangeDetail = {
  key: string;
};

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readLocalJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeLocalJson<T>(key: string, value: T) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent<LocalStorageChangeDetail>(LOCAL_STORAGE_EVENT, { detail: { key } }));
}

export function readLocalText(key: string) {
  if (!canUseStorage()) {
    return null;
  }

  return window.localStorage.getItem(key);
}

export function writeLocalText(key: string, value: string | null) {
  if (!canUseStorage()) {
    return;
  }

  if (value === null) {
    window.localStorage.removeItem(key);
  } else {
    window.localStorage.setItem(key, value);
  }

  window.dispatchEvent(new CustomEvent<LocalStorageChangeDetail>(LOCAL_STORAGE_EVENT, { detail: { key } }));
}

export function subscribeLocalKey(key: string, onChange: () => void) {
  if (!canUseStorage()) {
    return () => {};
  }

  const handleCustomEvent = (event: Event) => {
    const detail = (event as CustomEvent<LocalStorageChangeDetail>).detail;
    if (detail?.key === key) {
      onChange();
    }
  };

  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === key) {
      onChange();
    }
  };

  window.addEventListener(LOCAL_STORAGE_EVENT, handleCustomEvent as EventListener);
  window.addEventListener("storage", handleStorageEvent);

  return () => {
    window.removeEventListener(LOCAL_STORAGE_EVENT, handleCustomEvent as EventListener);
    window.removeEventListener("storage", handleStorageEvent);
  };
}

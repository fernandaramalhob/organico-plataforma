import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "./data/supabase";
import { readLocalJson, subscribeLocalKey, writeLocalJson, writeLocalText } from "./data/localStore";

export type AuthState = {
  session: AuthSession | null;
  ready: boolean;
};

type AuthSession = Session | LocalSession;

type DemoAccount = {
  email: string;
  id: string;
  name: string;
  password: string;
};

type LocalSession = {
  access_token: string;
  expires_at: number;
  expires_in: number;
  provider_refresh_token: null;
  provider_token: null;
  refresh_token: string;
  token_type: "bearer";
  user: {
    app_metadata: {
      provider: "local";
      providers: string[];
    };
    aud: "authenticated";
    created_at: string;
    email: string;
    email_confirmed_at: string;
    id: string;
    identities: never[];
    last_sign_in_at: string;
    phone: "";
    role: "authenticated";
    updated_at: string;
    user_metadata: {
      name: string;
    };
  };
};

const SESSION_KEY = "great-organico:auth-session";
const PASSWORDS_KEY = "great-organico:demo-passwords";

const demoAccounts: DemoAccount[] = [
  {
    email: "brendarayssa2706@gmail.com",
    id: "4b8a4d0f-6f9e-4c3d-9a1d-2e1f4d58d101",
    name: "Brenda",
    password: "Great2026!",
  },
  {
    email: "hannahleticia13@gmail.com",
    id: "2c1b7d5f-88a4-4b7b-8cb5-7d8a6f5c2b02",
    name: "Hannah",
    password: "Great2026!",
  },
  {
    email: "thiagomarquesdev23@hotmail.com",
    id: "7d8a2c11-0f4e-4e7b-b0a9-3f9d77a1c303",
    name: "Thiago",
    password: "Great2026!",
  },
];

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getDemoAccount(email: string) {
  return demoAccounts.find((account) => account.email === normalizeEmail(email)) ?? null;
}

function readPasswordMap() {
  return readLocalJson<Record<string, string>>(PASSWORDS_KEY, {
    "brendarayssa2706@gmail.com": "Great2026!",
    "hannahleticia13@gmail.com": "Great2026!",
    "thiagomarquesdev23@hotmail.com": "Great2026!",
  });
}

function writePasswordMap(map: Record<string, string>) {
  writeLocalJson(PASSWORDS_KEY, map);
}

function getStoredPassword(email: string) {
  return readPasswordMap()[normalizeEmail(email)] ?? null;
}

function createSession(account: DemoAccount): LocalSession {
  const timestamp = new Date().toISOString();

  return {
    access_token: `local-session:${account.id}`,
    expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365 * 10,
    expires_in: 60 * 60 * 24 * 365 * 10,
    provider_refresh_token: null,
    provider_token: null,
    refresh_token: `local-refresh:${account.id}`,
    token_type: "bearer",
    user: {
      app_metadata: {
        provider: "local",
        providers: ["local"],
      },
      aud: "authenticated",
      created_at: timestamp,
      email: account.email,
      email_confirmed_at: timestamp,
      id: account.id,
      identities: [],
      last_sign_in_at: timestamp,
      phone: "",
      role: "authenticated",
      updated_at: timestamp,
      user_metadata: {
        name: account.name,
      },
    },
  };
}

function saveSession(session: LocalSession | null) {
  if (session) {
    writeLocalJson(SESSION_KEY, session);
  } else {
    writeLocalText(SESSION_KEY, null);
  }
}

function readLocalSession() {
  const session = readLocalJson<LocalSession | null>(SESSION_KEY, null);
  if (!session) {
    return null;
  }

  const account = getDemoAccount(session.user.email);
  if (!account) {
    return null;
  }

  return createSession(account);
}

function getDemoAccountId(email: string) {
  return getDemoAccount(email)?.id ?? null;
}

export function isDemoSession(session: AuthSession | null | undefined) {
  return Boolean(session);
}

export function isDemoAccountEmail(email: string) {
  return getDemoAccount(email) !== null;
}

async function bootstrapSupabaseDemoAccount(email: string, password: string) {
  if (!supabase) {
    return;
  }

  const { error } = await supabase.rpc("bootstrap_demo_account", {
    demo_email: email,
    demo_password: password,
  });

  if (error) {
    throw error;
  }
}

export function useAuthSession() {
  const [state, setState] = useState<AuthState>({
    session: null,
    ready: false,
  });

  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      setState({ session: readLocalSession(), ready: true });

      return subscribeLocalKey(SESSION_KEY, () => {
        setState({ session: readLocalSession(), ready: true });
      });
    }

    let ignore = false;

    void supabase.auth.getSession().then(({ data, error }) => {
      if (ignore) {
        return;
      }

      if (error) {
        setState({ session: null, ready: true });
        return;
      }

      setState({ session: data.session ?? null, ready: true });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setState({ session: nextSession, ready: true });
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, []);

  return state;
}

export async function signInWithPassword(email: string, password: string) {
  const account = getDemoAccount(email);
  if (!account) {
    throw new Error("Conta indisponivel.");
  }

  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: account.email,
      password,
    });

    if (error || !data.session) {
      throw error ?? new Error("Nao foi possivel iniciar a sessao.");
    }

    return data.session;
  }

  const expectedPassword = getStoredPassword(account.email) ?? account.password;
  if (password !== expectedPassword) {
    throw new Error("Credenciais invalidas.");
  }

  const session = createSession(account);
  saveSession(session);
  return session;
}

export async function signInOrBootstrapDemoAccount(email: string, password: string) {
  const account = getDemoAccount(email);
  if (!account) {
    return signInWithPassword(email, password);
  }

  if (supabase) {
    try {
      return await signInWithPassword(account.email, password);
    } catch (error) {
      await bootstrapSupabaseDemoAccount(account.email, password);
      return signInWithPassword(account.email, password);
    }
  }

  const currentPasswords = readPasswordMap();
  if (!currentPasswords[account.email]) {
    currentPasswords[account.email] = account.password;
    writePasswordMap(currentPasswords);
  }

  return signInWithPassword(account.email, password);
}

export async function updateDemoAccountPassword(userId: string, nextPassword: string) {
  const account = demoAccounts.find((item) => item.id === userId);
  if (!account) {
    return;
  }

  if (supabase) {
    const { error } = await supabase.auth.updateUser({ password: nextPassword });
    if (error) {
      throw error;
    }
    return;
  }

  const currentPasswords = readPasswordMap();
  currentPasswords[account.email] = nextPassword;
  writePasswordMap(currentPasswords);

  const currentSession = readLocalSession();
  if (currentSession?.user.id === userId) {
    const refreshedSession = createSession(account);
    refreshedSession.user.last_sign_in_at = new Date().toISOString();
    refreshedSession.user.updated_at = new Date().toISOString();
    saveSession(refreshedSession);
  }
}

export async function signOut() {
  if (supabase) {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    return;
  }

  saveSession(null);
}

export function getDemoAccountUserId(email: string) {
  return getDemoAccountId(email);
}

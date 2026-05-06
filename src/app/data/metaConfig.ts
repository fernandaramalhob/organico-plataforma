import { createStorageKey, useSharedState } from "./sharedState";

export type MetaConfig = {
  pageId: string;
  instagramUserId: string;
};

export const defaultMetaConfig: MetaConfig = {
  pageId: "",
  instagramUserId: "",
};

const metaConfigStorageKey = createStorageKey("meta-config");

export function useMetaConfig() {
  return useSharedState<MetaConfig>(metaConfigStorageKey, defaultMetaConfig);
}

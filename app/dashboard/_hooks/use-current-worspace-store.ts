import { useAtom } from "jotai";
import {atomWithStorage, createJSONStorage} from "jotai/utils";

const currentWorkspaceAtom = atomWithStorage<string | null>(
  "current-workspace",
  null,
  createJSONStorage(() => localStorage),
  { getOnInit: true }
);

export function useCurrentWorkspaceStore() {
  return useAtom(currentWorkspaceAtom);
}

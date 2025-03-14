import {ServerState} from "@/lib/server-config";
import { match } from "ts-pattern";

type ServerInlineStatusProps = {
  status: ServerState;
};

export function ServerInlineStatus({ status }: ServerInlineStatusProps) {
  return match(status)
    .with("active", () => (
      <>
        <div className="relative flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"/>
          <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
        </div>
        <span className="hidden sm:flex text-sm text-muted-foreground">Active</span>
      </>
    ))
    .with("paused", () => (
      <>
        <div className="relative flex size-2.5">
          <span className="relative inline-flex size-2.5 rounded-full bg-amber-500" />
        </div>
        <span className="hidden sm:flex text-sm text-muted-foreground">Paused</span>
      </>
    ))
    .with("misconfigured", () => (
      <>
        <div className="relative flex size-2.5">
          <span className="relative inline-flex size-2.5 rounded-full bg-blue-500" />
        </div>
        <span className="hidden sm:flex text-sm text-muted-foreground">Needs Configuration</span>
      </>
    ))
    .with("not-started", () => null)
    .exhaustive();
}

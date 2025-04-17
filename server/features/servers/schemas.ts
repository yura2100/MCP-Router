import { z } from "zod";

export const StartServerSchema = z.object({
  serverId: z.string().uuid(),
  workspaceId: z.string().uuid(),
});

export type StartServerInput = z.infer<typeof StartServerSchema>;

export const RestartServerSchema = z.object({
  serverId: z.string().uuid(),
  workspaceId: z.string().uuid(),
});

export type RestartServerInput = z.infer<typeof RestartServerSchema>;

export const PauseServerSchema = z.object({
  serverId: z.string().uuid(),
  workspaceId: z.string().uuid(),
});

export type PauseServerInput = z.infer<typeof PauseServerSchema>;

export const StopServerSchema = z.object({
  serverId: z.string().uuid(),
  workspaceId: z.string().uuid(),
});

export type StopServerInput = z.infer<typeof StopServerSchema>;

export const UpdateServerSchema = z.object({
  serverId: z.string().uuid(),
  workspaceId: z.string().uuid(),
  config: z.object({ connection: z.object({}).passthrough() })
});

export type UpdateServerInput = z.infer<typeof UpdateServerSchema>;

export const ToggleStarSchema = z.object({
  serverId: z.string().uuid(),
});

export type ToggleStarInput = z.infer<typeof ToggleStarSchema>;

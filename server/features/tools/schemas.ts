import { z } from "zod";

export const ToggleToolSchema = z.object({
  toolId: z.string().uuid(),
  workspaceId: z.string().uuid(),
});

export type ToggleToolInput = z.infer<typeof ToggleToolSchema>;

export const UpdateToolsSchema = z.object({
  workspaceId: z.string().uuid(),
  tools: z.array(
    z.object({
      id: z.string().uuid(),
      status: z.enum(["active", "disabled"]),
      customName: z.string(),
      customDescription: z.string(),
    })
  ),
});

export type UpdateToolsInput = z.infer<typeof UpdateToolsSchema>;

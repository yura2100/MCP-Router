export async function updateWorker(slug: string, workspaceId: string, secrets: Record<string, string>) {
  const token = btoa(`${process.env.DEPLOYER_USERNAME}:${process.env.DEPLOYER_PASSWORD}`);
  const response = await fetch(`${process.env.DEPLOYER_URL}/update-secrets`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug, workspaceId, secrets }),
  });

  if (!response.ok) {
    throw new Error("Failed to update worker");
  }
}

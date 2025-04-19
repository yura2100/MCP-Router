export async function updateWorker(slug: string, workspaceId: string, secrets: Record<string, string>) {
  const response = await fetch(`${process.env.DEPLOYER_URL}/update-secrets`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.DEPLOYER_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug, workspaceId, secrets }),
  });

  if (!response.ok) {
    throw new Error("Failed to update worker");
  }
}

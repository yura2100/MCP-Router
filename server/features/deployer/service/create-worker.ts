export async function createWorker(slug: string, workspaceId: string) {
  const token = btoa(`${process.env.DEPLOYER_USERNAME}:${process.env.DEPLOYER_PASSWORD}`);
  const response = await fetch(`${process.env.DEPLOYER_URL}/create`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug, workspaceId }),
  });

  if (!response.ok) {
    throw new Error("Failed to create worker");
  }
}

export async function createWorker(slug: string, workspaceId: string) {
  const token = btoa(`${process.env.DEPLOYER_USERNAME}:${process.env.DEPLOYER_PASSWORD}`);
  const createResponse = await fetch(`${process.env.DEPLOYER_URL}/create`, {
    method: "POST",
    headers: { "Authorization": `Basic ${token}` },
    body: JSON.stringify({ slug, workspaceId }),
  });

  if (!createResponse.ok) {
    throw new Error("Failed to create worker");
  }
}

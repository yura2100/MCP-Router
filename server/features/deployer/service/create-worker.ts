export async function createWorker(slug: string, workspaceId: string) {
  const response = await fetch(`${process.env.DEPLOYER_URL}/create`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.DEPLOYER_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug, workspaceId }),
  });

  if (!response.ok) {
    throw new Error("Failed to create worker");
  }
}

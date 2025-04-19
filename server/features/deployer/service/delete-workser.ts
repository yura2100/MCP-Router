export async function deleteWorker(slug: string, workspaceId: string) {
  const response = await fetch(`${process.env.DEPLOYER_URL}/delete`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.DEPLOYER_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug, workspaceId }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete worker");
  }
}

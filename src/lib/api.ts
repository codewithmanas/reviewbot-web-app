export async function verifyEmail(token: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/verify-email?token=${token}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Verification failed");
  }

  return data;
}
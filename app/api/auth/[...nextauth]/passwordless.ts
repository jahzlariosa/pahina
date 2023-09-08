const strapiUrl = `https://${process.env.BACKEND_API_DOMAIN}`;

export async function passwordless({ code }:any) {
  const result = await fetch(`${strapiUrl}/api/passwordless/login?loginToken=${code}`);

  if (!result.ok) {
    const errorResponse = await result.json();
    throw new Error((errorResponse));
  }

  const data = await result.json();
  return data;
}

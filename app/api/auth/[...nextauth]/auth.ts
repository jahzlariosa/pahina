const strapiUrl = `https://${process.env.BACKEND_API_DOMAIN}`;

export async function signIn({ email, password }:any) {
  const res = await fetch(`${strapiUrl}/api/auth/local`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: email,
      password,
    }),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error((errorResponse));
  }

  const data = await res.json();
  return data;
}

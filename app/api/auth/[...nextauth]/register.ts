const strapiUrl = `https://${process.env.strapi_domain}`;

export async function Register(userData: any) {
    const { username, email, password } = userData;
    const response = await fetch(`${strapiUrl}/api/auth/local/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
    }

    const data = await response.json();
    return data;
}

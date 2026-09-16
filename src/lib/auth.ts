import { SignJWT, jwtVerify } from 'jose';

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET || 'fallback-secret-for-development-only';
  return new TextEncoder().encode(secret);
};

export async function signToken(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Secure 7-day token
    .sign(getJwtSecretKey());
}

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, getJwtSecretKey());
    return verified.payload;
  } catch (err) {
    return null;
  }
}

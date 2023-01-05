import { JWTPayload, jwtVerify, SignJWT } from 'jose';

export const createJoseAccessToken = async (id: string, idx: string | number): Promise<string> => {
  //시크릿키 생성
  const secret = new TextEncoder().encode(process.env.SECRET_TOKEN);
  //알고리즘 선택
  const alg = process.env.JWT_ALG as string;
  const jwt = await new SignJWT({ idx, id })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  return jwt;
};

export const createJoseRefreshToken = async (id: string, idx: string | number): Promise<string> => {
  //시크릿키 생성
  const secret = new TextEncoder().encode(process.env.SECRET_TOKEN);
  //알고리즘 선택
  const alg = process.env.JWT_ALG as string;
  const jwt = await new SignJWT({ idx, id })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  return jwt;
};

export const verifyJoseToken = async (token: string | undefined): Promise<JWTPayload | null> => {
  const secret = new TextEncoder().encode(process.env.SECRET_TOKEN);
  try {
    const { payload } = await jwtVerify(token as string, secret);
    return payload;
  } catch (err) {
    return null;
  }
};

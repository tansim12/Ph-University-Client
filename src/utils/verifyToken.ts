import { jwtDecode } from "jwt-decode";
interface ITokenPayload {
  data: {
    id: string;
    role: string;
  };
  exp: number;
  // Add other fields as needed
}
const verifyToken = (token: string) => {
  try {
    const decoded = jwtDecode<ITokenPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Token decoding failed:", error);
    return null;
  }
};

export default verifyToken;

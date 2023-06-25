import { type, url, v } from "../utils";

export async function getUserByEmail(type: string, email: string) {
  const res = await fetch(`${url}/api/v2/criscms/users?type=${type}&email=${email}`);
  return res.json();
}

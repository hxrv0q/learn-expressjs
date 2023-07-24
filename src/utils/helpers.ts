import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export function hashPassword(password: string) {
  const salt = genSaltSync();
  return hashSync(password, salt);
}

function comparePassword(rawPassword: string, hashPassword: string) {
  return compareSync(rawPassword, hashPassword);
}

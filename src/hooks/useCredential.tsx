import { useRecoilState } from "recoil";
import { userCredential } from "@/store";
import type { UserCredential } from "@/types";

export const useCredential = () => {
  const [credential, setCredential] =
    useRecoilState<UserCredential>(userCredential);

  return { credential, setCredential };
};

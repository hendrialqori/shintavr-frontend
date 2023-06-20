import { atom } from "recoil";
import { UserCredential as TUserCredential } from "@/types";

export const userCredential = atom<TUserCredential>({
  key: 'userCredential',
  default: {
    id: "",
    email: "",
    fullname: "",
    username: "",
    password: "",
    role: 'student',
    create_at: "" ,
    authThrough: 'firebase'
  }
})

export const loginThrough = atom<'google' | 'firebase'>({
  key: 'LoginThrough',
  default: 'firebase'
})
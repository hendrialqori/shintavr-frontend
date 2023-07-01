import { Navigate, Outlet } from "react-router-dom";
import RootLayout from "./layout";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db_firestore, auth } from "@/configs/firebase";
import { useSetRecoilState } from "recoil";
import { loginThrough } from "@/store";
import { trackDataProvider } from "@/utils/trackProvider";
import type { UserCredential } from "@/types";
import { useCredential } from "@/hooks/useCredential";

export const ProtectedRoute = () => {

  const { setCredential } = useCredential();

  const setLoginProvider = useSetRecoilState(loginThrough);

  const [isVerify, setVerify] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (credential) => {
      if (!credential) {
        setVerify(false);
        return;
      }

      trackDataProvider(async (data) => {
        if (data === "google") {
         setCredential({
            id: credential.email!,
            fullname: credential.displayName!,
            password: "********",
            role: "student",
            username: "-",
            authThrough: "google",
            email: credential.email!,
            create_at: credential.metadata.creationTime,
          });
          setLoginProvider("google");
        } else {
          const userDoc = await getDoc(
            doc(db_firestore, "users", credential.email!)
          );

          if (userDoc.exists()) {
            const data = userDoc.data();

            // set credential
           setCredential({
              ...data,
              authThrough: "firebase",
            } as UserCredential);
            // set provider
            setLoginProvider("firebase");
          }
        }
        // set verify
        setVerify(true);
      });
    });

    return () => unSubscribe();
  }, []);

  return !isVerify ? (
    <Navigate to="/login" />
  ) : (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

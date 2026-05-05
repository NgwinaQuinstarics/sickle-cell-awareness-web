import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


const ADMIN_EMAIL = "quinngwina@gmail.com";

export function isAdmin(user) {
  return user?.email === ADMIN_EMAIL;
}

export function watchAdmin(setIsAdminUser) {
  return onAuthStateChanged(auth, (user) => {
    if (user && user.email === ADMIN_EMAIL) {
      setIsAdminUser(true);
    } else {
      setIsAdminUser(false);
    }
  });
}
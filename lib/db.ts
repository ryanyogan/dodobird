import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { FormattedUser } from "./auth";

export async function updateUser(uid: string, data: any) {
  const userDoc = doc(getFirestore(), "users", uid);
  return updateDoc(userDoc, data);
}

export async function createUser(uid: string, data: FormattedUser) {
  const userDoc = doc(getFirestore(), "users", uid);
  return setDoc(userDoc, { uid, ...data }, { merge: true });
}

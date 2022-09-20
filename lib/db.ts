import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { FormattedUser } from "./auth";
import { firestore } from "./firebase";

const feedbackRef = collection(firestore, "feedback");

export async function updateUser(uid: string, data: any) {
  const userDoc = doc(firestore, "users", uid);
  return updateDoc(userDoc, data);
}

export async function createUser(
  uid: string,
  data: Omit<FormattedUser, "token">
) {
  const userDoc = doc(firestore, "users", uid);
  return setDoc(userDoc, { uid, ...data }, { merge: true });
}

export async function createFeedback(data) {
  return addDoc(feedbackRef, data);
}

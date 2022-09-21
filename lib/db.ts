import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { FeedbackData, Site } from "utils/types";
import { FormattedUser } from "./auth";
import { firestore } from "./firebase";

const feedbackRef = collection(firestore, "feedback");
const siteRef = collection(firestore, "sites");

export async function updateUser(uid: string, data: any): Promise<void> {
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

export async function createFeedback(data: Omit<FeedbackData, "id">) {
  return addDoc(feedbackRef, data);
}

export async function createSite(data: Omit<Site, "id">) {
  return addDoc(siteRef, data);
}

export async function deleteSite(id: Site["id"]) {
  const siteRef = doc(firestore, "sites", id);
  const feedbackRef = collection(firestore, "feedback");
  const q = query(feedbackRef, where("siteId", "==", id));

  await deleteDoc(siteRef);
  const snap = await getDocs(q);
  const batch = writeBatch(firestore);
  snap.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}

export async function deleteFeedback(id: string) {
  const docRef = doc(firestore, "feedback", id);
  return deleteDoc(docRef);
}

export async function updateFeedback(
  id: string,
  newValues: Partial<FeedbackData>
) {
  const docRef = doc(firestore, "feedback", id);
  return updateDoc(docRef, newValues);
}

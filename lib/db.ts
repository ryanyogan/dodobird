import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { FormattedUser } from "./auth";
import { firestore } from "./firebase";

const feedbackRef = collection(firestore, "feedback");
const sitesRef = collection(firestore, "sites");

export async function updateUser(uid: string, data: any) {
  const userDoc = doc(firestore, "users", uid);
  return updateDoc(userDoc, data);
}

export async function createUser(uid: string, data: FormattedUser) {
  const userDoc = doc(firestore, "users", uid);
  return setDoc(userDoc, { uid, ...data }, { merge: true });
}

export async function getAllFeedback(siteId: string) {
  try {
    let feedback = [];
    const q = query(feedbackRef, where("siteId", "==", siteId));
    const snap = await getDocs(q);

    snap.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    console.log("Feedback", feedback);
    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getAllSites() {
  let sites = [];
  const q = query(sitesRef);
  const snap = await getDocs(q);

  snap.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return { sites };
}

export async function createFeedback(data) {
  return addDoc(feedbackRef, data);
}

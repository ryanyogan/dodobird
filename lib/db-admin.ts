import { compareDesc, parseISO } from "date-fns";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./firebase";

const sitesRef = collection(firestore, "sites");
const feedbackRef = collection(firestore, "feedback");

export async function getAllSites() {
  let sites = [];
  const q = query(sitesRef);
  const snap = await getDocs(q);

  snap.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return { sites };
}

export async function getUserSites(uid: string) {
  let sites = [];
  const q = query(sitesRef, where("authorId", "==", uid));
  const snap = await getDocs(q);

  snap.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return { sites };
}

export async function getAllFeedback(siteId: string) {
  try {
    let feedback = [];
    const q = query(feedbackRef, where("siteId", "==", siteId));
    const snap = await getDocs(q);

    snap.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    return { feedback };
  } catch (error) {
    return { error };
  }
}

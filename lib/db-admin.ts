import { compareDesc, parseISO } from "date-fns";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FeedbackData, Site, Sites } from "utils/types";
import { firestore } from "./firebase";

const sitesRef = collection(firestore, "sites");
const feedbackRef = collection(firestore, "feedback");

export async function getAllSites(): Promise<Sites> {
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

export async function getSite(siteId: string): Promise<Site> {
  const docRef = doc(firestore, "sites", siteId);
  const docSnap = await getDoc(docRef);

  return { id: docSnap.id, ...docSnap.data() } as Site;
}

export async function getUserSites(uid: string): Promise<Sites> {
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

export async function getAllFeedback(
  siteId: string
): Promise<{ feedback: FeedbackData[]; error: Error }> {
  try {
    let feedback = [];
    const q = query(
      feedbackRef,
      where("siteId", "==", siteId),
      where("status", "==", "active")
    );
    const snap = await getDocs(q);

    snap.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    return { feedback, error: null };
  } catch (error) {
    return { error, feedback: null };
  }
}

export async function getAllFeedbackForSites(uid: string) {
  const { sites } = await getUserSites(uid);
  if (!sites.length) {
    return { feedback: [] };
  }

  const siteIds = sites.map((site) => site.id);
  const q = query(feedbackRef, where("siteId", "in", siteIds));
  const snap = await getDocs(q);

  const feedback: FeedbackData[] = [];
  snap.forEach((doc: any) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return { feedback };
}

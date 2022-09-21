import { getUserSites } from "../../lib/db-admin";
import { adminAuth } from "../../lib/firebase-admin";

export default async function handler(req, res) {
  try {
    const { uid } = await adminAuth.verifyIdToken(req.headers.token);
    const { sites } = await getUserSites(uid);

    res.status(200).json({ sites });
  } catch (error) {
    res.status(500).json({ error });
  }
}

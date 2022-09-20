import DashboardShell from "components/DashboardShell";
import { useAuth } from "../lib/auth";

export default function Home() {
  const auth = useAuth();

  return (
    <DashboardShell>
      {auth.user ? (
        <div>
          <p>Email: {auth.user.email}</p>
          <button onClick={(e) => auth.signout()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={(e) => auth.signinWithGoogle()}>
          Sign In With Google
        </button>
      )}
    </DashboardShell>
  );
}

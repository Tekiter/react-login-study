import { NavBar } from "../components/navBar";
import { useAuth } from "../utils/auth";

export function HomePage() {
  const auth = useAuth();

  function logout() {
    auth.logout();
  }

  return (
    <div>
      <NavBar />

      <div>accessToken: {auth.data.accessToken}</div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

import axios from "axios";
import { ChangeEvent, useState } from "react";
import { NavBar } from "../components/navBar";
import { useAuth, useAuthSetter } from "../utils/auth";

export function LoginPage() {
  const loginRequest = useLoginRequest();
  const authSetter = useAuthSetter();
  const authGetter = useAuth();

  const usernameField = useTextInput();
  const passwordField = useTextInput();

  async function submitLogin() {
    const data = await loginRequest.submit({
      username: usernameField.value,
      password: passwordField.value,
    });

    authSetter({
      accessToken: data.accessToken ?? "",
    });
  }

  return (
    <div>
      <NavBar />

      <input type="text" {...usernameField} />
      <input type="password" {...passwordField} />
      <button onClick={submitLogin}>Login</button>

      {loginRequest.state === "error" ? <div>login failed</div> : null}

      <div>
        <p>Result</p>
        {JSON.stringify(loginRequest.data)}
        <br />
        {JSON.stringify(authGetter)}
        <br />
        <Counter />
      </div>
    </div>
  );
}

function Counter() {
  const [value, setValue] = useState(0);

  return <button onClick={() => setValue((v) => v + 1)}>{value}</button>;
}

function useTextInput() {
  const [value, setValue] = useState("");

  function handleChange(e: ChangeEvent<{ value: string }>) {
    setValue(e.target.value);
  }

  return { value, onChange: handleChange };
}

interface LoginInfo {
  username: string;
  password: string;
}

type ActionState = "idle" | "pending" | "error" | "success";

interface LoginResult {
  accessToken: string;
}

function useLoginRequest() {
  const [actionState, setActionState] = useState<ActionState>("idle");
  const [data, setData] = useState<LoginResult | null>(null);

  async function submit(data: LoginInfo) {
    setActionState("pending");

    try {
      const res = await axios.post("http://localhost:5000/api/authorize", {
        username: data.username,
        password: data.password,
      });

      setData(res.data);

      setActionState("success");

      return res.data;
    } catch (error) {
      setActionState("error");
      throw error;
    }
  }

  return { submit, data, state: actionState };
}

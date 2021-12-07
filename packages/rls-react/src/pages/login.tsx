import axios from "axios";
import { ChangeEvent, useState } from "react";
import { NavBar } from "../components/navBar";
import { useAuthGetter, useAuthSetter } from "../utils/auth";

export function LoginPage() {
  const loginRequest = useLoginRequest();
  const authSetter = useAuthSetter();
  const authGetter = useAuthGetter();

  const usernameField = useTextInput();
  const passwordField = useTextInput();

  async function submitLogin() {
    await loginRequest.submit({
      username: usernameField.value,
      password: passwordField.value,
    });

    authSetter({
      accessToken: loginRequest.data?.accessToken ?? "",
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
        {JSON.stringify(authGetter)}
      </div>
    </div>
  );
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
    } catch {
      setActionState("error");
    }
  }

  return { submit, data, state: actionState };
}

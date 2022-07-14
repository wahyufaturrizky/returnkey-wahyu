import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";

const Login = () => {
  let navigate = useNavigate();
  let auth = useAuth();

  const [stateUserProfile1, setStateUserProfile1] = useState<any>();
  const [stateUserProfile2, setStateUserProfile2] = useState<any>();

  useEffect(() => {
    const handleCheckAuth = async () => {
      const resUserProfile1 = await localStorage.getItem("userProfile1");
      const resUserProfile2 = await localStorage.getItem("userProfile2");
      const resSssion = await localStorage.getItem("session");
      const resUserProfile1Parse = JSON.parse(resUserProfile1 as string);
      const resUserProfile2Parse = JSON.parse(resUserProfile2 as string);
      setStateUserProfile1(resUserProfile1Parse);
      setStateUserProfile2(resUserProfile2Parse);

      if (resSssion !== "off") {
        if (resUserProfile1Parse?.isSignIn) {
          navigate("/home");
        } else if (resUserProfile2Parse?.isSignIn) {
          navigate("/home");
        }
      }
    };

    handleCheckAuth();
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;
    let password = formData.get("password") as string;

    await localStorage.setItem("session", "on");

    if (
      (username === "user" && password === "test1234") ||
      (username === "user2" && password === "pass1234")
    ) {
      if (
        username === "user" &&
        localStorage.getItem("userProfile1") === null
      ) {
        await localStorage.setItem(
          "userProfile1",
          JSON.stringify({ name: username, favorite: [], isSignIn: true })
        );

        await localStorage.setItem(
          "userProfile2",
          JSON.stringify({
            name: stateUserProfile2?.name,
            favorite: stateUserProfile2?.favorite,
            isSignIn: false,
          })
        );

        navigate("/home");
      } else if (
        username === "user2" &&
        localStorage.getItem("userProfile2") === null
      ) {
        await localStorage.setItem(
          "userProfile2",
          JSON.stringify({ name: username, favorite: [], isSignIn: true })
        );

        await localStorage.setItem(
          "userProfile1",
          JSON.stringify({
            name: stateUserProfile1?.name,
            favorite: stateUserProfile1?.favorite,
            isSignIn: false,
          })
        );

        navigate("/home");
      } else if (username === "user") {
        await localStorage.setItem(
          "userProfile1",
          JSON.stringify({
            name: stateUserProfile1?.name,
            favorite: stateUserProfile1?.favorite,
            isSignIn: true,
          })
        );

        await localStorage.setItem(
          "userProfile2",
          JSON.stringify({
            name: stateUserProfile2?.name,
            favorite: stateUserProfile2?.favorite,
            isSignIn: false,
          })
        );

        navigate("/home");
      } else if (username === "user2") {
        await localStorage.setItem(
          "userProfile1",
          JSON.stringify({
            name: stateUserProfile1?.name,
            favorite: stateUserProfile1?.favorite,
            isSignIn: false,
          })
        );

        await localStorage.setItem(
          "userProfile2",
          JSON.stringify({
            name: stateUserProfile2?.name,
            favorite: stateUserProfile2?.favorite,
            isSignIn: true,
          })
        );

        navigate("/home");
      }
    } else {
      window.alert("Incorrect username and password");
    }
  }

  return (
    <div>
      <h1>
        Fruits App by{" "}
        <a
          target={"_blank"}
          href="https://www.linkedin.com/in/wahyu-fatur-rizky/"
          rel="noreferrer"
        >
          Wahyu Fatur Rizki
        </a>
      </h1>

      <br />

      <h3>
        * Fyi I just provide function only, If you want to see nice UI/UX please
        hire me thank you *
      </h3>

      <br />

      <p>You must log in to view the page</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>
        <br />
        <label>
          Password: <input name="password" type="password" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";

const Login = () => {
  let navigate = useNavigate();

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
            name: stateUserProfile2?.name || "user2",
            favorite: stateUserProfile2?.favorite || [],
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
            name: stateUserProfile1?.name || "user",
            favorite: stateUserProfile1?.favorite || [],
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
    <div className="container-login">
      <div className="contianer-content">
        <div className="giphy">
          <iframe
            title="fruits"
            src="https://giphy.com/embed/fldbEYcwJ0Bv3ufKaH"
            width="100%"
            height="100%"
            style={{ position: "absolute" }}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <p>
          <a href="https://giphy.com/gifs/fldbEYcwJ0Bv3ufKaH">via GIPHY</a>
        </p>

        <h2 className="title">Fruits App by </h2>

        <div className="link">
          <a
            className="link-sub"
            target={"_blank"}
            href="https://www.linkedin.com/in/wahyu-fatur-rizky/"
            rel="noreferrer"
          >
            <h3>by Wahyu Fatur Rizki</h3>
          </a>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input
              placeholder="username"
              className="input"
              name="username"
              type="text"
            />
            <label>Password:</label>
            <input placeholder="password" name="password" type="password" />
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Favorite.css";

const Favorite = () => {
  const navigate = useNavigate();
  const [initialFruitList, setInitialFruitList] = useState<Array<any>>([]);
  const [stateUserProfile1, setStateUserProfile1] = useState<any>();
  const [stateUserProfile2, setStateUserProfile2] = useState<any>();

  useEffect(() => {
    const handleFetch = async () => {
      if (initialFruitList?.length === 0) {
        const res = await localStorage.getItem("fruitInit");

        const resParse = JSON.parse(res as string);
        setInitialFruitList(resParse);
      }
    };

    handleFetch();
  }, [initialFruitList?.length]);

  const handleCheckAuth = useCallback(async () => {
    const resUserProfile1 = await localStorage.getItem("userProfile1");
    const resUserProfile2 = await localStorage.getItem("userProfile2");
    const resUserProfile1Parse = JSON.parse(resUserProfile1 as string);
    const resUserProfile2Parse = JSON.parse(resUserProfile2 as string);
    setStateUserProfile1(resUserProfile1Parse);
    setStateUserProfile2(resUserProfile2Parse);
  }, []);

  useEffect(() => {
    handleCheckAuth();
  }, [handleCheckAuth]);

  const handlePickFavroite = async (data: any) => {
    if (stateUserProfile1?.name === "user" && stateUserProfile1?.isSignIn) {
      if (stateUserProfile1?.favorite.includes(data)) {
        const removeItem = stateUserProfile1?.favorite.filter(
          (filtering: any) => filtering !== data
        );

        await localStorage.setItem(
          "userProfile1",
          JSON.stringify({
            name: stateUserProfile1?.name,
            isSignIn: stateUserProfile1?.isSignIn,
            favorite: removeItem,
          })
        );

        handleCheckAuth();
      } else {
        await localStorage.setItem(
          "userProfile1",
          JSON.stringify({
            name: stateUserProfile1?.name,
            isSignIn: stateUserProfile1?.isSignIn,
            favorite: [...stateUserProfile1?.favorite, data],
          })
        );

        handleCheckAuth();
      }
    } else {
      if (stateUserProfile2?.favorite.includes(data)) {
        const removeItem = stateUserProfile2?.favorite.filter(
          (filtering: any) => filtering !== data
        );

        await localStorage.setItem(
          "userProfile2",
          JSON.stringify({
            name: stateUserProfile2?.name,
            isSignIn: stateUserProfile2?.isSignIn,
            favorite: removeItem,
          })
        );

        handleCheckAuth();
      } else {
        await localStorage.setItem(
          "userProfile2",
          JSON.stringify({
            name: stateUserProfile2?.name,
            isSignIn: stateUserProfile2?.isSignIn,
            favorite: [...stateUserProfile2?.favorite, data],
          })
        );

        handleCheckAuth();
      }
    }
  };

  return (
    <div className="container">
      <div className="contianer-content">
        <h2 className="title">Favorite</h2>

        <p className="welcome">
          Welcome {stateUserProfile1?.name || stateUserProfile2?.name}!{" "}
        </p>

        <ul className="list-link">
          <li style={{ display: "inline" }} key={"home"}>
            <Link className="link-home" to="/home">
              Home
            </Link>
          </li>
          <li style={{ display: "inline", marginLeft: 12 }} key={"favorite"}>
            <Link className="link-favorite" to="/favorite">
              Favorite
            </Link>
          </li>
        </ul>

        <div className="container-fruits">
          {stateUserProfile1?.name === "user" && stateUserProfile1?.isSignIn
            ? stateUserProfile1?.favorite
                .sort((a: any, b: any) => a.localeCompare(b))
                .map((data1: any, index1: any) => (
                  <button
                    onClick={() => handlePickFavroite(data1)}
                    className={
                      stateUserProfile1?.name === "user" &&
                      stateUserProfile1?.isSignIn &&
                      stateUserProfile1?.favorite.includes(data1)
                        ? "selected"
                        : "product"
                    }
                    key={index1}
                  >
                    {data1}
                  </button>
                ))
            : stateUserProfile2?.favorite.map((data2: any, index2: any) => (
                <button
                  onClick={() => handlePickFavroite(data2)}
                  className={
                    stateUserProfile2?.name === "user2" &&
                    stateUserProfile2?.isSignIn &&
                    stateUserProfile2?.favorite.includes(data2)
                      ? "selected"
                      : "product"
                  }
                  key={index2}
                >
                  {data2}
                </button>
              ))}
        </div>

        <div className="signout-container">
          <button
            className="signout"
            onClick={async () => {
              await localStorage.setItem("session", "off");
              navigate("/");
            }}
          >
            Sign out
          </button>
        </div>

        <div className="container-author">
          <a
            className="link-author"
            rel="noreferrer"
            href="https://www.linkedin.com/in/wahyu-fatur-rizky/"
            target={"_blank"}
          >
            Author Wahyu Fatur Rizki
          </a>
        </div>
      </div>
    </div>
  );
};

export default Favorite;

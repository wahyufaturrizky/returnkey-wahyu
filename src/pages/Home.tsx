import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Home.css";

const initFruits = [
  "Pineapple",
  "Peach",
  "Apple",
  "Watermelon",
  "Melon",
  "Guava",
  "Banana",
  "Orange",
  "Grape",
  "Kiwi",
  "Blueberry",
  "Blackberry",
  "Pear",
  "Tangerine",
  "Plum",
  "Mango",
  "Date",
  "Cantaloupe",
  "Strawberry",
  "Coconut",
];

const Home = () => {
  const navigate = useNavigate();
  const [initialFruitList, setInitialFruitList] = useState<Array<any>>([]);
  const [stateUserProfile1, setStateUserProfile1] = useState<any>();
  const [stateUserProfile2, setStateUserProfile2] = useState<any>();

  useEffect(() => {
    const onInitFruits = async () => {
      if (initialFruitList?.length === 0) {
        await localStorage.setItem("fruitInit", JSON.stringify(initFruits));
      }
    };

    onInitFruits();
  }, [initialFruitList?.length]);

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
        <h2 className="title">Home</h2>

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
          {initialFruitList
            .sort((a, b) => a.localeCompare(b))
            .map((data, index) => (
              <button
                className={
                  stateUserProfile1?.name === "user" &&
                  stateUserProfile1?.isSignIn &&
                  stateUserProfile1?.favorite.includes(data)
                    ? "selected"
                    : stateUserProfile2?.name === "user2" &&
                      stateUserProfile2?.isSignIn &&
                      stateUserProfile2?.favorite.includes(data)
                    ? "selected"
                    : "product"
                }
                onClick={() => handlePickFavroite(data)}
                key={index}
              >
                {data}
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

export default Home;

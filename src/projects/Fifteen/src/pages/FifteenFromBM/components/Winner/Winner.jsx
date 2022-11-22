import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./Winner.css";

const Winner = ({ win }) => {
  const [userNameLogin, setUserNameLogin] = useState(false);
  // стат.получ.масс.результатов из LS (LocalStorage)
  let initialTemplateSaveLS = {
    id_1: 0,
    userName: "0",
    // time: 9999,
    // time: cardImages.length * 2000,
  };
  const [saveUserResult15, setSaveUserResult15] = useState(
    JSON.parse(localStorage.getItem("15pzl saveUserResult15")) || []
  );

  const fnWin = () => {
    let userNameSaveLS = "123Wer";
    let templateSaveLS = {
      id_1: saveUserResult15.length + 1,
      userName: userNameSaveLS,
      // time: time,
    };
    // saveUserResult15.push(templateSaveLS); // ничего
    // setSaveUserResult15([saveUserResult15, templateSaveLS]); // ошб. перерендер
    // setSaveUserResult15(saveUserResult15.push(templateSaveLS)); // .push is not a function
  };

  if (win) {
    let userNameSaveLS = "123Wer";
    // let userNameLogin = false;
    // if (userNameLogin) {
    //   userNameSaveLS = userNameLogin;
    // } else {
    //   userNameSaveLS = prompt("Введите имя");
    // }

    let templateSaveLS = {
      id_1: saveUserResult15.length + 1,
      userName: userNameSaveLS,
      // time: time,
    };
    // setSaveUserResult15([...saveUserResult15, templateSaveLS]);

    fnWin();
  }

  useEffect(
    () => {
      async function f() {
        setTimeout(() => {
          localStorage.setItem(
            "15pzl saveUserResult15",
            JSON.stringify(saveUserResult15)
          );
        }, 1000);
      }
      f();
    },
    [
      /* saveUserResult15 */
    ]
  );

  if (!win) {
    return null;
  }

  return (
    <div className="winner-alert">
      <span>WIN!</span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  win: state.present.win,
});

export default connect(mapStateToProps)(Winner);

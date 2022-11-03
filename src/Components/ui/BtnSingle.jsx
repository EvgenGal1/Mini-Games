import React from "react";
import "./BtnSingle.scss";

export const BtnSingle = ({ name1, name2, stBtn, setStBtn, onClikBtn }) => {
  //  название в кнопке
  let nameProp;
  // е/и передали только имя1
  if (name1 && !name2) {
    nameProp = <>{name1}</>;
  }
  // е/и передали оба имени
  if (name1 && name2) {
    nameProp = <>{stBtn ? name1 : name2}</>;
  }
  // если не передали имён
  if (!name1 && !name2) {
    nameProp = <>{stBtn ? "ВКЛЮЧИТЬ" : "ОТКЛЮЧИТЬ"}</>;
  }

  // functProp обраб. при клик.
  let functProp;
  // st|set для измен. сост.
  if (stBtn || setStBtn) {
    functProp = () => setStBtn((prev) => !prev);
  }
  // onClick для запуска fn()
  if (onClikBtn) {
    functProp = () => onClikBtn();
  }
  return (
    <>
      <button className="btn-single" onClick={functProp}>
        {nameProp}
      </button>
    </>
  );
};
// export {BtnSingle}

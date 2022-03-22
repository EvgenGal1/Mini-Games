import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Если вы хотите начать измерение производительности в своем приложении, передайте функцию
// для регистрации результатов (например: reportWebVitals(console.log))
// или отправить на конечную точку аналитики. Узнайте больше: https://bit.ly/CRA-vitals
// reportWebVitals();

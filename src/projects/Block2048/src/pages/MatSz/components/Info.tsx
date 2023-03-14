import React from "react";

const Info: React.FC = () => {
  return (
    <div className="info">
      <h2>About</h2>
      <p>
        Это повторная реализация превосходной игры{" "}
        <a href="https://play2048.co/">
          <b>2048</b>
        </a>{" "}
        Габриэля Цирулли, созданная с помощью React, Redux и TypeScript. В
        отличие от других реализаций на основе React, здесь используются только
        функциональные компоненты. Этот проект не зависит от холста или ссылки
        на элементы.
      </p>
      <p>
        Разработан <a href="https://github.com/mat-sz">Mat Sz</a>. Исходный код
        доступен по адресу{" "}
        <a href="https://github.com/mat-sz/2048">mat-sz/2048</a>.
      </p>
    </div>
  );
};

export default Info;

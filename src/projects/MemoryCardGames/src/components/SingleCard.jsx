import "./SingleCard.scss";

// в fn()SingleCard принимаем div.card с id, handleChoice `выбор обработки`, flipped - флаг поворота
export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  // 5. выбор карты по клик (вызов в fn()обраб.Выбор - см.)
  const handleClick = () => {
    // 10. проверка откл.возмж.переворота карты при 2х др.картах
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    // 4. для кажой card + div.card.key.card.id > img.front.src.card,  img.back.src.cover.png
    <div className="card">
      {/* 8. условн.клас при флаге переворота */}
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        {/* 5. + onClick handleClick */}
        <img
          className="back"
          // src="./img/cover.png"
          src={require("../img/cover.png")}
          // 6. выбор карты по клик
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}

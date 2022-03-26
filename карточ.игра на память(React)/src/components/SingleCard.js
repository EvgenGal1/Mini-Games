import "./SingleCard.css";

// в fn()SingleCard принимаем div.card с id, handleChoice `выбор обработки`,
export default function SingleCard({ card, handleChoice }) {
  // 5. fn()handleClick`ручкаRлик` запуск при клик на img.back
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    // 4. для кажой card + div.card.key.card.id > img.front.src.card,  img.back.src.cover.png
    <div className="card">
      <div>
        <img className="front" src={card.src} alt="card fonts" />
        {/* 5. + onClick handleClick */}
        <img
          className="back"
          src="./img/cover.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}

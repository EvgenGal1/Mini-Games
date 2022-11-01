let basketBtns = document.querySelectorAll(".toBasketBtn");
//берем все кнопки "В корзину" и слушаем клики по ним
// перебираем все кнопки. так как  не можем назначить событие коллекции basketBtns
basketBtns.forEach(function (btn) {
  // слушаем событие  click
  btn.addEventListener("click", function (event) {
    // переменнная id = у события получаем src элемент по которому произошел клик, у него получаем (dataset `набор данных`) атрибут, здесь id. его значение записываем в переменную
    let id = event.srcElement.dataset.id;
    let price = event.srcElement.dataset.price;
    let name = event.srcElement.dataset.name;
    // в объект basket, в его метод addProduct, передаем объект настроек
    basket.addProduct({ id: id, price: price, name: name });
  });
});

let basket = {
  // в объекте products храняться все продукты
  products: {},

  /**
   *! Метод добавляет продукт в корзину.
   * @param {{ id: string, price: string, name: string }} product
   */
  addProduct(product) {
    // `добавляем продукты в объект`
    this.addProductToObject(product);
    // `показываем продукт в корзине`
    this.renderProductInBasket(product);
    // `показываем общую сумму`
    this.renderTotalSum();
    // добавляем слуш. событ. кнопки "Удалить"
    this.addRemoveBtnsListeners();
  },

  /**
   * Обработчик события клика по кнопке удаления товара.
   * @param {MouseEvent} event
   */
  removeProductListener(event) {
    //console.log(this); this будет указывать на кнопку, а не на объект basket
    //здесь мы используем basket вместо this, потому что контекст вызова не имеет
    //этих методов и нам надо явно обратиться к нашему объекту корзины
    basket.removeProduct(event);
    basket.renderTotalSum();
  },

  /**
   * Добавляем слушателей события клика по кнопкам удалить.
   */
  addRemoveBtnsListeners() {
    let btns = document.querySelectorAll(".productRemoveBtn");
    for (let i = 0; i < btns.length; i++) {
      //важно указать именно this.removeProductListener, чтобы это была одна и та же
      //функция, а не несколько одинаковых.
      btns[i].addEventListener("click", this.removeProductListener);
    }
  },

  /**
   * Метод отображает общую сумму заказа в корзине.
   */
  renderTotalSum() {
    document.querySelector(".total").textContent = this.getTotalSum();
  },

  /**
   *! Метод добавляет продукт в объект с продуктами.
   * @param {{ id: string, price: string, name: string }} product
   */
  addProductToObject(product) {
    // если в products нет объекта с id равным undefined (нет объекта с таким id)
    if (this.products[product.id] == undefined) {
      // добавляем элемент с таким id и добавляем новый объект по этому id с ценой, именнем и количеством 1
      this.products[product.id] = {
        price: product.price,
        name: product.name,
        count: 1,
      };
      // иначе, если элемент с таким id уже есть, то просто увеличиваем его на 1
    } else {
      this.products[product.id].count++;
    }
  },

  /**
   *! Метод отрисовывает продукт в корзине, если там такой уже есть просто увеличивает счетчик на 1.
   * @param {{ id: string, price: string, name: string }} product
   * @returns
   */
  renderProductInBasket(product) {
    //  переменнная `продукт существует` = получаем селектор с классом .productCount и data-id = id продукта
    let productExist = document.querySelector(
      `.productCount[data-id="${product.id}"]`
    );
    // если продукт есть
    if (productExist) {
      // в свойство textContent прибавляем такоей же
      productExist.textContent++;
      // остановим дальнейшее выполнение
      return;
    }
    // создаём новый продукт. строкой. вставляем id, назв., цену и создаем элемент с классом productCount атрибутом data-id с id этого продукта, а также с количеством 1 (т.к. новый первый элемент). так же создаём иконку для удаления
    // `товарная строка`
    let productRow = `
			 <tr>
				  <th scope="row">${product.id}</th>
				  <td>${product.name}</td>
				  <td>${product.price}</td>
				  <td class="productCount" data-id="${product.id}">1</td>
				  <td><i class="fas fa-trash-alt productRemoveBtn" data-id="${product.id}"></i></td>
			 </tr>
		`;
    // переменная tbody = получим селектор tbody
    let tbody = document.querySelector("tbody");
    // вставляем в самое начало таблиц разметку с продуктом
    tbody.insertAdjacentHTML("beforeend", productRow);
  },

  /**
   * Метод считает стоимость всех продуктов в корзине.
   * @returns {number}
   */
  getTotalSum() {
    let sum = 0;
    for (let key in this.products) {
      sum += this.products[key].price * this.products[key].count;
    }
    return sum;
  },

  /**
   * Метод удаляет продукт из объекта продуктов, а также из корзины на странице.
   * @param {MouseEvent} event
   */
  removeProduct(event) {
    let id = event.srcElement.dataset.id;
    this.removeProductFromObject(id);
    this.removeProductFromBasket(id);
  },

  /**
   * Метод удаляет товар из корзины. Если количество больше 1, то просто уменьшает его.
   * @param {string} id
   */
  removeProductFromBasket(id) {
    let countTd = document.querySelector(`.productCount[data-id="${id}"]`);
    if (countTd.textContent == 1) {
      countTd.parentNode.remove();
    } else {
      countTd.textContent--;
    }
  },

  /**
   * Метод удаляет продукт из объекта с продуктами.
   * @param {string} id
   */
  removeProductFromObject(id) {
    if (this.products[id].count == 1) {
      delete this.products[id];
    } else {
      this.products[id].count--;
    }
  },
};

(function () {

    let button = document.querySelector('.view');
    let cardsContainer = document.querySelector('.cards');
    let sortListBlock = document.querySelector('.sortList');
    let sortGreed = document.querySelector('.sortGreed');

    function toggleClass() {
        if (cardsContainer.classList.contains('cards--list')) {
            cardsContainer.classList.remove('cards--list');
            sortListBlock.classList.add('hidden');
            sortGreed.classList.remove('hidden')
        } else {
            cardsContainer.classList.add('cards--list');
            sortListBlock.classList.remove('hidden');
            sortGreed.classList.add('hidden');
        }
    }

    button.addEventListener("click", toggleClass);

})();


(function () {

    let pizzaList = [
        {name: 'Первая', consist: ['курица', 'перец', 'помидоры'], calories: 23, price: '46', id: '1'},
        {name: 'Вторая', consist: ['салями', 'перец', 'сыр'], calories: 22, price: '30', id: '2'},
        {name: 'Третья', consist: ['мука', 'томаты', 'сыр'], calories: 20, price: '50', id: '3'},
        {name: 'Ещё одна', consist: ['мука', 'томаты', 'сыр'], calories: 20, price: '100', id: '4'}];
    let cards = document.querySelector('.cards');
    let sortPizzaList = pizzaList.slice().sort(comparePrice);
    let sortPizzaByName = pizzaList.slice().sort(compareName);
    let inputSortByPrice = document.getElementById('price');
    let inputSortByName = document.getElementById('name');
    let inputSortByIngredient = document.getElementById('consist');
    let buttons = cards.getElementsByTagName('button');


    function comparePrice(a, b) {
        let priceA = +a.price;
        let priceB = +b.price;

        return priceB - priceA;
    }

    function compareName(a, b) {
        let nameA = a.name;
        let nameB = b.name;
        return ('' + nameA).localeCompare(nameB);
    }

    function createCard(arr) {
        arr.forEach(function (el) {

            let test = document.createElement('div');
            test.className = 'card';
            // test.innerHTML = `<div class="card__top"><img src="img/pizza.jpg" alt=""></div>`;

            let front = document.createElement('div');
            front.classList = 'front';
            test.appendChild(front);

            let cardBottom = document.createElement('div');
            cardBottom.className = 'card__bottom';
            front.appendChild(cardBottom);

            let name = document.createElement('div');
            name.classList = 'name';
            name.innerHTML = `Название: ${el.name} `;
            cardBottom.appendChild(name);

            let consist = document.createElement('div');
            consist.classList = 'consist';
            consist.innerHTML = `Состав:`;
            cardBottom.appendChild(consist);

            let list = document.createElement('ul');
            list.classList = 'ingredient-list';
            consist.appendChild(list);

            for (let i = 0; i < el.consist.length; i++) {
                let listItem = document.createElement('li');
                listItem.classList = 'ingredient-item';
                listItem.innerHTML = ` ${el.consist[i]} `;

                let deleteItem = document.createElement('div');
                deleteItem.classList = 'delete-item';
                listItem.appendChild(deleteItem);

                list.appendChild(listItem);
            }

            let calories = document.createElement('div');
            calories.classList = 'calories';
            calories.innerHTML = `Калории: ${el.calories}`;
            cardBottom.appendChild(calories);

            let price = document.createElement('div');
            price.classList = 'price';
            price.innerHTML = `Цена: ${el.consist.length} $`;
            cardBottom.appendChild(price);

            let back = document.createElement('div');
            back.classList = 'back';
            back.innerHTML = `<div class="card__top"><img src="img/pizza.jpg" alt=""></div>`;
            test.appendChild(back);

            let button = document.createElement('button');
            button.setAttribute('data-id', el.id);
            button.innerHTML = 'Заказать'
            cardBottom.appendChild(button);

            cards.appendChild(test);
        })
    }

    function deleteCards() {
        document.querySelectorAll('.card').forEach(function (el) {
            cards.removeChild(el);
        });
    }

    function showSortCardByPrice() {
        if (inputSortByPrice.checked === true) {
            deleteCards();

            createCard(sortPizzaList);
        } else {
            deleteCards();

            createCard(pizzaList);
        }
    }

    function showSortCardByName() {
        if (inputSortByName.checked === true) {
            deleteCards();

            createCard(sortPizzaByName);
        } else {
            deleteCards();

            createCard(pizzaList);
        }
    }

    function showSortCardByIngredient() {
        let param = inputSortByIngredient.value;
        let sortPizzaByIngredient = pizzaList.filter(function (item) {

            for (let i = 0; i < item.consist.length; i++) {
                if (item.consist[i] === param.toLowerCase()) {
                    return true;
                }
            }
        });

        if (param === '') {
            createCard(pizzaList);
        } else {
            deleteCards();

            createCard(sortPizzaByIngredient);
        }
    }

    createCard(pizzaList);

    let cart = {}; // my basket
    let quantiti = document.querySelector('.item-cound');


    function addToBasket(event) {
        event.stopPropagation();
        let pizzaId = event.currentTarget.getAttribute('data-id');
        if (cart[pizzaId] != undefined) {
            cart[pizzaId]++
        } else {
            cart[pizzaId] = 1;
        }
        ;

        localStorage.setItem('cart', JSON.stringify(cart));

        checkBasket();    // need execute this function after loading page
        showQuantity();  // need execute this function after loading page
    }

    function checkBasket() {
        if (localStorage.getItem('cart') != null) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
    }

    function showQuantity() {
        let out = 0;
        for (let id in cart) {
            out += cart[id];
        }
        quantiti.innerHTML = out;
    }


    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', addToBasket);
    }


    function cardsListener(event) {
        let target = event.target;
        let card = target.closest('.card')

        if (target.classList.contains('delete-item')) {

            target.parentElement.remove();
            target.remove();
        } else if ( card) {

            if (card.classList.contains('rotate--active')) {
                card.classList.remove('rotate--active');
            } else {
                card.classList.add('rotate--active');
            }
        }
    }


    cards.addEventListener('click', cardsListener);
    inputSortByPrice.addEventListener('click', showSortCardByPrice);
    inputSortByName.addEventListener('click', showSortCardByName);
    inputSortByIngredient.addEventListener('input', showSortCardByIngredient);

})();




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
        {name: 'Первая', consist: ['курица', 'перец', 'помидоры'], calories: 23, price: '46'},
        {name: 'Вторая', consist: ['салями', 'перец', 'сыр'], calories: 22, price: '30'},
        {name: 'Третья', consist: ['мука', 'томаты', 'сыр'], calories: 20, price: '50'},
        {name: 'Ещё одна', consist: ['мука', 'томаты', 'сыр'], calories: 20, price: '100'}];
    let cards = document.querySelector('.cards');
    let sortPizzaList = pizzaList.slice().sort(comparePrice);
    let sortPizzaByName = pizzaList.slice().sort(compareName);
    let inputSortByPrice = document.getElementById('price');
    let inputSortByName = document.getElementById('name');
    let inputSortByIngredient = document.getElementById('consist');

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
            test.innerHTML = `<div class="card__top"><img src="img/pizza.jpg" alt=""></div>`;

            let cardBottom = document.createElement('div');
            cardBottom.className = 'card__bottom';
            test.appendChild(cardBottom);

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
                list.appendChild(listItem);
            }

            let calories = document.createElement('div');
            calories.classList = 'calories';
            calories.innerHTML = `Калории: ${el.calories}`;
            cardBottom.appendChild(calories);

            let price = document.createElement('div');
            price.classList = 'price';
            price.innerHTML = `Цена: ${el.price} гривен`;
            cardBottom.appendChild(price);

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

            for ( let i = 0; i < item.consist.length; i++) {
                if (item.consist[i] === param.toLowerCase()) {
                    return true;
                }
            }
        });


        if ( param === '') {
            createCard(pizzaList);
        } else {
            deleteCards();

            createCard(sortPizzaByIngredient);
        }

    }

    createCard(pizzaList);

    inputSortByPrice.addEventListener('click', showSortCardByPrice);
    inputSortByName.addEventListener('click', showSortCardByName);
    inputSortByIngredient.addEventListener('input', showSortCardByIngredient)

})();






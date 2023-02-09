import { getData } from "./apiRequest";

const appendChar = (article, charData) => {
    const { name, image, gender, location, species, status, url } = charData;
    article.innerHTML = `
            <img src=${image} alt=${name}">
            <div>
                <h3>${name}</h3>
                <p><span>Gender:</span>${gender}</p>
                <p><span>Location:</span>${location.name}</p>
                <p><span>Specie:</span>${species}</p>
                <p><span>Status:</span>${status}</p>
                <p><span>Link:</span><a href=${url}>Click here</a></p>
            </div>
        `;
};

const clearList = (el, arr) => {
    arr = [];
    el.innerHTML = "";
    el.classList.remove("show");
};

const handleCharList = (id) => {
    const list = document.querySelector(`#${id} ul`);
    const input = document.querySelector(`#${id} input`);
    let data;
    let elemsToShow = [];

    const prepareArr = (filterStr) => {
        const regexp = new RegExp(`${filterStr}`, "giu");
        elemsToShow = data
            .filter((el) => regexp.test(el.name))
            .map((el) => {
                return `<li data-id=${el.id}>${el.name}</li>`;
            });
    };

    const appendElements = (elArr) => {
        elArr.forEach((el) => {
            list.insertAdjacentHTML("beforeend", el);
        });
        list.classList.add("show");
    };

    input.addEventListener("focus", async (e) => {
        clearList(list, elemsToShow);
        data = await getData("/character");
        prepareArr(e.target.value);
        appendElements(elemsToShow);
    });

    list.addEventListener("click", async (e) => {
        const li = e.target.closest("li");
        if (!li) return;
        const charId = li.dataset.id;
        const article = document.getElementById("charInfo");
        const charData = await getData(`/character/${charId}`);
        appendChar(article, charData);
    });

    input.addEventListener("input", (e) => {
        if (e.target.value == "") {
            clearList(list, elemsToShow);
            return;
        }
        prepareArr(e.target.value);

        list.innerHTML = "";

        appendElements(elemsToShow);
    });
};

const fillArticles = async () => {
    const articles = document.querySelectorAll(
        "article.article.char-info:not(#charInfo)"
    );
    const charsAmount = await getData("/character", true);
    console.log(charsAmount);
    const idSet = new Set();
    while (idSet.size < articles.length) {
        const id = Math.floor(Math.random() * (charsAmount - 1 + 1) + 1);
        idSet.add(id);
    }
    const data = await getData(`/character/${[...idSet]}`);
    articles.forEach((el, i) => {
        appendChar(el, data[i]);
    });
};

const initialFetching = async () => {
    fillArticles();
    handleCharList("JSON-list");
};

window.addEventListener("load", () => {
    initialFetching();
});

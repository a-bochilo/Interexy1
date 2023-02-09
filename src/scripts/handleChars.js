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

    const clearList = () => {
        elemsToShow = [];
        list.innerHTML = "";
        list.classList.remove("show");
    };

    input.addEventListener("focus", async (e) => {
        clearList();
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
            clearList();
            return;
        }
        prepareArr(e.target.value);

        list.innerHTML = "";

        appendElements(elemsToShow);
    });
};

// const fillExistedArticles = async () => {
//     const articles = document.querySelectorAll(
//         "article.article.char-info:not(#charInfo)"
//     );
//     const charsAmount = await getData("/character", true);
//     const idSet = new Set();
//     while (idSet.size < articles.length) {
//         const id = Math.floor(Math.random() * (charsAmount - 1 + 1) + 1);
//         idSet.add(id);
//     }
//     const data = await getData(`/character/${[...idSet]}`);
//     articles.forEach((el, i) => {
//         appendChar(el, data[i]);
//     });
// };

const createAndPutCharArticles = async (articlesAmount) => {
    const anchor = document.getElementById("charInfo");
    const charsRange = await getData("/character", true);
    const idSet = new Set();
    while (idSet.size < articlesAmount) {
        const id = Math.floor(Math.random() * (charsRange - 1 + 1) + 1);
        idSet.add(id);
    }
    const data = await getData(`/character/${[...idSet]}`);
    data.forEach((char) => {
        const article = document.createElement("article");
        article.classList.add("article", "char-info");
        appendChar(article, char);
        anchor.after(article);
    });
};

window.addEventListener("load", () => {
    // fillExistedArticles();
    createAndPutCharArticles(5);
    handleCharList("JSON-list");
});

import axios from "axios";

const fetchRickAndMortyApi = axios.create({
    baseURL: "https://rickandmortyapi.com/api",
    headers: { "Content-Type": "application/json" },
});

const getData = async (part) => {
    const response = await fetchRickAndMortyApi.get(`${part}`);
    const fetchedData = await response.data.results;
    handleData("JSON-list", fetchedData);
};

const handleData = (id, data) => {
    const list = document.querySelector(`#${id} ul`);
    const input = document.querySelector(`#${id} input`);
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

    const appendChar = (article, charData) => {
        const { name, image, gender, location, species, status, link } =
            charData;
        article.innerHTML = `
            <img src=${image} alt=${name}">
            <div>
                <h3>${name}</h3>
                <p><span>Gender:</span>${gender}</p>
                <p><span>Location:</span>${location.name}</p>
                <p><span>Specie:</span>${species}</p>
                <p><span>Status:</span>${status}</p>
                <p><span>Link:</span><a href=${link}>Click here</a></p>
            </div>
        `;
    };

    const fillArticles = (collection) => {
        const idSet = new Set();
        while (idSet.size < 4) {
            const id = Math.floor(Math.random() * (20 - 1 + 1) + 1);
            idSet.add(id);
        }
        const randomArr = Array.from(idSet);
        collection.forEach((el, i) => {
            appendChar(el, data[randomArr[i]]);
        });
    };

    const articles = document.querySelectorAll(
        "article.article.char-info:not(#charInfo)"
    );
    fillArticles(articles);

    list.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if (!li) return;
        const charId = li.dataset.id;
        const charData = data.filter((el) => el.id === +charId)[0];
        const article = document.getElementById("charInfo");
        appendChar(article, charData);
    });

    input.addEventListener("focus", (e) => {
        prepareArr(e.target.value);
        appendElements(elemsToShow);
    });

    input.addEventListener("input", (e) => {
        if (e.target.value == "") {
            elemsToShow = [];
            list.innerHTML = "";
            list.classList.remove("show");
            return;
        }
        prepareArr(e.target.value);

        list.innerHTML = "";

        appendElements(elemsToShow);
    });
};

window.addEventListener("load", () => {
    getData("/character");
});

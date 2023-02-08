import axios from "axios";

const fetchRickAndMortyApi = axios.create({
    baseURL: "https://rickandmortyapi.com/api",
    headers: { "Content-Type": "application/json" },
});

fetchRickAndMortyApi.interceptors.response.use((response) => {
    if (response.status === 200) {
        console.log("Successful");
    }
    return response;
});

const getData = async (part) => {
    try {
        const response = await fetchRickAndMortyApi.get(`${part}`);
        if (part.endsWith("character")) {
            return await response.data.results;
        } else {
            return await response.data;
        }
    } catch {
        throw new Error("Fetching error");
    }
};

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

    input.addEventListener("focus", async (e) => {
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

const fillArticles = async () => {
    const articles = document.querySelectorAll(
        "article.article.char-info:not(#charInfo)"
    );
    const idSet = new Set();
    while (idSet.size < articles.length) {
        const id = Math.floor(Math.random() * (826 - 1 + 1) + 1);
        idSet.add(id);
    }
    const randomArr = Array.from(idSet);
    const data = await getData(`/character/${randomArr}`);
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

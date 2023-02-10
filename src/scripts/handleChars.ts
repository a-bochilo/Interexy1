import { all } from "axios";
import {
    getCharacterById,
    getCharactersByIdArr,
    getAllCharacters,
    ICharacterData,
} from "./apiRequest";

const appendChar = (article: HTMLElement, characterData: ICharacterData) => {
    const { name, image, gender, location, species, status, url } =
        characterData;
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

const handleCharList = (selectorId: string) => {
    const list = document.querySelector(
        `#${selectorId} ul`
    ) as HTMLUListElement | null;
    const input = document.querySelector(
        `#${selectorId} input`
    ) as HTMLInputElement | null;

    let charactersData: ICharacterData[];

    const prepareArr = (
        charactersDataArr: ICharacterData[],
        filterString?: string
    ) => {
        const regexp = new RegExp(`${filterString}`, "giu");
        const elemsToShow = charactersDataArr
            .filter((el) => regexp.test(el.name))
            .map((el) => {
                return `<li data-id=${el.id}>${el.name}</li>`;
            });

        return elemsToShow;
    };

    const appendElements = (elementsArr: string[]) => {
        elementsArr.forEach((el) => {
            list?.insertAdjacentHTML("beforeend", el);
        });
        list?.classList.add("show");
    };

    const clearList = () => {
        list ? (list.innerHTML = "") : null;
        list?.classList.remove("show");
    };

    if (list && input) {
        input.addEventListener("focus", async (e) => {
            const target = e.target as HTMLInputElement | null;
            clearList();
            const allCharactersData = await getAllCharacters();
            if (allCharactersData) charactersData = allCharactersData;
            if (target && allCharactersData) {
                const elemsToShow = prepareArr(allCharactersData, target.value);
                appendElements(elemsToShow);
            }
        });

        list.addEventListener("click", async (e) => {
            const target = e.target as HTMLElement | null;
            const li = target ? target.closest("li") : null;
            if (!li) return;
            const charId = li.dataset.id;
            const article = document.getElementById("charInfo");
            if (article && charId) {
                const charData = await getCharacterById(+charId);
                if (charData) appendChar(article, charData);
            }
        });

        input.addEventListener("input", (e) => {
            const target = e.target as HTMLInputElement | null;
            if (target?.value == "") {
                clearList();
                return;
            }
            const elemsToShow = prepareArr(charactersData, target?.value);

            list.innerHTML = "";

            appendElements(elemsToShow);
        });
    }
};

const createAndPutCharArticles = async (articlesAmount: number) => {
    const anchor = document.getElementById("charInfo") as HTMLElement | null;
    const idSet: Set<number> = new Set();
    while (idSet.size < articlesAmount) {
        const id = Math.floor(Math.random() * (800 - 1 + 1) + 1);
        idSet.add(id);
    }
    const randomIdArr = Array.from(idSet);
    const allCharactersData = await getCharactersByIdArr(randomIdArr);
    if (!allCharactersData) return;
    allCharactersData.forEach((char: ICharacterData) => {
        const article = document.createElement("article");
        article.classList.add("article", "char-info");
        appendChar(article, char);
        anchor?.after(article);
    });
};

window.addEventListener("load", () => {
    // fillExistedArticles();
    createAndPutCharArticles(5);
    handleCharList("JSON-list");
});

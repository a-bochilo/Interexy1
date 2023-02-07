const data = new Array(100000);
data.fill({ name: "name1", value: "value1" });
const extraData = new Array(100);
extraData.fill({ name: "name2", value: "value2" });
const extraData2 = new Array(100);
extraData2.fill({ name: "name3", value: "value3" });
const extraData3 = new Array(100);
extraData3.fill({ name: "name37", value: "value37" });

data.push(...extraData, ...extraData2, ...extraData3);

let storedValue;

const handleData = (id, data) => {
    const list = document.querySelector(`#${id} ul`);
    const input = document.querySelector(`#${id} input`);
    let elemsToShow = [];

    const prepareArr = (filterStr) => {
        const regexp = new RegExp(`${filterStr}`, "giu");
        elemsToShow = data
            .filter((el) => regexp.test(el.name))
            .slice(0, 10)
            .map((el) => {
                return `<li data-value=${el.value}>${el.name}</li>`;
            });
    };

    const show = (el) => {
        el.forEach((el) => {
            list.insertAdjacentHTML("beforeend", el);
        });
        list.classList.add("show");
    };

    list.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if (!li) return;
        storedValue = li.dataset.value;
        console.log(storedValue);
    });

    input.addEventListener("focus", (e) => {
        prepareArr(e.target.value);
        show(elemsToShow);
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

        show(elemsToShow);
    });
};

window.addEventListener("load", () => {
    handleData("JSON-list", data);
});

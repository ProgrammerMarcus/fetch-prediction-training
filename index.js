let attempts = 0;
let successes = 0;

async function check(value, suit) {
    const response = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1");
    const data = await response.json();
    if (document.querySelector(".unknown")) {
        document.querySelector(".unknown").remove();
    }
    document.querySelector(".guess").insertAdjacentHTML("beforeend", `<img class="unknown" src=${data.cards[0].image} alt="A card.">`);
    document.querySelector(".result").innerText = value === data.cards[0].value && suit === data.cards[0].suit ? "Result: Correct" : "Result: Incorrect";
    attempts++;
    if (value === data.cards[0].value && suit === data.cards[0].suit) {
        successes++;
    }
    document.querySelector(".score").innerText = successes + "/" + attempts;
    document.querySelector(".box").classList.add("slide")
    return { value: value === data.cards[0].value, suit: suit === data.cards[0].suit };
}

async function getOptions() {
    const response = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=52");
    const data = await response.json();
    const target = document.querySelector(".cards");
    for (card of data.cards) {
        target.insertAdjacentHTML("beforeend", `<img class="card" data-value=${card.value} data-suit=${card.suit} src=${card.image} alt="A card." />`);
    }
}

getOptions();

document.querySelector(".cards").addEventListener("click", (e) => {
    check(e.target.dataset.value, e.target.dataset.suit).then((a) => console.log(a));
});

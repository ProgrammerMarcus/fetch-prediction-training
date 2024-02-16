let attempts = 0;
let successes = 0;
let deck_id = "new"

async function check(value, suit) {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
    const data = await response.json();
    console.log(data)
    if (document.querySelector(".unknown")) {
        document.querySelector(".unknown").remove();
    }
    document.querySelector(".guess").insertAdjacentHTML("beforeend", `<img class="unknown" src=${data.cards[0].image} alt="A card.">`);
    document.querySelector(".result").innerText = value === data.cards[0].value && suit === data.cards[0].suit ? "Result: Correct" : "Result: Incorrect";
    document.querySelector(".remaining").innerText = `Remaining: ${data.remaining}`
    attempts++;
    if (value === data.cards[0].value && suit === data.cards[0].suit) {
        successes++;
    }
    document.querySelector(".score").innerText = successes + "/" + attempts + " cards guessed correctly";
    document.querySelector(".box").classList.add("slide")
    if (data.remaining === 0) {
        deck_id = "new"
    } else {
        deck_id = data.deck_id
    }
}

async function getOptions() {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`);
    const data = await response.json();
    const target = document.querySelector(".cards");
    // target.replaceChildren()
    const collator = new Intl.Collator([], {numeric: true});
    for (card of data.cards.sort((a, b) => collator.compare(a.value, b.value))) {
        target.insertAdjacentHTML("beforeend", `<img class="card" data-value=${card.value} data-suit=${card.suit} src=${card.image} alt="A card." />`);
    }
}

getOptions(52);

document.querySelector(".cards").addEventListener("click", (e) => {
    check(e.target.dataset.value, e.target.dataset.suit);
});

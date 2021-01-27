var TOTAL_CARD_COUNT = 78;
var SELECT_CARD_COUNT = 3;
var cards = [SELECT_CARD_COUNT];

document.addEventListener("DOMContentLoaded", function() {
    for(var i = 0; i < SELECT_CARD_COUNT; i++) {
        var random = Math.floor(Math.random() * TOTAL_CARD_COUNT);

        if(isSelected(random)) continue;

        cards[i] = random;
        document.getElementById("card" + (i + 1)).setAttribute("src", "image/image" + cards[i] + ".png");
    }
});

function isSelected(random) {
    for(var i = 0; i < SELECT_CARD_COUNT; i++) {
        if(cards[i] == random) return true;
    }

    return false;
}

function nextPage() {
    location.href = "Comment.html?card1=" + cards[0] + "&card2=" + cards[1] + "&card3=" + cards[2];
}
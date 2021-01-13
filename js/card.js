var TOTAL_CARD_COUNT = 78;
var COLUMN_COUNT = 10; // 카드 개수 정해주삼
var ROW_COUNT = 3; // 카드 개수 정해주삼

var currentPage = 1;
var cards = [TOTAL_CARD_COUNT];

function initCards() {
    for(var i = 0; i < cards.length; i++) {
        cards[i] = "card" + i;
    }
}

function makeHtml() {
    var html = "";
    var cardIndex = COLUMN_COUNT * ROW_COUNT * (currentPage - 1);
    if(cardIndex >= TOTAL_CARD_COUNT) return;

    for(var i = 0; i < ROW_COUNT; i++) {
        html += '<div class="rowContainer">';

        for(var j = 0; j < COLUMN_COUNT; j++) {
            html += '<img class="card" src="image/card' + cardIndex++ + '.png">'

            if(cardIndex >= TOTAL_CARD_COUNT) {
                i = ROW_COUNT;
                break;
            }
        }

        html += '</div>';
    }

    html += makeButtonHtml();

    document.querySelector(".container").innerHTML = html;
}

function makeButtonHtml() {
    var html = '<div class="buttonContainer">' +
        '<button id="previous" class="button" type="button">이전</button>';

        for(var i = 0; i < getTotalPageCount(); i++) {
            var page = i + 1;

            html += '<button id="page' + page + '" class="pageButton" type="button">' + page + '</button>'    
        }
        
    html += '<button id="next" class="button" type="button">다음</button>' +
    '</div>';

    return html;
}

document.addEventListener("DOMContentLoaded", function() {
    initCards();
    makeHtml();
    showButton();
    bindEvents();
});

function bindEvents() {
    document.querySelectorAll(".pageButton").forEach(function(element) {
        element.addEventListener("click", function() {
            for(var i = 0; i < getTotalPageCount(); i++) {
                var pageNumber = (i + 1);
                var target = document.getElementById("page" + pageNumber);

                if(target == element) currentPage = pageNumber;
            }

            selectedButtonColor();
            showButton();
        });
    });

    document.getElementById("previous").addEventListener("click", function() {
        currentPage--;

        if(currentPage <= 0 || currentPage > getTotalPageCount()) return;

        selectedButtonColor();
        showButton();
    });

    document.getElementById("next").addEventListener("click", function() {
        currentPage++;

        if(currentPage <= 0 || currentPage > getTotalPageCount()) return;

        selectedButtonColor();
        showButton();
    });
}

function selectedButtonColor() {
    for(var i = 0; i < getTotalPageCount(); i++) {
        var pageNumber = (i + 1);
        var target = document.getElementById("page" + pageNumber);

        if(pageNumber == currentPage) {
            target.style.color = "blueviolet";
            continue;
        }

        target.style.color = "#000000";
    }
}

function showButton() {
    if(currentPage == 1 && currentPage == getTotalPageCount()) {
        showPreviousButton(false);
        showNextButton(false);
    }
    else if(currentPage == 1) {
        showPreviousButton(false);
        showNextButton(true);
    }
    else if(currentPage == getTotalPageCount()) {
        showPreviousButton(true);
        showNextButton(false);
    }
    else {
        showPreviousButton(true);
        showNextButton(true);
    }
}

function getTotalPageCount() {
    var totalPage = TOTAL_CARD_COUNT / (COLUMN_COUNT * ROW_COUNT);

    return Math.ceil(totalPage);
}

function showPreviousButton(visible) {
    document.getElementById("previous").style.visibility = visible ? "visible" : "hidden";
}

function showNextButton(visible) {
    document.getElementById("next").style.visibility = visible ? "visible" : "hidden";
}

function showNext(visible) {
    document.querySelector(".next").style.display = visible ? "flex" : "none";
}
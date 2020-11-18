const observable = require("@nativescript/core").Observable;
const frameModule = require("tns-core-modules/ui/frame");
const httpModule = require("tns-core-modules/http");
const cardVM = new observable();


function goBack() {
    frameModule.Frame.topmost().goBack();
}

function getCardList() {
    httpModule.request({
        url: "https://api.pokemontcg.io/v1/cards",
        method: "GET"
    }).then((response) => {
        const cards = response.content.toJSON().cards;
        const cardList = [];
        cards.map((card) => {
            cardList.push(card);
        });

        cardVM.set("cardList", cardList);
    }, (e) => { console.error(e); });
}

function onListViewLoaded(args) {
    const listView = args.object;
}

function cardInfo(args) {
    const cardId = args.view.bindingContext.id;

    httpModule.request({
        url: `https://api.pokemontcg.io/v1/cards/${cardId}`,
        method: "GET"
    }).then((response) => {
        const cardDetail = response.content.toJSON().card;

        console.log(cardDetail);

    }, (e) => { console.error(e); });
}

function cardViewModel() {
    cardVM.goBack = () => goBack();
    cardVM.loaded = () => getCardList();
    cardVM.onListViewLoaded = (args) => onListViewLoaded(args);
    cardVM.cardInfo = (args) => cardInfo(args);
    // cardVM.selectItemTemplate = (item, index, items) => selectItemTemplate(item, index, items);

    return cardVM;
}


exports.cardViewModel = cardViewModel;
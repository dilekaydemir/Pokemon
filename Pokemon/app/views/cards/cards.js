const { on } = require("@nativescript/core/application");
const cardViewModel = require("../../shared/view-models/cards-view-model").cardViewModel;

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = cardViewModel();
}

exports.onNavigatingTo = onNavigatingTo;
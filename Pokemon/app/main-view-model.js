const Observable = require("@nativescript/core").Observable;

function onTapCardList(args) {
    const button = args.object;
    const page = button.page;
    const navigationEntry = {
        moduleName: "views/cards/cards",
        animated: true,
        // Set up a transition property on page navigation.
        transition: {
            name: "slide",
            duration: 380,
            curve: "easeIn"
        }
    };
    page.frame.navigate(navigationEntry);
}

function createViewModel() {
    const viewModel = new Observable();

    viewModel.onTapCardList = (args) => onTapCardList(args);

    return viewModel;
}

exports.createViewModel = createViewModel;
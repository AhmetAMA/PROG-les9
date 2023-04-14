class GetDataFromApi {
    url = "";
    data = null;

    constructor(newURL) {
        this.url = newURL;
    }

    async getData() {
        await fetch(this.url)
            .then(function (response) {
                return response.json();
            }).then((data) => {
                this.data = data;
            });
        return this.data;
    }
}

// const jeroen = new GetDataFromApi("/data/transactions.json");
// jeroen.getData().then(function (data) { console.log(data) });

class Header {
    headerElement;
    figureElement;
    logoIElement;
    logoHeadingElement;
    avatarWrapperElement;
    avatarBodyElement;
    avatarHeadElement;
    avatarElement;
    placeToRenderHeader;

    constructor(placeToRenderHeader) {
        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];
        this.headerElement = document.createElement("header");
        this.headerElement.classList = "header";

        this.figureElement = document.createElement("figure");
        this.figureElement.classList = "header__logo";

        this.logoIElement = document.createElement("i");
        this.logoIElement.classList = "fa-solid fa-money-bill-transfer";

        this.logoHeadingElement = document.createElement("h1");
        this.logoHeadingElement.classList = "header__banky";
        this.logoHeadingElement.innerText = "Banky";

        this.avatarWrapperElement = document.createElement("div");
        this.avatarWrapperElement.classList = "avatarWrapper";

        this.avatarElement = document.createElement("figure");
        this.avatarElement.classList = "avatar";

        this.avatarHeadElement = document.createElement("div");
        this.avatarHeadElement.classList = "avatar__head";

        this.avatarBodyElement = document.createElement("div");
        this.avatarBodyElement.classList = "avatar__body";
    }

    render() {
        this.headerElement.appendChild(this.figureElement);
        this.figureElement.appendChild(this.logoIElement);
        this.figureElement.appendChild(this.logoHeadingElement);
        this.headerElement.appendChild(this.avatarWrapperElement);
        this.avatarWrapperElement.appendChild(this.avatarElement);
        this.avatarElement.appendChild(this.avatarHeadElement);
        this.avatarElement.appendChild(this.avatarBodyElement);
        
        this.placeToRenderHeader.appendChild(this.headerElement);
    }
}

class BankyMain {
    placeToRenderBankyMain;
    leftSection;
    rightSection;

    constructor(placeToRenderBankyMain) {
        this.placeToRenderBankyMain = document.getElementsByTagName(placeToRenderBankyMain)[0];

        this.mainElement = document.createElement("main");
        this.mainElement.classList = "banky";

        this.leftSection = new BankyLeftSection(this.mainElement);
        this.rightSection = new BankyRightSection(this.mainElement, this);
    }

    makeButtonsFromData(data) {
        this.rightSection.makeButtonsFromData(data);
    }

    makeTransactionsFromData(data) {
        this.leftSection.makeTransactionsFromData(Object.entries(data)[0][0],data);
    }

    callFromRightSection(account,data) {
        this.leftSection.makeTransactionsFromData(account, data);
    }

    render() {
        //  Main
        this.placeToRenderBankyMain.appendChild(this.mainElement);
        this.leftSection.render();
        this.rightSection.render();
    }
}

class BankyLeftSection {
    mainElement;
    constructor(mainElement) {
        this.mainElement = mainElement;
        this.leftSectionElement = document.createElement("section");
        this.leftSectionElement.classList = "banky__section banky__section--left";

        this.bankyHeaderElement = document.createElement("header");
        this.bankyHeaderElement.classList = "banky__header";

        this.bankyHeaderWrapElement = document.createElement("div");

        this.bankyLogoElement = document.createElement("figure");
        this.bankyLogoElement.classList = "banky__logo";

        this.bankyLogoIElement = document.createElement("i");
        this.bankyLogoIElement.classList = "fa-solid fa-house";

        this.bankyLogoText = document.createElement("h1");
        this.bankyLogoText.classList = "banky__money";

        this.eyeButton = document.createElement("button");
        this.eyeButton.classList = "banky__eyeButton";
        this.eyeButton.onclick = this.eyeButtonClicked;

        this.eyeFigure = document.createElement("figure");
        this.eyeFigure.classList = "banky__eye";

        this.eyeI = document.createElement("i");
        this.eyeI.classList = "fa-solid fa-eye";

        this.transactionsElement = document.createElement("ul");
        this.transactionsElement.classList = "banky__transactions";
    }

    eyeButtonClicked = () => {
        this.transactionsElement.classList.toggle("banky__transactions--blur");
        this.bankyLogoText.classList.toggle("banky__money--blur");
    }

    makeTransactionsFromData(accountToShow, data) {
        let totalMoney = 0;
        for (let i = 0; i < data[accountToShow].length; i++){
            totalMoney += data[accountToShow][i]["amount"];
        }

        this.bankyLogoText.innerText = "Saldo " + "€" + totalMoney;

        //  Empty ul before we make li
        this.transactionsElement.innerHTML = "";
        for (let i = 0; i < data[accountToShow].length; i++) {
            this.transactionElement = document.createElement("li");
            this.transactionElement.classList = "banky__transaction";

            this.transactionFrom = document.createElement("h3");
            this.transactionFrom.classList = "banky__name";
            this.transactionFrom.innerText = data[accountToShow][i]["from/to"];

            this.transactionAmount = document.createElement("h3");
            this.transactionAmount.classList = "banky__amount";
            this.transactionAmount.innerText = data[accountToShow][i]["amount"];

            this.transactionsElement.appendChild(this.transactionElement);
            this.transactionElement.appendChild(this.transactionFrom);
            this.transactionElement.appendChild(this.transactionAmount);
        }
    }

    render() {
        this.mainElement.appendChild(this.leftSectionElement);
        //  Left section
        this.leftSectionElement.appendChild(this.bankyHeaderElement);
        this.bankyHeaderElement.appendChild(this.bankyHeaderWrapElement);
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoElement);
        this.bankyLogoElement.appendChild(this.bankyLogoIElement);
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoText);
        this.bankyHeaderWrapElement.appendChild(this.eyeButton);

        this.eyeButton.appendChild(this.eyeFigure);
        this.eyeFigure.appendChild(this.eyeI);
        this.leftSectionElement.appendChild(this.transactionsElement);
        
        this.transferButton = document.createElement("button");
        this.transferButton.classList = "banky__transferButton";
        this.transferButton.innerText = "Overboeken";
        this.leftSectionElement.appendChild(this.transferButton);
    }
}

class BankyRightSection {
    mainElement;
    bankyMain;

    constructor(mainElement, bankyMain) {
        this.mainElement = mainElement;
        this.bankyMain = bankyMain;
        
        //  Right Section
        this.rightSectionElement = document.createElement("section");
        this.rightSectionElement.classList = "banky__section bankt__section--right";

        this.bankyAccountsElement = document.createElement("ul");
        this.bankyAccountsElement.classList = "banky__accounts";
    }

    makeButtonsFromData(data) {
        Object.entries(data).forEach((entry) => {
            const accountName = entry[0];
            const accountTransactions = entry[1];
            const accountLogo = accountTransactions.length > 0 && accountTransactions[0].logo ? accountTransactions[0].logo : 'house';
    
            const BankyAccountElement = document.createElement("li");
            BankyAccountElement.classList = "banky__account";
            BankyAccountElement.onclick = () => {
                this.bankyMain.callFromRightSection(accountName, data);
            }
    
            const SwitchAccountButtonElement = document.createElement("button");
            SwitchAccountButtonElement.classList = "banky__switchAccount";
    
            const BankyRightLogoElement = document.createElement("figure");
            BankyRightLogoElement.classList = "banky__logo";
    
            const BankyRightLogoIconElement = document.createElement("i");
            BankyRightLogoIconElement.classList = `fa-${accountLogo} fa-solid`;
    
            const BankyBankrekeningElement = document.createElement("h4");
            BankyBankrekeningElement.classList = "banky__nameOfAccount";
            BankyBankrekeningElement.innerText = accountName;
    
            this.bankyAccountsElement.appendChild(BankyAccountElement);
            BankyAccountElement.appendChild(SwitchAccountButtonElement);
            SwitchAccountButtonElement.appendChild(BankyRightLogoElement);
            BankyRightLogoElement.appendChild(BankyRightLogoIconElement);
            BankyAccountElement.appendChild(BankyBankrekeningElement);
        });
    }

    render() {
        this.mainElement.appendChild(this.rightSectionElement);
        this.rightSectionElement.appendChild(this.bankyAccountsElement);
    }
}

class App {
    bankyHeader;
    bankyMain;
    GetDataFromApi;

    constructor() {
        this.header = new Header("body");
        this.bankyMain = new BankyMain("body");

        this.GetDataFromApi = new GetDataFromApi("./data/transactions.json");
        this.GetDataFromApi
            .getData().then((data) => {
                this.bankyMain.makeTransactionsFromData(data);
                this.bankyMain.makeButtonsFromData(data);
            });

        this.header.render();
        this.bankyMain.render();
    }
}

const app = new App();

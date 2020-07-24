let buttonDraw = document.querySelector('.dButton');
let notification = document.createElement('span');


function createDraw() {
    document.querySelector('.dButton').remove();
    let p = document.createElement('p');
    p.innerHTML = `input width & height`;
    p.className = 'paragraf'
    let inputWidth = document.createElement('input');
    inputWidth.className = 'inputWidth';
    let inputHeight = document.createElement('input');
    inputHeight.className = 'inputHeight'
    let createMinesweep = document.createElement('button');
    createMinesweep.className = 'createMinesweep'
    createMinesweep.innerHTML = `Create`;
    let pW = document.createElement('p');
    pW.innerHTML = `width:`;
    pW.className = 'pW'
    let pH = document.createElement('p');
    pH.innerHTML = `Height:`;
    pH.className = 'pH'

    document.querySelector(`div`).append(p);
    document.querySelector(`div`).append(inputWidth);
    document.querySelector(`div`).append(inputHeight);
    document.querySelector(`div`).append(createMinesweep);
    document.querySelector(`.inputWidth`).before(pW);
    document.querySelector(`.inputHeight`).before(pH);
    document.querySelector('.createMinesweep').addEventListener("click", () =>
        createTabl(inputWidth, inputHeight),
    );
}

function destroyTheButton() {

    document.querySelector(`.paragraf`).remove();
    document.querySelector(`.pW`).remove();
    document.querySelector(`.pH`).remove();
    document.querySelector(`.createMinesweep`).remove();
    document.querySelector(`.inputWidth`).remove();
    document.querySelector(`.inputHeight`).remove()

};
buttonDraw.addEventListener("click", () => createDraw());

function createTabl(inputW, inputH) {
    if (inputW.value < 0 || !isFinite(inputW.value) || inputW.value.trim() == "" || inputH.value < 0 || !isFinite(inputH.value) || inputH.value.trim() == "") {
        notification.innerHTML = `Please enter correct diameter`;
        document.querySelector("button").after(notification);
        notification.style.color = "red";
    } else {
        destroyTheButton();
        notification.remove();
        let div = document.querySelector("div");
        let container = document.createElement("div");
        container.style.marginTop = `50px`;
        container.style.width = `${(inputW.value)}px`;
        container.style.height = `${(inputH.value)}px`;
        container.style.display = "flex";
        container.style.flexWrap = "wrap";
        container.style.flexDirection = "row";
        container.style.justifyContent = "start";
        container.style.border = "1px solid grey";
        // let sideSize = `${(inputW.value)/}px`

        for (let i = 0; i < (Math.floor((inputW.value / 25) * (inputH.value / 25))); i++) {
            let cell = document.createElement("button")
            cell.className = "cell"
            cell.style.background = "gray";

            cell.style.width = `25px`;
            cell.style.height = `25px`;
            inicilCircle(cell);
            container.appendChild(cell);
            if (`${Math.floor(Math.random()*100)}` <= 16) {
                // cell.innerHTML = "b";
                // cell.style.color = "red";
                cell.setAttribute('type', 'bomb');
            }
        }
        div.appendChild(container);

    }


}


function inicilCircle(circle) {

    circle.addEventListener("click", () => {
        select(circle);
    });

};

function select(button) {

    let div = document.querySelector("div")
    let selected = div.querySelectorAll('.active');
    for (let elem of selected) {
        elem.classList.remove('active');
    }
    button.classList.add('active');
    div.querySelector(".active").style.background = "#c0c0c0";
    if (div.querySelector(".active").getAttribute("type") == 'bomb') {
        button.innerHTML = "b";
        button.style.color = "red";

        let allCell = document.querySelectorAll(".cell");
        allCell.forEach(function(element) {
            if (element.getAttribute("type") == 'bomb') {
                element.innerHTML = "b";
                element.style.color = "red";
            }
            // if (element.nextSibling.getAttribute("type") == 'bomb') {
            //     element.innerHTML = "!";
            //     element.style.color = "black";
            // }
            // if (element.previousSibling.getAttribute("type") == 'bomb') {
            //     element.innerHTML = "!";
            //     element.style.color = "black";
            // }
            element.style.background = "#c0c0c0"

        });
    }

}
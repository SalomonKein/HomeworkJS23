let buttonDraw = document.querySelector('.dButton');
let notification = document.createElement('span');


function createDraw() {
    document.querySelector('.dButton').remove();
    let p = document.createElement('p');
    p.innerHTML = `input width`;
    p.className = 'paragraf'
    let inputWidth = document.createElement('input');
    inputWidth.className = 'inputWidth';
    let inputHeight = inputWidth;
    // inputHeight.className = 'inputHeight'
    let createMinesweep = document.createElement('button');
    createMinesweep.className = 'createMinesweep'
    createMinesweep.innerHTML = `Create`;
    let pW = document.createElement('p');
    pW.innerHTML = `width:`;
    pW.className = 'pW'
        // let pH = document.createElement('p');
        // pH.innerHTML = `Height:`;
        // pH.className = 'pH'


    document.querySelector(`div`).append(p);
    document.querySelector(`div`).append(inputWidth);
    // document.querySelector(`div`).append(inputHeight);
    document.querySelector(`div`).append(createMinesweep);
    document.querySelector(`.inputWidth`).before(pW);
    // document.querySelector(`.inputHeight`).before(pH);
    document.querySelector('.createMinesweep').addEventListener("click", () =>
        createTabl(inputWidth, inputHeight),
    );
}

function destroyTheButton() {

    document.querySelector(`.paragraf`).remove();
    document.querySelector(`.pW`).remove();
    // document.querySelector(`.pH`).remove();
    document.querySelector(`.createMinesweep`).remove();
    document.querySelector(`.inputWidth`).remove();
    // document.querySelector(`.inputHeight`).remove()

};
buttonDraw.addEventListener("click", () => createDraw());

function createTabl(inputW, inputH) {
    inputW.value = 250;
    inputH.value = 250;
    if (inputW.value < 0 || !isFinite(inputW.value) || inputW.value.trim() == "" || inputH.value < 0 || !isFinite(inputH.value) || inputH.value.trim() == "") {
        notification.innerHTML = `Please enter correct width & height`;
        document.querySelector("button").after(notification);
        notification.style.color = "red";
    } else {
        destroyTheButton();
        notification.remove();

        table(inputW, inputH);
    }


    flag();
    console.log(numOfMines);
};

function table(inputW, inputH) {
    inputW.value = 250;
    inputH.value = 250;
    let div = document.querySelector("div");
    let container = document.createElement("div");
    container.className = "container";
    container.style.marginTop = `50px`;
    container.style.width = `${(inputW.value)}px`;
    container.style.height = `${(inputH.value)}px`;
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.flexDirection = "row";
    container.style.justifyContent = "start";
    container.style.border = "1px solid grey";
    // let sideSize = `${(inputW.value)/}px`
    let x = 1;
    for (let i = 0; i < (Math.floor((inputW.value / 25) * (inputH.value / 25))); i++) {
        let cell = document.createElement("button")

        cell.className = "cell";
        cell.classList.add(`c${x++}`);
        cell.style.background = "gray";
        cell.style.width = `25px`;
        cell.style.height = `25px`;
        // inicilCircle(cell);
        cell.addEventListener("click", () => {
            select(cell, );
            restartButton();
        });
        cell.oncontextmenu = function() { return false; };
        cell.addEventListener("contextmenu", () => {
            setFlagOnBomb(cell, );
        });


        container.appendChild(cell);
        if (`${Math.floor(Math.random()*100)}` <= 13) {
            cell.setAttribute('type', 'bomb');

        } else {
            cell.setAttribute('type', 'empty');
        }
    }
    div.appendChild(container);

}

function restartButton() {
    if (document.querySelector(".dButton")) {
        document.querySelector(".dButton").remove();
    };
    let button = document.createElement("button");
    button.className = "dButton";
    button.style.background = "brown";
    button.style.width = `150px`;
    button.style.height = `25px`;
    button.innerHTML = "restart";
    document.querySelector("div").append(button);
    button.addEventListener("click", () => {
        document.querySelector(".container").remove();
        createDraw();
    });
}

let width = 250;

function setFlagOnBomb(button) {
    console.log("setFlagOnBomb")
    let div = document.querySelector("div")
    let selected = div.querySelectorAll('.active');
    for (let elem of selected) {
        elem.classList.remove('active');
    }
    button.classList.add('active');

    // div.querySelector(`.active`).style.background = "#c0c0c0";
    button.innerHTML = "F";
    button.style.color = "blue";
    if (button.getAttribute('flag') == 'active') {
        button.innerHTML = "";
        button.removeAttribute("flag");
    } else {
        button.setAttribute('flag', 'active');
        button.innerHTML = "F";
        button.style.color = "yellow";
    }
}

// function inicilCircle(circle) {

//     circle.addEventListener("click", () => {
//         select(circle);
//     });

// };

function select(button, event) {

    let div = document.querySelector("div");
    let selected = div.querySelectorAll('.active');
    for (let elem of selected) {
        elem.classList.remove('active');
    }
    button.classList.add('active');
    div.querySelector(`.active`).style.background = "#c0c0c0";
    let numbForМiew = document.createElement("div");
    numbForМiew
    let cellNumber = button.className.split(" ");
    if (div.querySelector(".active").getAttribute("type") == 'bomb') {
        // button.innerHTML = "b";
        // button.style.color = "red";
        let allCell = document.querySelectorAll(".cell");
        allCell.forEach(function(element) {
            if (element.getAttribute("type") == 'bomb') {
                element.innerHTML = "b";
                element.style.color = "red";
                element.style.background = "black";
                // numberOfMines(cellNumber[1], width, div);
            }
            // element.style.background = "black";
            // event.stopImmediatePropagation();

        });

    } else if (div.querySelector(".active").getAttribute("type") == 'empty') {
        openCell(cellNumber[1], width, div)
            // let allCell = document.querySelectorAll(".cell");
            // allCell.forEach(function(element) {
            //     if (element.getAttribute("type") == 'empty') {                
            //         element.style.background = "#c0c0c0";
            //         // emptyCell(cellNumber[1], width, div);
            //     } else if (element.getAttribute("type") == 'bomb') {
            //         element.innerHTML = "b";
            //         element.style.color = "red";
            //     }
            // selectCell(cellNumber[1], width);
            // });
    } else if (div.querySelector(".active").getAttribute("type") == 'nearBomb') {
        // openCell(cellNumber[1], width, div);

        let interNumb = +(cellNumber[1].slice(1));
        countBomb(interNumb, width, div)
    }

};


function emptyCell(number, width, div) {
    let d = width / 25;
    let interNumb = +(number.slice(1));
    let cellN = interNumb - d;
    let cellN1 = interNumb - d - 1;
    let cellN2 = interNumb - d + 1;
    let cellN3 = interNumb - 1;
    let cellN4 = interNumb + 1;
    let cellN5 = interNumb + d - 1;
    let cellN6 = interNumb + d;
    let cellN7 = interNumb + d + 1;

    if (div.querySelector(`.c` + cellN).getAttribute("type") == 'empty') {
        div.querySelector(`.c` + cellN).style.background = "#c0c0c0";
    } else {
        div.querySelector(`.c` + cellN).innerHTML = "!";
    };
    if (div.querySelector(`.c` + cellN1).getAttribute("type") == 'empty') {
        div.querySelector(`.c` + cellN1).style.background = "#c0c0c0";
    } else {
        div.querySelector(`.c` + cellN1).innerHTML = "!";
    };
    if (div.querySelector(`.c` + cellN2).getAttribute("type") == 'empty') {
        console.log(cellN2);
        div.querySelector(`.c` + cellN2).style.background = "#c0c0c0";
    } else {
        div.querySelector(`.c` + cellN2).innerHTML = "!";
    };
    if (div.querySelector(`.c` + cellN3).getAttribute("type") == 'empty') {
        div.querySelector(`.c` + cellN3).style.background = "#c0c0c0";
    } else {
        div.querySelector(`.c` + cellN3).innerHTML = "!";
    };
    if (div.querySelector(`.c` + cellN4).getAttribute("type") == 'empty') {
        div.querySelector(`.c` + cellN4).style.background = "#c0c0c0";
    } else {
        div.querySelector(`.c` + cellN4).innerHTML = "!";
    };
    if (div.querySelector(`.c` + cellN5).getAttribute("type") == 'empty') {
        div.querySelector(`.c` + cellN5).style.background = "#c0c0c0";
    } else {
        div.querySelector(`.c` + cellN5).innerHTML = "!";
    };
    if (div.querySelector(`.c` + cellN6).getAttribute("type") == 'empty') {
        div.querySelector(`.c` + cellN6).style.background = "#c0c0c0";
    } else {
        div.querySelector(`.c` + cellN6).innerHTML = "!";
    };
    if (div.querySelector(`.c` + cellN7).getAttribute("type") == 'bomb') {
        div.querySelector(`.c` + cellN7).style.background = "#c0c0c0";
    } else {
        div.querySelector(`.c` + cellN7).innerHTML = "!";
    };

};
let numOfMines = 0;

function flag() {

    let div = document.querySelector("div")
    let mineFlag = document.querySelectorAll(".cell");
    mineFlag.forEach(function(element) {
        if (element.getAttribute("type") == 'bomb') {
            let cellNumber = element.className.split(" ");
            numberOfMines(cellNumber[1], width, div);
            numOfMines++;
        }

    });

};


function selectCell(number, width) {
    let d = width / 25;
    let interNumb = +(number.slice(1));
    let cellN = interNumb - d;
    let cellN1 = interNumb - d - 1;
    let cellN2 = interNumb - d + 1;
    let cellN3 = interNumb - 1;
    let cellN4 = interNumb + 1;
    let cellN5 = interNumb + d - 1;
    let cellN6 = interNumb + d;
    let cellN7 = interNumb + d + 1;
    let allCellSelect = [cellN, cellN1, cellN2, cellN3, cellN4, cellN5, cellN6, cellN7];
    // allCellSelect.forEach(function(element) {

    // });
    console.log(allCellSelect);
    console.log(number);
    return;
}

function serchBomb(cellNumb) {

    document.querySelector(`.c` + cellNumb).removeAttribute("type");
    document.querySelector(`.c` + cellNumb).setAttribute("type", 'nearBomb');


}

function openCell(number, width, div) {
    let d = width / 25;
    let interNumb = +(number.slice(1));
    let cellN = interNumb - d;
    let cellN1 = interNumb - d - 1;
    let cellN2 = interNumb - d + 1;
    let cellN3 = interNumb - 1;
    let cellN4 = interNumb + 1;
    let cellN5 = interNumb + d - 1;
    let cellN6 = interNumb + d;
    let cellN7 = interNumb + d + 1;
    let allCellSelect = [cellN4, cellN6, cellN7];
    let allCellSelect2 = [cellN, cellN1, cellN3];
    let allCellSelect3 = [cellN3, cellN4, cellN5, cellN6, cellN7];
    let allCellSelect4 = [cellN, cellN1, cellN2, cellN3, cellN4];
    let allCellSelect5 = [cellN, cellN2, cellN4, cellN6, cellN7];
    let allCellSelect6 = [cellN, cellN1, cellN3, cellN5, cellN6];
    let allCellSelect7 = [cellN, cellN1, cellN2, cellN3, cellN4, cellN5, cellN6, cellN7];
    let allCellSelect8 = [cellN3, cellN5, cellN6];


    if (interNumb == 1) {
        allCellSelect.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                countBomb(elem, width, div)
            } else {
                div.querySelector(`.c` + elem).style.background = "#c0c0c0";
                // openCell(`.c${elem}`, width, div)
            }
        });
    } else if (interNumb == d * d) {
        allCellSelect2.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                countBomb(elem, width, div)
            } else {
                div.querySelector(`.c` + elem).style.background = "#c0c0c0";
                // openCell(`.c${elem}`, width, div)
            }
        });
    } else if (interNumb <= d) {

        allCellSelect3.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                countBomb(elem, width, div)
            } else {
                div.querySelector(`.c` + elem).style.background = "#c0c0c0";
                // openCell(`.c${elem}`, width, div)
            }
        });
    } else if (interNumb > d * d - d) {
        allCellSelect4.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                countBomb(elem, width, div)
            } else {
                div.querySelector(`.c` + elem).style.background = "#c0c0c0";
                // openCell(`.c${elem}`, width, div)
            }
        });
    } else if ((interNumb % d) == 1) {
        allCellSelect5.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                countBomb(elem, width, div)
            } else {
                div.querySelector(`.c` + elem).style.background = "#c0c0c0";
                // openCell(`.c${elem}`, width, div)
            }
        });
    } else if ((interNumb % d) == 0) {
        allCellSelect6.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                countBomb(elem, width, div)

            } else {
                div.querySelector(`.c` + elem).style.background = "#c0c0c0";
                // openCell(`.c${elem}`, width, div)
            }
        });
    } else if (interNumb == d) {
        allCellSelect8.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                countBomb(elem, width, div)

            } else {
                div.querySelector(`.c` + elem).style.background = "#c0c0c0";
                // openCell(`.c${elem}`, width, div)
            }
        });
    } else {
        allCellSelect7.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                countBomb(elem, width, div)
            } else {
                div.querySelector(`.c` + elem).style.background = "#c0c0c0";
                // openCell(`.c${elem}`, width, div)
            }
        });
    }
    // else {
    //     allCellSelect7.forEach(elem => {

    //             // div.querySelector(`.c` + elem).style.background = "#c0c0c0";
    //             openCell(`c${elem}`, width, div)

    //     });
    // };
    // if (div.querySelector(`.c` + cellN).getAttribute("type") == 'nearBomb') {
    //     countBomb(cellN, width, div)
    // }
    // if (div.querySelector(`.c` + cellN1).getAttribute("type") == 'nearBomb') {
    //     countBomb(cellN1, width, div)
    // }
    // if (div.querySelector(`.c` + cellN2).getAttribute("type") == 'nearBomb') {
    //     countBomb(cellN2, width, div)
    // }
    // if (div.querySelector(`.c` + cellN3).getAttribute("type") == 'nearBomb') {
    //     countBomb(cellN3, width, div)
    // }
    // if (div.querySelector(`.c` + cellN4).getAttribute("type") == 'nearBomb') {
    //     countBomb(cellN4, width, div)
    // }
    // if (div.querySelector(`.c` + cellN5).getAttribute("type") == 'nearBomb') {
    //     countBomb(cellN5, width, div)
    // }
    // if (div.querySelector(`.c` + cellN6).getAttribute("type") == 'nearBomb') {
    //     countBomb(cellN6, width, div)
    // }
    // if (div.querySelector(`.c` + cellN7).getAttribute("type") == 'nearBomb') {
    //     countBomb(cellN7, width, div)
    // } else {
    //     div.querySelector(`.c` + cellN).style.background = "#c0c0c0";
    //     openCell(`c${cellN}`, width, div)
    // }
};

function countBomb(number, width, div) {
    let d = width / 25;
    let interNumb = number;
    let cellN = interNumb - d;
    let cellN1 = interNumb - d - 1;
    let cellN2 = interNumb - d + 1;
    let cellN3 = interNumb - 1;
    let cellN4 = interNumb + 1;
    let cellN5 = interNumb + d - 1;
    let cellN6 = interNumb + d;
    let cellN7 = interNumb + d + 1;
    let count = 0;
    let allCellSelect = [cellN4, cellN6, cellN7];
    let allCellSelect2 = [cellN, cellN1, cellN3];
    let allCellSelect3 = [cellN3, cellN4, cellN5, cellN6, cellN7];
    let allCellSelect4 = [cellN, cellN1, cellN2, cellN3, cellN4];
    let allCellSelect5 = [cellN, cellN2, cellN4, cellN6, cellN7];
    let allCellSelect6 = [cellN, cellN1, cellN3, cellN5, cellN6];
    let allCellSelect7 = [cellN, cellN1, cellN2, cellN3, cellN4, cellN5, cellN6, cellN7];
    let allCellSelect8 = [cellN3, cellN5, cellN6];

    if (interNumb == 1) {


        if (div.querySelector(`.c` + cellN4).getAttribute("type") == 'bomb') {
            count++
        };

        if (div.querySelector(`.c` + cellN6).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN7).getAttribute("type") == 'bomb') {
            count++
        };


    } else if (interNumb == d * d) {

        if (div.querySelector(`.c` + cellN).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN1).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN3).getAttribute("type") == 'bomb') {
            count++
        };

    } else if (interNumb <= d) {


        if (div.querySelector(`.c` + cellN3).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN4).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN5).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN6).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN7).getAttribute("type") == 'bomb') {
            count++
        };


    } else if (interNumb > d * d - d) {

        if (div.querySelector(`.c` + cellN).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN1).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN2).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN3).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN4).getAttribute("type") == 'bomb') {
            count++
        };

    } else if ((interNumb % d) == 1) {

        if (div.querySelector(`.c` + cellN).getAttribute("type") == 'bomb') {
            count++
        };

        if (div.querySelector(`.c` + cellN2).getAttribute("type") == 'bomb') {
            count++
        };

        if (div.querySelector(`.c` + cellN4).getAttribute("type") == 'bomb') {
            count++
        };

        if (div.querySelector(`.c` + cellN6).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN7).getAttribute("type") == 'bomb') {
            count++
        };


    } else if ((interNumb % d) == 0) {

        if (div.querySelector(`.c` + cellN).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN1).getAttribute("type") == 'bomb') {
            count++
        };

        if (div.querySelector(`.c` + cellN3).getAttribute("type") == 'bomb') {
            count++
        };

        if (div.querySelector(`.c` + cellN5).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN6).getAttribute("type") == 'bomb') {
            count++
        };

    } else if (d < interNumb > d * d - d || (interNumb % d) !== 0 || (interNumb % d) !== 1) {

        if (div.querySelector(`.c` + cellN).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN1).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN2).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN3).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN4).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN5).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN6).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN7).getAttribute("type") == 'bomb') {
            count++
        };



    } else if (interNumb == d) {

        if (div.querySelector(`.c` + cellN3).getAttribute("type") == 'bomb') {
            count++
        };

        if (div.querySelector(`.c` + cellN5).getAttribute("type") == 'bomb') {
            count++
        };
        if (div.querySelector(`.c` + cellN6).getAttribute("type") == 'bomb') {
            count++
        };
    }

    document.querySelector(".c" + number).innerHTML = `${count}`;
    div.querySelector(".c" + number).style.background = "#c0c0c0";

}

function numberOfMines(number, width, div) {
    let d = width / 25;
    let interNumb = +(number.slice(1));
    let cellN = interNumb - d;
    let cellN1 = interNumb - d - 1;
    let cellN2 = interNumb - d + 1;
    let cellN3 = interNumb - 1;
    let cellN4 = interNumb + 1;
    let cellN5 = interNumb + d - 1;
    let cellN6 = interNumb + d;
    let cellN7 = interNumb + d + 1;
    let allCellSelect = [cellN4, cellN6, cellN7];
    let allCellSelect2 = [cellN, cellN1, cellN3];
    let allCellSelect3 = [cellN3, cellN4, cellN5, cellN6, cellN7];
    let allCellSelect4 = [cellN, cellN1, cellN2, cellN3, cellN4];
    let allCellSelect5 = [cellN, cellN2, cellN4, cellN6, cellN7];
    let allCellSelect6 = [cellN, cellN1, cellN3, cellN5, cellN6];
    let allCellSelect7 = [cellN, cellN1, cellN2, cellN3, cellN4, cellN5, cellN6, cellN7];
    let allCellSelect8 = [cellN3, cellN5, cellN6];
    if (interNumb == 1) {
        allCellSelect.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'empty' || div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                serchBomb(elem);
            };
        });
    } else if (interNumb == d * d) {
        allCellSelect2.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'empty' || div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                serchBomb(elem);
            };
        });
    } else if (interNumb <= d) {
        allCellSelect3.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'empty' || div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                serchBomb(elem);
            };
        });
    } else if (interNumb > d * d - d) {
        allCellSelect4.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'empty' || div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                serchBomb(elem);
            };
        });
    } else if ((interNumb % d) == 1) {
        allCellSelect5.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'empty' || div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                serchBomb(elem);
            };
        });
    } else if ((interNumb % d) == 0) {
        allCellSelect6.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'empty' || div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                serchBomb(elem);
            };
        });
    } else if (interNumb == d) {
        allCellSelect8.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'empty' || div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                serchBomb(elem);
            };
        });
    } else {
        allCellSelect7.forEach(elem => {
            if (div.querySelector(`.c` + elem).getAttribute("type") == 'empty' || div.querySelector(`.c` + elem).getAttribute("type") == 'nearBomb') {
                serchBomb(elem);
            };
        });
    };




};


// function numberOfMines(number, width, div) {
//     let d = width / 25;
//     let interNumb = +(number.slice(1));
//     let cellN = interNumb - d;
//     let cellN1 = interNumb - d - 1;
//     let cellN2 = interNumb - d + 1;
//     let cellN3 = interNumb - 1;
//     let cellN4 = interNumb + 1;
//     let cellN5 = interNumb + d - 1;
//     let cellN6 = interNumb + d;
//     let cellN7 = interNumb + d + 1;

//     if (interNumb == 1) {
//         if (div.querySelector(`.c` + cellN4).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN4).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN4).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN6).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN6).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN6).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN7).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN7).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN7).innerHTML = "!";
//         }
//     } else if (interNumb == d * d) {
//         console.log(d * d);
//         if (div.querySelector(`.c` + cellN).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN1).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN1).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN1).innerHTML = "!";
//         };

//         if (div.querySelector(`.c` + cellN3).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN3).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN3).innerHTML = "!";
//         };
//     } else if (interNumb < d) {
//         if (div.querySelector(`.c` + cellN3).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN3).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN3).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN4).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN4).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN4).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN5).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN5).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN5).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN6).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN6).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN6).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN7).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN7).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN7).innerHTML = "!";
//         };
//     } else if (interNumb > d * d - d) {
//         if (div.querySelector(`.c` + cellN).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN1).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN1).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN1).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN2).getAttribute("type") == 'bomb') {
//             console.log(cellN2);
//             div.querySelector(`.c` + cellN2).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN2).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN3).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN3).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN3).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN4).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN4).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN4).innerHTML = "!";
//         };

//     } else if ((interNumb % d) == 1) {
//         console.log(`int=${interNumb % d}`);
//         if (div.querySelector(`.c` + cellN).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN).innerHTML = "!";
//         };

//         if (div.querySelector(`.c` + cellN2).getAttribute("type") == 'bomb') {
//             console.log(cellN2);
//             div.querySelector(`.c` + cellN2).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN2).innerHTML = "!";
//         };

//         if (div.querySelector(`.c` + cellN4).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN4).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN4).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN6).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN6).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN6).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN7).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN7).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN7).innerHTML = "!";
//         };
//     } else if ((interNumb % d) == 0) {
//         console.log(`int=${interNumb % d}`);
//         if (div.querySelector(`.c` + cellN).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN1).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN1).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN1).innerHTML = "!";
//         };

//         if (div.querySelector(`.c` + cellN3).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN3).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN3).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN5).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN5).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN5).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN6).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN6).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN6).innerHTML = "!";
//         };

//     } else {
//         if (div.querySelector(`.c` + cellN).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN1).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN1).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN1).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN2).getAttribute("type") == 'bomb') {
//             console.log(cellN2);
//             div.querySelector(`.c` + cellN2).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN2).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN3).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN3).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN3).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN4).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN4).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN4).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN5).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN5).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN5).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN6).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN6).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN6).innerHTML = "!";
//         };
//         if (div.querySelector(`.c` + cellN7).getAttribute("type") == 'bomb') {
//             div.querySelector(`.c` + cellN7).innerHTML = "b";
//         } else {
//             div.querySelector(`.c` + cellN7).innerHTML = "!";
//         };
//     };




// };
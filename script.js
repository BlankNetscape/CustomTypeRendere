class vector2D{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

const ONLY_UPPERCASE = true;
const FORM = document.getElementById("mainForm");
const canvas = document.getElementById("cnv");
const ctx = canvas.getContext('2d');
let alph = {};


document.getElementById("upload").addEventListener("change", handleFiles);

function handleFiles() {
    const fileList = this.files; /* now you can work with the file list */
    fileList[0].text().then(onFulfilled);
    function onFulfilled(result){ 
        console.log(result);
        alph = JSON.parse(result);
        document.getElementById("run").disabled = false;
    }
}


function foo() {
    let userInput = FORM.querySelector('[name="userInput"]');
    userInput = userInput.value; 
    if (userInput.length == 0) return;

    //NOTE: REMOVE WHITESPACES, ONLY KEEP NEEDED SYMBOLS (ADDITIONALY CONVERT TO UPPERCASE)
    parsed = ONLY_UPPERCASE ? userInput : userInput.toUpperCase();
    parsed = parsed.replace(/[^a-zA-Z\s]+/g, '');
    parsed = parsed.replace(/^\s+|\s+$|\s+(?=\s)|/g, "");
    if(parsed.length == 0) return;

    //NOTE: SHOW PARSED/CONVERTED TEXT
    let outputWrap = FORM.querySelector('span');
    outputWrap.hidden = false;
    outputWrap.children[1].textContent = parsed;

    let chars = parsed.split('');
    let pointer = new vector2D(0,0);
    let spacing = 5;
    let scale = 0.5;

    ctx.reset();
    ctx.beginPath();

    chars.forEach(c => {
        if(c==' ') c = 'space';
        ctx.moveTo(alph[c].path[0].x*scale + pointer.x,   alph[c].path[0].y*scale);
        for (let point = 1; point < alph[c].path.length; point++) {
            ctx.lineTo(alph[c].path[point].x*scale + pointer.x,   alph[c].path[point].y*scale);
        }
        pointer.x = pointer.x + alph[c].width*scale + spacing;
    });
    ctx.stroke();


    return;
}

function clearInput() {
    let userInput = FORM.querySelector('[name="userInput"]');
    userInput.value = ""; 
    let outputWrap = FORM.querySelector('span');
    outputWrap.hidden = true;
    clearCanvas();
}

function clearCanvas() {
    ctx.reset();
}


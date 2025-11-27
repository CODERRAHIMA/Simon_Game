let gameSeq=[];
let userSeq=[];

let btns = ["red","yellow","green","purple"];

let started=false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(!started){
        started = true;
        
        levelUp();
    }
});

function btnFlash(randBtn){
    randBtn.classList.add("flash");
    setTimeout(function(){
        randBtn.classList.remove("flash");
    },250)
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randInd = Math.floor(Math.random()*3);
    let randColor = btns[randInd];
    let randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn);

    gameSeq.push(randColor);
    console.log(gameSeq);
}

function btnPress(){
    let btn = this;
    btnFlash(btn);

    userSeq.push(btn.getAttribute("id"));

    checkAns(userSeq.length-1);
}

let allBtn = document.querySelectorAll(".btn");
for(btn of allBtn){
    btn.addEventListener('click', btnPress);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp,1000);
        }

    } else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "whitesmoke";
        }, 200);

        if(level>highestScore){
            highestScore = level;
            document.querySelector("h3").innerText = `Highest score: ${highestScore}`;
        }
        reset();
    }
}
function reset(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}
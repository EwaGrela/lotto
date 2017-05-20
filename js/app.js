document.addEventListener("DOMContentLoaded", function(e){
    const body = document.querySelector("body");
    const section = document.querySelector("section");
    const articleLotto = document.querySelector(".lotto");
    const articleBalls = document.querySelector(".balls");
    const numbers = [];
    const balls = document.getElementsByClassName("ball");
    const drawnNums = [];
    const chosenByMachine = [];
    function createNumberBoard(number){
        const board = document.createElement("div");
        board.classList.add("board");
        articleLotto.append(board);
        for( let i = 0; i<number; i ++){
            const boardEl = document.createElement("button");
            boardEl.classList.add("boardEl");
            board.append(boardEl);
        }
        const boardEls = document.getElementsByClassName("boardEl");
        for( let i =0; i<boardEls.length; i++){
            boardEls[i].setAttribute("data-number", i+1);
            const dataNumber = boardEls[i].getAttribute("data-number");
            const number = parseInt(dataNumber, 10);
            numbers.push(number);
            boardEls[i].textContent = number;
        }
    }
    createNumberBoard(49); 

    const board = document.querySelector(".board");
    const boardEls = document.querySelectorAll(".boardEl");
    function drawNumbers(){
        boardEls.forEach(boardEl => boardEl.addEventListener("click", selectNums));
        function selectNums(){
            const number = parseInt(this.dataset.number, 10);
            if(this.hasAttribute("data-number")){
                drawnNums.push(number);
                this.removeAttribute("data-number");
                this.classList.add("crossedOut");

            } 
            if(drawnNums.length=== 6){
                boardEls.forEach( boardEl => boardEl.removeAttribute("data-number")); 
                boardEls.forEach(boardEl => boardEl.addEventListener("click", makeAlert));
                let startDraw = document.querySelector(".startDraw");
                if(startDraw === null){ // you have to prevent creating the button if it is already there!
                    createButtonForMachineDraw();
                } else {
                    return;
                }
                

            }
            
        }
        
        return drawnNums;

    }
    drawNumbers();

    function makeAlert() {
    	const alertBox = document.createElement("div");
    	board.append(alertBox);
    	alertBox.classList.add("alertBox");
    	alertBox.textContent = "you already chose 6!"
    	const timeout = setTimeout(()=>{
    		alertBox.parentNode.removeChild(alertBox);
    	}, 1500);
    }

    function machineDraw(){
        for( let i =0; i<6; i++){
            const idx = Math.floor(Math.random() * numbers.length)
            chosenByMachine.push(numbers[idx]);
            /*a very important line of code which prevents machine from drawing the same number again 
             */
            numbers.splice(idx,1); 
            console.log(numbers)
            /*this line of code allows to check if numbers are taken out*/
        }
        const btnToRemove = document.querySelector(".startDraw");
        
        btnToRemove.classList.add("invisible"); 
        /* why not remove it entirely? because it might then be accidentally created if for some reason you happen to try to click on board!!! and you may do that*/
        return chosenByMachine;

    }
    //machineDraw();

    function createButtonForMachineDraw(){
    	const startDraw = document.createElement("button");
    	startDraw.classList.add("startDraw");
    	section.append(startDraw);
    	startDraw.textContent ="release the balls";
    	startDraw.addEventListener("click", machineDraw);
    	startDraw.addEventListener("click", compareArrays);
    	
    }

    function compareArrays(){     
        for( let i =0; i<balls.length; i++){
            balls[i].textContent = chosenByMachine[i];
            setTimeout(()=>{
                balls[i].classList.remove("invisible");
            }, 1000*(i+1));
        }
        const common =[];
        const arr1 = chosenByMachine;
        const arr2 = drawnNums;
            for(let i = 0; i<arr1.length; i++){
                for(let j= 0; j<arr2.length; j++){
                    if(arr1[i]===arr2[j]){ 
                        common.push(arr1[i]);
                    }
                }
            }
            console.log(arr1, arr2, common); /* you can monitor your arrays in console*/
            function generateResult(){
                const resultsBoard = document.createElement("article");
                section.append(resultsBoard);
                const paragraph = document.createElement("p");
                resultsBoard.append(paragraph);
                resultsBoard.classList.add("resultsBoard");
                resultsBoard.classList.add("invisible");
                if( common.length===0){
                    paragraph.textContent ="Oh, dear!  " + common.length + " balls and zero cash ";
                } else if( common.length >0 && common.length< 3){
                    paragraph.textContent ="Outta luck, only " + common.length + " , still no cash ";
                } else if(common.length ===3) {
                    paragraph.textContent ="Not bad, " + common.length + " , here's your twenty ";
                } else if(common.length ===4){
                    paragraph.textContent ="Not bad, " + common.length + " , here's your hundred ";
                } else if( common.length ===5){
                    paragraph.textContent ="Not bad, " + common.length + " , here's your thousand ";
                }
                else if(common.length===6){
                    paragraph.textContent ="A true winner " + common.length + " here's your million";
                }
            }
        const timeout = setTimeout(()=>{
            makeComebackBtn();
            document.querySelector(".resultsBoard").classList.remove("invisible"); //well, you cannot acces this outside the code
        }, 8000)
        generateResult();
        

        
    }
    
    function makeComebackBtn(){
        const comebackBtn = document.createElement("a");
        comebackBtn.classList.add("comebackBtn");
        section.append(comebackBtn);
        comebackBtn.textContent ="again"
        comebackBtn.setAttribute("href", "https://ewagrela.github.io/lotto/");
    }
    

})
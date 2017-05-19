document.addEventListener("DOMContentLoaded", function(e){
    const body = document.querySelector("body");
    const section = document.querySelector("section");
    const articleLotto = document.getElementsByTagName("article")[0];
    console.log(articleLotto);
    const articleBalls = document.getElementsByTagName("article")[1];
    const numbers = [];
    const balls = document.getElementsByClassName("ball");
    const drawnNums = [];
    const chosenByMachine = [];
    function createNumberBoard(number){
        const board = document.createElement("div");
        board.classList.add("board");
        articleLotto.append(board);
        for( let i = 0; i<number; i ++){
            const div = document.createElement("div");
            div.classList.add("boardDiv");
            board.append(div);
        }
        const boardDivs = document.getElementsByClassName("boardDiv");
        for( let i =0; i<boardDivs.length; i++){
            boardDivs[i].setAttribute("data-number", i+1);
            const number = boardDivs[i].getAttribute("data-number");
            numbers.push(number);
            boardDivs[i].textContent = number;
        }
    }
    createNumberBoard(49); //ten for now, we are checking how to eliminate the same -done! :)

    const board = document.querySelector(".board");
    const boardDivs = document.querySelectorAll(".boardDiv");
    function drawNumbers(){
        boardDivs.forEach(boardDiv => boardDiv.addEventListener("click", selectNums));
        function selectNums(){
            const number = parseInt(this.dataset.number, 10);
            if(this.hasAttribute("data-number")){
                drawnNums.push(number);
                this.removeAttribute("data-number");
                this.classList.add("crossedOut");

            } 
            if(drawnNums.length=== 6){
                boardDivs.forEach( boardDiv => boardDiv.removeAttribute("data-number")); 
                boardDivs.forEach(boardDiv => boardDiv.addEventListener("click", makeAlert));
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
        const numbers = [];
        for( let i =0; i<boardDivs.length; i++){
            numbers.push(i+1);
        }

        for( let i =0; i<6; i++){
            const idx = Math.floor(Math.random() * numbers.length)
            chosenByMachine.push(numbers[idx]);
            numbers.splice(idx,1);

        }
        const btnToRemove = document.querySelector(".startDraw");
        //btnToRemove.parentNode.removeChild(btnToRemove);
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
            const tim1 = setTimeout(()=>{
                balls[0].classList.remove("invisible");
            }, 1000);
            const tim2 = setTimeout(()=>{
                balls[1].classList.remove("invisible");
            }, 2000);
            const tim3 = setTimeout(()=>{
                balls[2].classList.remove("invisible");
            }, 3000);
            const tim4 = setTimeout(()=>{
                balls[3].classList.remove("invisible");
            }, 4000);
            const tim5 = setTimeout(()=>{
                balls[4].classList.remove("invisible");
            }, 5000);
            const tim6 = setTimeout(()=>{
                balls[5].classList.remove("invisible");
            }, 6000);
        for( let i =0; i<balls.length; i++){
            //balls[i].classList.remove("invisible");
            balls[i].textContent = chosenByMachine[i];
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
        console.log("make a button in the morning");
        const comebackBtn = document.createElement("a");
        comebackBtn.classList.add("comebackBtn");
        section.append(comebackBtn);
        comebackBtn.textContent ="again"
        comebackBtn.setAttribute("href", "https://ewagrela.github.io/lotto/");
    }
    

})
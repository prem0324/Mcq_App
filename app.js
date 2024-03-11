const question=document.querySelector(".question h2");
const displayOption=document.querySelector(".options");
const nextBtn=document.querySelector(".next-btn");
let Allquestions;
let currentQuestionIndex=0;
let counter=0;
fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
.then(async (data)=>{
    const response=await data.json();
    return response;
})
.then((response)=>{

     Allquestions=response.results;
     curreQuestion();
})

function curreQuestion(){
    
    question.innerText=Allquestions[currentQuestionIndex].question;
    const options=[...Allquestions[currentQuestionIndex].incorrect_answers,Allquestions[currentQuestionIndex].correct_answer];
    options.sort(()=>Math.random-0.5);
    options.forEach((option)=>{
        const optionElement=document.createElement("button");
        optionElement.setAttribute('class','btn');
        optionElement.innerText=option;
        displayOption.append(optionElement);


        optionElement.addEventListener('click',()=>{
            const opt=document.querySelectorAll('.btn')

            opt.forEach((btn)=>{
                if(btn.innerText===Allquestions[currentQuestionIndex].correct_answer){
                    btn.style.border="2px solid green"
                }
                
                btn.disabled=true;

            })
            if(optionElement.innerText===Allquestions[currentQuestionIndex].correct_answer){
                counter++;
                optionElement.style.border="2px solid green"
            }
            else{
                optionElement.style.border="2px solid red"
            }
        })
    })

}

nextBtn.addEventListener('click',()=>{
    if(currentQuestionIndex===9){
        nextBtn.style.display="none";
        displayOption.innerHTML=""
        question.innerText=`You Scored ${counter}/10`;   
    }
    currentQuestionIndex++;

    displayOption.innerHTML=""
    curreQuestion();
})

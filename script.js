
let chosenPile;
let chosenQuestion; 

document.querySelector('.back').addEventListener('click', () => { 
    location.reload();    
})

async function getData() {
    let response = await fetch('./PickAPile.json');
    let data = await response.json();

    //getting all questions from JSON --------------------------------
    for (let i = 0; i < data.Questions.length; i++) { 
        document.querySelector('.questions').innerHTML +=
            `<div class="question">${data.Questions[i].QuestionName}</div>`;
        
    }
    let questions = document.querySelectorAll('.question');
    questions.forEach((question, i) => {
        
        question.addEventListener('click', () => { 
           
            document.querySelector('.questions').style.display = 'none';

            document.querySelector('.question-head').innerHTML = 'တစ်ပုံတည်းကိုသာ သေချာအာရုံစိုက်၍ ရွေးချယ်ပေးပါ🧘🏻‍♀️';

            document.querySelector('.back').style.display = 'block';

            document.querySelector('.pile-body').style.display = 'flex';

            chosenQuestion = i+1;

            getPile();
            
        });
    })

    //----------------------------------------------------------------

    function getPile() {
        for (var j = 0; j < data.Answers.length; j++){

        console.log(chosenQuestion);
        
        if (data.Answers[j].QuestionId == chosenQuestion) {
            
            document.querySelector('.pile-body').innerHTML +=
                `<div class="pile">
                <img src="${data.Answers[j].AnswerImageUrl}" alt="">
                </div>`;    
            
        }

    }

    let piles = document.querySelectorAll('.pile');
    piles.forEach((pile, i) => {
        pile.addEventListener('click', () => {

        chosenPile = `Pile-${i+1}`;

        document.querySelector('.pile-body').style.display = 'none';

        document.querySelector('.question-head').style.display = 'none';

        document.querySelector('.back').style.display = 'block';

        document.querySelector('.answer-body').style.display = 'block';
            
            getAnswer();
        });
        
    })
}

    
    function getAnswer() {
       
        for (var a = 0; a < data.Answers.length; a++) { 

            // console.log(chosenQuestion);
            // console.log(chosenPile);
            if (data.Answers[a].QuestionId == chosenQuestion && data.Answers[a].AnswerName == chosenPile ) {
                
                document.querySelector('.answer').innerHTML = data.Answers[a].AnswerDesp;

                document.querySelector('.ans-pile').innerHTML = `<img src="${data.Answers[a].AnswerImageUrl}" alt="">`;
                
            }
        }
    }
    
}
getData();
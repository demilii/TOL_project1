const btn = document.querySelector('#_choiceC')
const feedback = document.querySelector('#feedback')
const btn1 = document.querySelector('#_choiceA')
const btn2 = document.querySelector('#_choiceB')
const btn3 = document.querySelector('#_choiceD')

btn.addEventListener('click', ()=>{
    feedback.innerText = "Correct! According to the formula of compound interest, P = $2500, r = 20%, n = 2, so, A = 2500*(1 + 0.2)2 = 1100. I = 2500+1100 = $3600. Therefore, the total amount would be $3,600."
    feedback.style.padding = "20px";
})

btn1.addEventListener('click', ()=>{
    feedback.innerText = "According to the formula of compound interest, P = $2500, r = 20%, n = 2, so, A = 2500*(1 + 0.2)2 = 1100. I = 2500+1100 = $3600. Therefore, the total amount would be $3,600."
    feedback.style.padding = "20px";
})

btn2.addEventListener('click', ()=>{
    feedback.innerText = "According to the formula of compound interest, P = $2500, r = 20%, n = 2, so, A = 2500*(1 + 0.2)2 = 1100. I = 2500+1100 = $3600. Therefore, the total amount would be $3,600."
    feedback.style.padding = "20px";
})

btn3.addEventListener('click', ()=>{
    feedback.innerText = "According to the formula of compound interest, P = $2500, r = 20%, n = 2, so, A = 2500*(1 + 0.2)2 = 1100. I = 2500+1100 = $3600. Therefore, the total amount would be $3,600."
    feedback.style.padding = "20px";
})
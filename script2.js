function check() {
    let value = document.getElementById("myTextArea").value
    let p = document.createElement("p");
    if (value == "") {
        if (document.getElementById("feedback").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("feedback").appendChild(p);
            document.getElementById("feedback").getElementsByTagName("P")[0].innerText = "Fill in Something";
            document.getElementById("feedback").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("feedback").getElementsByTagName("P")[0].innerText = "Fill in Something";
        }
    } else {
        if (document.getElementById("feedback").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("feedback").appendChild(p);
            document.getElementById("feedback").getElementsByTagName("P")[0].innerText = "Well done! Jack will get $1000 back after 5 years with simple interest. Remember the formula of the simple interest is I = prt. In this case, p(investment) = $20,000, r(interest rate) = 10%, t = 5, so the answer should be I = 20,000*0.1*5 = $1000.";
            document.getElementById("feedback").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("feedback").getElementsByTagName("P")[0].innerText = "Well done! Jack will get $1000 back after 5 years with simple interest. Remember the formula of the simple interest is I = prt. In this case, p(investment) = $20,000, r(interest rate) = 10%, t = 5, so the answer should be I = 20,000*0.1*5 = $1000.";
        }
    }
}
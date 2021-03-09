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
            document.getElementById("feedback").getElementsByTagName("P")[0].innerText = "As you can see on the dynamic graph, the compound interest does not always brings higher benefits than simple interest in a certain period of time. The result depends on interest rate, initial principal, and time. Within the same period of saving time, and the same amount of initial principal investment, if the interest rate for compound interest is much smaller than simple interest, will compound interest still brings higher benefits than simple interest?";
            document.getElementById("feedback").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("feedback").getElementsByTagName("P")[0].innerText = "As you can see on the dynamic graph, the compound interest does not always brings higher benefits than simple interest in a certain period of time. The result depends on interest rate, initial principal, and time. Within the same period of saving time, and the same amount of initial principal investment, if the interest rate for compound interest is much smaller than simple interest, will compound interest still brings higher benefits than simple interest?";
        }
    }
}
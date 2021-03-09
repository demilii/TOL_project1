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
            document.getElementById("feedback").getElementsByTagName("P")[0].innerText = "Use the simple interest formula with given initial principal, interest rate and time.";
            document.getElementById("feedback").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("feedback").getElementsByTagName("P")[0].innerText = "Use the simple interest formula with given initial principal, interest rate and time.";
        }
    }
}
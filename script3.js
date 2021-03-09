// calculate the compound interest
function compound_interest(n) {
    let principal = 1000;
    for (let i = 0; i < n; i++) {
        principal = principal * 1.12;
    }
    return principal.toFixed(3);
}

// create the dataset to visualize
let ydata0, ydata1, ydata2, ydata3;
y_data0 = compound_interest(0);
y_data1 = compound_interest(1);
y_data2 = compound_interest(2);
y_data3 = compound_interest(3);
let data = [{ time: 0, savings: y_data0 },
{ time: 1, savings: y_data1 },
{ time: 2, savings: y_data2 },
{ time: 3, savings: y_data3 }
]


//data visualization of the chart
let w = 560;
let h = 400;
let padding = 50;

let viz = d3.select("#charts")
    .append("svg")
    .style("width", w)
    .style("height", h)
    .style("display", "block")
    .style("margin", "auto"); //center the vis
viz.append("text")
    .attr("text-align", "center")
    .attr("font-size", "20px")
    .attr("transform", "translate(187,15)")
    .text("Mrs. Wendi's Savings");
let allNames = data.map(function (d) { return d.time; });
let xScale = d3.scaleBand()
    .domain(allNames)
    .range([2 * padding, w - 2 * padding])
    .paddingInner(0.3)
    ;
// create a visual axis corresponding to the scale.
let xAxis = d3.axisBottom(xScale);
let xAxisGroup = viz.append("g")
    .classed("xAxis", true);
xAxisGroup.call(xAxis)
    .append("text")
    .attr("x", w - padding * 2)
    .attr("dy", "3em")
    .style("text-anchor", "end")
    .text("Time / year")
    .attr("fill", "black");
// xAxisGroup.text("Time");
xAxisGroup.selectAll("text")
    .attr("font-size", 12);
xAxisGroup.attr("transform", "translate(0," + (h - padding) + ")");


let yMax = d3.max(data, function (d) { return d.savings; });
let yMin = d3.min(data, function (d) { return d.savings; });

yDomain = [yMin / 2, yMax + 100];
let yScale = d3.scaleLinear()
    .domain(yDomain)
    .range([h - padding * 2, 0]);

let yAxis = d3.axisLeft(yScale);
let yAxisGroup = viz.append("g")
    .classed("yAxis", true);
yAxisGroup.call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "-5em")
    .style("text-anchor", "end")
    .text("Savings / $")
    .attr("fill", "black");

yAxisGroup.selectAll("text")
    .attr("font-size", 12);
yAxisGroup.attr("transform", "translate(" + 2 * padding + "," + padding + ")");


let graphGroup = viz.append("g")
    .classed("graphGroup", true);
let elementsForPage = graphGroup.selectAll(".datapoint")
    .data(data);

// console.log(elementsForPage);
let enteringElements = elementsForPage.enter();
let exitingElements = elementsForPage.exit();
let enteringDataGroups = enteringElements.append("g")
    .classed("datapoint", true);
enteringDataGroups.attr("transform", function (d, i) {
    return "translate(" + xScale(d.time) + "," + (h - padding) + ")"
});

enteringDataGroups.append("rect")
    .attr("class", "bar")
    .attr("width", function () {
        // the scaleBand we are using
        // allows us to as how thick each band is:
        return xScale.bandwidth() - 20;
    })

    .attr("height", function (d, i) {
        // the idea is that we make the bar
        // as high as dictated by the value...
        return h - yScale(d.savings) - padding * 2;
    })

    .attr("x", 10)

    .attr("y", function (d, i) {
        // ...and then push the bar up since it
        // is drawn from top to bottom
        return -h + padding * 2 + yScale(d.savings);
    })
    .attr("fill", "#b5ced7")
    ;

enteringDataGroups.append("text")
    .attr("x", 10)
    .attr("y", function (d, i) {
        // ...and then push the bar up since it
        // is drawn from top to bottom
        return -h + padding * 2 + yScale(d.savings) - 8;
    }).text(function (d) {
        return '$' + d.savings;  // Value of the text
    })
    .attr("font-size", 10)
    .attr("fill", "black");

// check the answer
document.getElementsByName("initial_principal")[0].addEventListener("change", check);

function check() {
    let initial_principal = parseInt(document.getElementsByName("initial_principal")[0].value);
    let p = document.createElement("p");
    if (initial_principal != 1000) {
        if (document.getElementById("fb1").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("fb1").appendChild(p);
            document.getElementById("fb1").getElementsByTagName("P")[0].innerText = "From both the case and the graph, we could see Mrs. Wendi's initial principal investments.";
            document.getElementById("fb1").getElementsByTagName("P")[0].style.padding = "20px";
            document.getElementById("fb1").getElementsByTagName("P")[0].style.color = "#313e47";
        } else {
            document.getElementById("fb1").getElementsByTagName("P")[0].innerText = "From both the case and the graph, we could see see Mrs. Wendi's initial principal investments.";
            document.getElementById("fb1").getElementsByTagName("P")[0].style.color = "#313e47";
        }
    } else {
        if (document.getElementById("fb1").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("fb1").appendChild(p);
            document.getElementById("fb1").getElementsByTagName("P")[0].innerText = "Correct.";
            document.getElementById("fb1").getElementsByTagName("P")[0].style.padding = "20px";
            document.getElementById("fb1").getElementsByTagName("P")[0].style.color = "#313e47";
        } else {
            document.getElementById("fb1").getElementsByTagName("P")[0].innerText = "Correct.";
            document.getElementById("fb1").getElementsByTagName("P")[0].style.color = "#313e47";
        }
    }
}

function check2(){
    let value = document.getElementById("myTextArea1").value
    let p = document.createElement("p");
    if (value == "") {
        if (document.getElementById("fb2").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("fb2").appendChild(p);
            document.getElementById("fb2").getElementsByTagName("P")[0].innerText = "Fill in Something";
            document.getElementById("fb2").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("fb2").getElementsByTagName("P")[0].innerText = "Fill in Something";
        }
    } else {
        if (document.getElementById("fb2").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("fb2").appendChild(p);
            document.getElementById("fb2").getElementsByTagName("P")[0].innerText = "Interest is the money that you earn on your savings. Think about your initial principal and interest rate.";
            document.getElementById("fb2").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("fb2").getElementsByTagName("P")[0].innerText = "Interest is the money that you earn on your savings. Think about your initial principal and interest rate.";
        }
    }
}
function check3(){
    let value = document.getElementById("myTextArea2").value
    let p = document.createElement("p");
    if (value == "") {
        if (document.getElementById("fb3").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("fb3").appendChild(p);
            document.getElementById("fb3").getElementsByTagName("P")[0].innerText = "Fill in Something";
            document.getElementById("fb3").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("fb3").getElementsByTagName("P")[0].innerText = "Fill in Something";
        }
    } else {
        if (document.getElementById("fb3").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("fb3").appendChild(p);
            document.getElementById("fb3").getElementsByTagName("P")[0].innerText = "What is the principal amount now? Is the principal amount still the same as the first year?";
            document.getElementById("fb3").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("fb3").getElementsByTagName("P")[0].innerText = "What is the principal amount now? Is the principal amount still the same as the first year?";
        }
    }
}
function check4(){
    let value = document.getElementById("myTextArea3").value
    let p = document.createElement("p");
    if (value == "") {
        if (document.getElementById("fb4").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("fb4").appendChild(p);
            document.getElementById("fb4").getElementsByTagName("P")[0].innerText = "Fill in Something";
            document.getElementById("fb4").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("fb4").getElementsByTagName("P")[0].innerText = "Fill in Something";
        }
    } else {
        if (document.getElementById("fb4").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("fb4").appendChild(p);
            document.getElementById("fb4").getElementsByTagName("P")[0].innerText = "What is the principal amount now? Is the principal amount still the same as the previous year?";
            document.getElementById("fb4").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("fb4").getElementsByTagName("P")[0].innerText = "What is the principal amount now? Is the principal amount still the same as the previous year?";
        }
    }
}
function check5(){
    let value = document.getElementById("myTextArea4").value
    let p = document.createElement("p");
    if (value == "") {
        if (document.getElementById("fb5").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("fb5").appendChild(p);
            document.getElementById("fb5").getElementsByTagName("P")[0].innerText = "Fill in Something";
            document.getElementById("fb5").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("fb5").getElementsByTagName("P")[0].innerText = "Fill in Something";
        }
    } else {
        if (document.getElementById("fb5").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("fb5").appendChild(p);
            document.getElementById("fb5").getElementsByTagName("P")[0].innerText = "What is the principal amount now? Is the principal amount still the same as the previous year?";
            document.getElementById("fb5").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("fb5").getElementsByTagName("P")[0].innerText = "What is the principal amount now? Is the principal amount still the same as the previous year?";
        }
    }
}
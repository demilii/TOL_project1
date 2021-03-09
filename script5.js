// calculate the compound interest
function compound_interest(n) {
    let principal = 1000;
    for (let i = 0; i < n; i++) {
        principal = principal * 1.12;
    }
    return principal.toFixed(2);
}
// calculate the simple interest
function simple_interest(n) {
    let principal = 1000;
    principal += principal * 0.12 * n;
    return principal.toFixed(2);
}

// create the dataset to visualize
let ydata0, ydata1, ydata2, ydata3, ydata4, ydata5, ydata6, ydata7;
y_data0 = compound_interest(0);
y_data1 = compound_interest(1);
y_data2 = compound_interest(2);
y_data3 = compound_interest(3);
y_data4 = simple_interest(0);
y_data5 = simple_interest(1);
y_data6 = simple_interest(2);
y_data7 = simple_interest(3);
let data = [{ time: 0, jones: y_data4, wendi: y_data0 },
{ time: 1, jones: y_data5, wendi: y_data1 },
{ time: 2, jones: y_data6, wendi: y_data2 },
{ time: 3, jones: y_data7, wendi: y_data3 }
]


//data visualization of the chart
let w = 800;
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
    .attr("font-size", "15px")
    .attr("transform", "translate(300,15)")
    .text("Mrs. Jones' & Wendi's Savings");
let allNames = data.map(function (d) { return d.time; });
let xScale = d3.scaleBand()
    .domain(allNames)
    .range([2 * padding, w - 2 * padding])
    .paddingInner(0.3)
    ;
// create a visual axis corresponding to the scale.
// reference:https://www.d3-graph-gallery.com/graph/barplot_grouped_basicWide.html
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
    .domain([500, 1500])
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

// another scale for subgroup position
var xSubgroup = d3.scaleBand()
    .domain(['jones', 'wendi'])
    .range([0, xScale.bandwidth()])
    .padding([0.01]);

var color = d3.scaleOrdinal()
    .domain(['jones', 'wendi'])
    .range(['#377eb8', '#4daf4a']);

change(data);

function change(data) {
    viz.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d) { return "translate(" + xScale(d.time) + "," + (h - padding) + ")"; })
        .selectAll("rect")
        .data(function (d) { return ['jones', 'wendi'].map(function (key) { return { key: key, value: d[key] }; }); })
        .enter().append("rect")
        .attr("x", function (d) { return xSubgroup(d.key); })
        .attr("y", function (d, i) {
            // ...and then push the bar up since it
            // is drawn from top to bottom
            // console.log(d);
            return -h + padding * 2 + yScale(d.value);
        })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function (d) { return h - yScale(d.value) - padding * 2; })
        .attr("fill", function (d) { return color(d.key); });

    viz.append("circle")
        .attr("cx", 710)
        .attr("cy", 40)
        .attr("r", 3)
        .style("fill", "#377eb8")
    viz.append("circle")
        .attr("cx", 710)
        .attr("cy", 60)
        .attr("r", 3)
        .style("fill", '#4daf4a')
    viz.append("text")
        .attr("x", 720)
        .attr("y", 40)
        .text("Jones")
        .style("font-size", "10px")
        .attr("alignment-baseline", "middle")
    viz.append("text")
        .attr("x", 720)
        .attr("y", 60)
        .text("Wendi")
        .style("font-size", "10px")
        .attr("alignment-baseline", "middle")

    viz.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d) { return "translate(" + xScale(d.time) + "," + (h - padding) + ")"; })
        .selectAll("text")
        .data(function (d) { return ['jones', 'wendi'].map(function (key) { return { key: key, value: d[key] }; }); })
        .enter().append("text")
        .attr("x", function (d) { console.log(xSubgroup(d.key)); return xSubgroup(d.key); })
        .attr("y", function (d, i) {
            // ...and then push the bar up since it
            // is drawn from top to bottom
            // console.log(d);
            // console.log(-h + padding * 2 + yScale(d.value))
            return -h + padding * 2 + yScale(d.value) - 5;
        })
        .text(function (d) {
            return '$' + d.value;  // Value of the text
        })
        .attr("font-size", 12)
        .attr("fill", "black");
}


// check the answer
document.getElementsByName("jones")[0].addEventListener("change", check);
document.getElementsByName("wendi")[0].addEventListener("change", check1);
function check() {
    let p = document.createElement("p");
    if (document.getElementsByName("jones")[0].selectedIndex == 1) {
        if (document.getElementById("fb1").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("fb1").appendChild(p);
            document.getElementById("fb1").getElementsByTagName("P")[0].innerText = "Correct. Simple interest has equal differences through equal time.";
            document.getElementById("fb1").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("fb1").getElementsByTagName("P")[0].innerText = "Correct. Simple interest has equal differences through equal time.";
        }
    } else {
        if (document.getElementById("fb1").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("fb1").appendChild(p);
            document.getElementById("fb1").getElementsByTagName("P")[0].innerText = "Use the current year's savings to subtract the previous savings.";
            document.getElementById("fb1").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("fb1").getElementsByTagName("P")[0].innerText = "Use the current year's savings to subtract the previous savings.";
        }

    }
}

function check1() {
    let p = document.createElement("p");
    if (document.getElementsByName("wendi")[0].selectedIndex == 2) {
        if (document.getElementById("fb2").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("fb2").appendChild(p);
            document.getElementById("fb2").getElementsByTagName("P")[0].innerText = "Correct. Compound interest has different differences through equal time.";
            document.getElementById("fb2").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("fb2").getElementsByTagName("P")[0].innerText = "Correct. Compound interest has different differences through equal time.";
        }
    } else {
        if (document.getElementById("fb2").getElementsByTagName("P")[0] == undefined) {
            document.getElementById("fb2").appendChild(p);
            document.getElementById("fb2").getElementsByTagName("P")[0].innerText = "Use the current year's savings to subtract the previous savings and then compare.";
            document.getElementById("fb2").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("fb2").getElementsByTagName("P")[0].innerText = "Use the current year's savings to subtract the previous savings and then compare.";
        }

    }
}

function check2() {
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
function check3() {
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
            document.getElementById("fb3").getElementsByTagName("P")[0].innerText = "Received.";
            document.getElementById("fb3").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("fb3").getElementsByTagName("P")[0].innerText = "Received.";
        }
    }
}
function check4() {
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
            document.getElementById("fb4").getElementsByTagName("P")[0].innerText = "Received.";
            document.getElementById("fb4").getElementsByTagName("P")[0].style.padding = "20px";
        } else {
            document.getElementById("fb4").getElementsByTagName("P")[0].innerText = "Received.";
        }
    }
}
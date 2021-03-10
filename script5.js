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
    return principal.toFixed(0);
}
let data = [];
function create_data(n) {
    data = [];
    for (let i = 0; i <= n; i++) {
        data.push({ time: i, jones: simple_interest(i), wendi: compound_interest(i) })
    }
}



// create_data(15);

//data visualization of the chart
let w = 800;
let h = 600;
let padding = 50;

let viz = d3.select("#charts")
    .append("svg")
    .style("width", w)
    .style("height", h)
    .style("display", "block")
    .style("margin", "auto"); //center the vis


// change(data);
change_year();
document.getElementById("myRange").addEventListener("change", change_year);
function change_year() {
    let val = document.getElementById("myRange").value;
    document.getElementById("val").getElementsByTagName("P")[0].innerText = "time: " + document.getElementById("myRange").value +" years";
    create_data(val);
    change(data);
}
function change(data) {
    viz.select(".yAxis").remove();
    viz.select(".xAxis").remove();
    viz.selectAll("rect").remove();
    viz.selectAll("text").remove();
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

    // let yMax = Math.max(data);
    // let yMin = Math.min(data)
    let yMax = d3.max(data, function (d) { return (d.wendi); });
    let yMin = d3.min(data, function (d) { return (d.wendi); });


    yDomain = [yMin / 2, yMax + 100];
    let yScale = d3.scaleLinear()
        .domain([yMin / 2, yMax])
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
            // console.log(d.key);
            return -h + padding * 2 + yScale(d.value);
        })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function (d) { return h - yScale(d.value) - padding * 2; })
        .attr("fill", function (d) { return color(d.key); });

    viz.append("circle")
        .attr("cx", 120)
        .attr("cy", 40)
        .attr("r", 3)
        .style("fill", "#377eb8")
    viz.append("circle")
        .attr("cx", 120)
        .attr("cy", 60)
        .attr("r", 3)
        .style("fill", '#4daf4a')
    viz.append("text")
        .attr("x", 130)
        .attr("y", 40)
        .text("Jones")
        .style("font-size", "10px")
        .attr("alignment-baseline", "middle")
    viz.append("text")
        .attr("x", 130)
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
        .attr("x", function (d) { return xSubgroup(d.key); })
        .attr("y", function (d, i) {
            // ...and then push the bar up since it
            // is drawn from top to bottom
            // console.log(d);
            // console.log(-h + padding * 2 + yScale(d.value))
            if (d.key == "jones") {
                return -h + padding * 2 + yScale(d.value) + 10;
            } else if (d.key == "wendi") {
                return -h + padding * 2 + yScale(d.value) - 5;
            }

        })
        .text(function (d) {
            return '$' + d.value;  // Value of the text
        })
        .attr("font-size", 7)
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
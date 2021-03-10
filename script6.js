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

// add chart here
// calculate the compound interest
function compound_interest(n,i) {
    let principal = 1000;
    for (let j = 0; j < n; j++) {
        principal = principal * (1+i);
    }
    return principal.toFixed(2);
}
// calculate the simple interest
function simple_interest(n,i) {
    let principal = 1000;
    principal += principal * i * n;
    return principal.toFixed(2);
}
let data = [];
function create_data(n,si,ci) {
    data = [];
    for (let i = 0; i <= n; i++) {
        data.push({ time: i, jones: simple_interest(i,si), wendi: compound_interest(i,ci) })
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
read_i();
document.getElementById("si_rate").addEventListener("change", read_i);
document.getElementById("ci_rate").addEventListener("change", read_i);

function read_i() {
    let si = parseFloat(document.getElementById("si_rate").value)/100;
    let ci = parseFloat(document.getElementById("ci_rate").value)/100;
    
    // let val = document.getElementById("myRange").value;
    // document.getElementById("val").getElementsByTagName("P")[0].innerText = "time: " + document.getElementById("myRange").value +" years";
    create_data(15,si,ci);
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
    .attr("transform", "translate(220,15)")
    .text("Comparison of Simple Interest and Compound Interest");
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
    let yMax = d3.max(data, function (d) { if(d.wendi>d.jones){return d.wendi;}else{return d.jones};});
    let yMin = d3.min(data, function (d) { if(d.wendi>d.jones){return d.jones;}else{return d.wendi}; });


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
        .text("Simple Interest")
        .style("font-size", "10px")
        .attr("alignment-baseline", "middle")
    viz.append("text")
        .attr("x", 130)
        .attr("y", 60)
        .text("Compound Interest")
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


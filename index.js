import details from './details.json' assert {type: 'json'};

var data = [
    { "klub": "Chelsea", "golovi": "56" },
    { "klub": "Manchester City", "golovi": "82" },
    { "klub": "Manchester United", "golovi": "70" },
    { "klub": "Liverpool FC", "golovi": "65" },
    { "klub": "Leicester City", "golovi": "64" },
    { "klub": "West Ham United", "golovi": "60" },
    { "klub": "Tottenham Hotspur", "golovi": "66" },
    { "klub": "Arsenal", "golovi": "53" },
    { "klub": "Leeds United", "golovi": "60" },
    { "klub": "Everton", "golovi": "45" },
    { "klub": "Aston Villa", "golovi": "52" },
    { "klub": "Newcastle United", "golovi": "44" },
    { "klub": "Wolverhampton Wanderers", "golovi": "34" },
    { "klub": "Crystal Palace", "golovi": "39" },
    { "klub": "Southampton", "golovi": "47" },
    { "klub": "Brighton", "golovi": "39" },
    { "klub": "Burnley", "golovi": "32" },
    { "klub": "Fulham", "golovi": "26" },
    { "klub": "West Bromwich Albion", "golovi": "33" },
    { "klub": "Sheffield United", "golovi": "19" }
];

var margin = { top: 20, bottom: 140, left: 80, right: 20 };
var width = 800 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;
var barPadding = 4;
var barWidth = width / data.length - barPadding;

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([0, width]);
var y = d3.scaleLinear()
    .domain([0, 90])
    .range([height, 0]);

var svg = d3.select("body")
    .attr("class", "info-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom + margin.top)
    //.style("background-color", "lightblue")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xAxis = d3.axisBottom(x)
    .tickFormat(function (d, i) { return data[i].klub; });
var yAxis = d3.axisLeft(y)
    .ticks(10, "f")

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 5)
    .attr("x", -10)
    .style("text-anchor", "end")
    .attr("transform", "translate(-50, -50)")
    .attr("transform", "rotate(-55)");

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "mid")
    .attr("x", width / 3)
    .attr("y", height + 115)
    .text("Klubovi");

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "mid")
    .attr("x", width / 3)
    .attr("y", 10)
    .text("Analiza Premier lige sezone 20/21");

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")

svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -60)
    .attr("x", - height / 2)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Golovi");

var barchart = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("fill", "darkred")
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.85')
        div.transition()
            .duration(200)
            .style("opacity", .9);
        div.html(i.klub + "\nGoals: " + i.golovi)
            .style("left", 700 + "px")
            .style("top", 20 + "px");
    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1')
            div.html("")
    })
    .attr("x", function (d, i) { return x(i); })
    .attr("y", function (d, i) { return y(d.golovi); })
    .attr("height", function (d) { return height - y(d.golovi); })
    .attr("width", barWidth)
    .on("click", function (d, i) {

        var tbody;
        if (document.getElementsByTagName("table")[0] != undefined) {
            var tbl = document.getElementsByTagName("table")[0];
            if (tbl) tbl.parentNode.removeChild(tbl);
        }
        tbody = createTable()


        d3.select("#club-details")
            //.html(getClubDetails(i));
            .selectAll("g.playerContainer")
            .data(getClubDetails(i))
            .enter()
            .html(function (d) {
                if (tbody !== undefined) {
                    let row_2 = document.createElement('tr');
                    let row_2_data_2 = document.createElement('td');
                    row_2_data_2.innerHTML = d.Name
                    let row_2_data_3 = document.createElement('td');
                    row_2_data_3.innerHTML = d.Nationality
                    let row_2_data_4 = document.createElement('td');
                    row_2_data_4.innerHTML = d.Position
                    let row_2_data_5 = document.createElement('td');
                    row_2_data_5.innerHTML = d.Age
                    let row_2_data_6 = document.createElement('td');
                    row_2_data_6.innerHTML = d.Matches
                    let row_2_data_7 = document.createElement('td');
                    row_2_data_7.innerHTML = d.Mins
                    let row_2_data_8 = document.createElement('td');
                    row_2_data_8.innerHTML = d.Goals
                    let row_2_data_9 = document.createElement('td');
                    row_2_data_9.innerHTML = d.Assists
                    let row_2_data_10 = document.createElement('td');
                    row_2_data_10.innerHTML = d.xG
                    let row_2_data_11 = document.createElement('td');
                    row_2_data_11.innerHTML = d.Yellow_Cards
                    let row_2_data_12 = document.createElement('td');
                    row_2_data_12.innerHTML = d.Red_Cards

                    addRowStyle(row_2_data_2);
                    addRowStyle(row_2_data_3);
                    addRowStyle(row_2_data_4);
                    addRowStyle(row_2_data_5);
                    addRowStyle(row_2_data_6);
                    addRowStyle(row_2_data_7);
                    addRowStyle(row_2_data_8);
                    addRowStyle(row_2_data_9);
                    addRowStyle(row_2_data_10);
                    addRowStyle(row_2_data_11);
                    addRowStyle(row_2_data_12);

                    row_2.appendChild(row_2_data_2);
                    row_2.appendChild(row_2_data_3);
                    row_2.appendChild(row_2_data_4);
                    row_2.appendChild(row_2_data_5);
                    row_2.appendChild(row_2_data_6);
                    row_2.appendChild(row_2_data_7);
                    row_2.appendChild(row_2_data_8);
                    row_2.appendChild(row_2_data_9);
                    row_2.appendChild(row_2_data_10);
                    row_2.appendChild(row_2_data_11);
                    row_2.appendChild(row_2_data_12);
                    tbody.appendChild(row_2);
                }

            })
    });

function createTable() {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    // Adding the entire table to the body tag
    var x = document.getElementsByTagName("body")[0]
        .appendChild(table);

    let row_1 = document.createElement('tr');
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Name";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "Nationality";
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "Position";
    let heading_5 = document.createElement('th');
    heading_5.innerHTML = "Age";
    let heading_6 = document.createElement('th');
    heading_6.innerHTML = "Matches";
    let heading_7 = document.createElement('th');
    heading_7.innerHTML = "Minutes played";
    let heading_8 = document.createElement('th');
    heading_8.innerHTML = "Goals";
    let heading_9 = document.createElement('th');
    heading_9.innerHTML = "Assists";
    let heading_10 = document.createElement('th');
    heading_10.innerHTML = "Expected goals";
    let heading_11 = document.createElement('th');
    heading_11.innerHTML = "Yellow cards";
    let heading_12 = document.createElement('th');
    heading_12.innerHTML = "Red cards";

    addHeadingStyle(heading_2);
    addHeadingStyle(heading_3);
    addHeadingStyle(heading_4);
    addHeadingStyle(heading_5);
    addHeadingStyle(heading_6);
    addHeadingStyle(heading_7);
    addHeadingStyle(heading_8);
    addHeadingStyle(heading_9);
    addHeadingStyle(heading_10);
    addHeadingStyle(heading_11);
    addHeadingStyle(heading_12);

    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    row_1.appendChild(heading_6);
    row_1.appendChild(heading_7);
    row_1.appendChild(heading_8);
    row_1.appendChild(heading_9);
    row_1.appendChild(heading_10);
    row_1.appendChild(heading_11);
    row_1.appendChild(heading_12);
    thead.appendChild(row_1);

    return tbody
}

function addRowStyle(row) {
    row.classList.add("pv3");
    row.classList.add("pr3");
    row.classList.add("b--black-20");
    row.classList.add("bb");
}

function addHeadingStyle(heading) {
    heading.classList.add("fw6");
    heading.classList.add("bb");
    heading.classList.add("b--black-20");
    heading.classList.add("tl");
    heading.classList.add("pb3");
    heading.classList.add("pr3");
    heading.classList.add("bg-white");
}

function getClubDetails(i) {
    var tempArray = []

    for (let index = 0; index < details.length; index++) {
        if (details[index].Club === i.klub) {
            tempArray.push(details[index])
        }
    }
    return tempArray
}

var detailsDiv = d3.select("body")
    .append("div")
    .attr("id", "club-details");
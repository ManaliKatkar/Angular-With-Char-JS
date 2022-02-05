import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnInit,
  OnChanges,
  AfterViewChecked,
} from "@angular/core";
import * as d3 from "d3-selection";
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"],
})
export class BubbleComponent implements OnInit {
  title = "D3 Pie Chart in Angular 10";

  margin = { top: 20, right: 20, bottom: 30, left: 50 };
  width: number;
  height: number;
  radius: number;

  arc: any;
  labelArc: any;
  labelPer: any;
  arc1: any;
  labelArc1: any;
  labelPer1: any;
  pie: any;
  color: any;
  svg: any;
  svg1: any;
  innerRadius: any;
  outerRadius: any; // outer radius of pie, in pixels
  labelRadius: any;
  StatsPieChart = [
    { party: "BJP", electionP: 56 },
    { party: "INC", electionP: 18 },
    { party: "AA", electionP: 10 },
    { party: "CPI", electionP: 5 },
    { party: "CPI-M", electionP: 5 },
    { party: "BSP", electionP: 7 },
    { party: "AITS", electionP: 10 },
  ];
  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
    this.innerRadius = Math.min(this.width, this.height) / 3;
    this.outerRadius = Math.min(this.width, this.height) / 2;
    this.labelRadius = (this.innerRadius, this.outerRadius) / 2;
  }

  ngOnInit() {
    this.initSvg();
    this.drawPie();
  }

  initSvg() {
    this.color = d3Scale
      .scaleOrdinal()
      .range(this.getRandomColor(this.StatsPieChart.length));

    this.arc = d3Shape
      .arc()
      .outerRadius(this.outerRadius)
      .innerRadius(this.innerRadius);

    this.labelArc = d3Shape
      .arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);

    this.labelPer = d3Shape
      .arc()
      .outerRadius(this.radius - 80)
      .innerRadius(this.radius - 80);

    ////
    this.arc1 = d3Shape
      .arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);
    this.labelArc1 = d3Shape
      .arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);

    this.labelPer1 = d3Shape
      .arc()
      .outerRadius(this.radius - 80)
      .innerRadius(this.radius - 80);

    this.pie = d3Shape
      .pie()
      .sort(null)
      .value((d: any) => d.electionP);

    this.svg = d3
      .select("#pieChart")
      .append("svg")
      .attr("width", "50%")
      .attr("height", "50%")
      .attr(
        "viewBox",
        "0 0 " +
          Math.min(this.width, this.height) +
          " " +
          Math.min(this.width, this.height)
      )
      .append("g")
      .attr(
        "transform",
        "translate(" +
          Math.min(this.width, this.height) / 2 +
          "," +
          Math.min(this.width, this.height) / 2 +
          ")"
      );

    this.svg1 = d3
      .select("#donutChart")
      .append("svg")
      .attr("width", "50%")
      .attr("height", "50%")
      .attr(
        "viewBox",
        "0 0 " +
          Math.min(this.width, this.height) +
          " " +
          Math.min(this.width, this.height)
      )
      .append("g")
      .attr(
        "transform",
        "translate(" +
          Math.min(this.width, this.height) / 2 +
          "," +
          Math.min(this.width, this.height) / 2 +
          ")"
      );
  }

  drawPie() {
    const g = this.svg
      .selectAll(".arc")
      .data(this.pie(this.StatsPieChart))
      .enter()
      .append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", this.arc)
      .style("fill", (d: any) => this.color(d.data.party));
    g.append("text")
      .attr(
        "transform",
        (d: any) => "translate(" + this.labelArc.centroid(d) + ")"
      )
      .attr("dy", ".1em")
      .text((d: any) => d.data.electionP + "%");

    // g.append("text")
    //   .attr(
    //     "transform",
    //     (d: any) => "translate(" + this.labelPer.centroid(d) + ")"
    //   )
    //   .attr("dy", ".35em")
    //   .text((d: any) => d.data.electionP + "%");

    const g1 = this.svg1
      .selectAll(".arc")
      .data(this.pie(this.StatsPieChart))
      .enter()
      .append("g")
      .attr("class", "arc");

    g1.append("path")
      .attr("d", this.arc1)
      .style("fill", (d: any) => this.color(d.data.party));
    g1.append("text")
      .attr(
        "transform",
        (d: any) => "translate(" + this.labelArc.centroid(d) + ")"
      )
      .attr("dy", ".1em")
      .text((d: any) => d.data.electionP + "%");

    // g.append("text")
    //   .attr(
    //     "transform",
    //     (d: any) => "translate(" + this.labelPer.centroid(d) + ")"
    //   )
    //   .attr("dy", ".35em")
    //   .text((d: any) => d.data.electionP + "%");
  }

  getRandomColor(length: any) {
    var color: any = [];
    for (let i = 0; i < length; i++) {
      color.push("#" + Math.floor(Math.random() * 16777215).toString(16));
    }
    return color;
  }
}

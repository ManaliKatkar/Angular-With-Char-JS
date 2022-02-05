import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnInit,
  OnChanges,
  AfterViewChecked,
} from "@angular/core";
import * as d3 from "d3";

@Component({
  selector: "app-bubble-chart",
  templateUrl: "./bubble-chart.component.html",
  styleUrls: ["./bubble-chart.component.scss"],
})
export class BubbleComponent implements OnInit, OnChanges, AfterViewChecked {
  @ViewChild("bubbleChartContainer", { static: false })
  private chartContainer!: ElementRef;
  data: any;

  svg: any;
  pack: any;
  transition!: number;
  color: any;
  bubbles: Array<any> = [];
  tooltip: any;
  amount = 0;
  type!: string;
  hostElement: any;
  hostElementWidth!: number;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.data = [
      {
        amount: 245,
        bucket_id: "4",
        bucket_parent_id: null,
        type: "Linux",
      },
      {
        amount: 160,
        bucket_id: "10",
        bucket_parent_id: null,
        type: "Jira",
      },
      {
        amount: 239,
        bucket_id: "3",
        bucket_parent_id: null,
        type: "Java",
      },
      {
        amount: 120,
        bucket_id: "19",
        bucket_parent_id: null,
        type: "Spring",
      },
      {
        amount: 131,
        bucket_id: "15",
        bucket_parent_id: null,
        type: "AWS",
      },
      {
        amount: 119,
        bucket_id: "20",
        bucket_parent_id: null,
        type: "Jenkins",
      },
      {
        amount: 147,
        bucket_id: "12",
        bucket_parent_id: null,
        type: "HTML",
      },
      {
        amount: 120,
        bucket_id: "17",
        bucket_parent_id: null,
        type: "CSS",
      },
      {
        amount: 120,
        bucket_id: "18",
        bucket_parent_id: null,
        type: "Selenium",
      },
      {
        amount: 238,
        bucket_id: "5",
        bucket_parent_id: null,
        type: "Docker",
      },
      {
        amount: 183,
        bucket_id: "8",
        bucket_parent_id: null,
        type: "Kubernetes",
      },
      {
        amount: 176,
        bucket_id: "9",
        bucket_parent_id: null,
        type: "MySql",
      },
      {
        amount: 424,
        bucket_id: "1",
        bucket_parent_id: null,
        type: "Python",
      },
      {
        amount: 132,
        bucket_id: "16",
        bucket_parent_id: null,
        type: "MongoDB",
      },
      {
        amount: 150,
        bucket_id: "13",
        bucket_parent_id: null,
        type: "Rest API",
      },
      {
        amount: 147,
        bucket_id: "14",
        bucket_parent_id: null,
        type: "Shell Scripting",
      },
      {
        amount: 245,
        bucket_id: "2",
        bucket_parent_id: null,
        type: "Core Java",
      },
      {
        amount: 160,
        bucket_id: "11",
        bucket_parent_id: null,
        type: "NodeJS",
      },
      {
        amount: 224,
        bucket_id: "6",
        bucket_parent_id: null,
        type: "Javascript",
      },
      {
        amount: 226,
        bucket_id: "7",
        bucket_parent_id: null,
        type: "GIT",
      },
    ];
  }

  ngOnChanges() {
    if (this.data && this.data.length > 0 && this.svg) this.updateChart();
  }

  ngAfterViewChecked() {
    this.hostElement = this.chartContainer.nativeElement;

    if (
      this.hostElement &&
      this.hostElement.offsetWidth !== 0 &&
      this.hostElement.offsetWidth !== this.hostElementWidth
    ) {
      this.hostElementWidth = this.hostElement.offsetWidth;
      d3.select(".bubble-chart svg").remove();
      d3.select(".bubble-chart .title1").remove();
      this.createChart();
      if (this.data.length > 0) this.updateChart();
    }
  }

  createChart = () => {
    this.transition = 700;

    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width = 350;
    const height = 350;

    this.svg = d3
      .select(this.hostElement)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    this.pack = d3.pack().size([width, width]).padding(1.5);

    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    // this.tooltip = this.elementRef.nativeElement.querySelector(".tooltip");
  };

  updateChart = () => {
    this.bubbles = this.data;

    const hierarchy = d3.hierarchy({ children: this.bubbles }).sum((d: any) => {
      if (d.children) return 0;
      return d.amount;
    });

    const node = this.svg
      .selectAll("g")
      .data(this.pack(hierarchy).leaves(), (d: any) => d.data.type);

    const nodeEnter = node
      .enter()
      .append("g")
      .attr("transform", (d: any) => "translate(" + d.x + ", " + d.y + ")");

    nodeEnter.append("title").text(function (d: any) {
      return d.data.type + ": " + d.data.amount;
    });

    nodeEnter
      .append("circle")
      .attr("r", function (d: any) {
        return d.r;
      })
      .attr("id", function (d: any, i: any) {
        return "idlabel_" + d.data.bucketId;
      })
      .style("fill", (d: any) => this.color(d.data.type));

    nodeEnter.on("click", function (d: any) {
      console.log(d, "clicked", d.target.__data__.data);
    });

    nodeEnter
      .append("text")
      .attr("dy", ".3em")
      .style("cursor", "pointer")
      .style("font-size", "10px")
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text((d: any) => d.data.type);
  };
}

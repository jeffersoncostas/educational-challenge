import { Component, OnInit, Input } from '@angular/core';
import { ChartData } from 'src/app/models/models';
import * as CanvasJS from '../../chart/canvasjs.min.js';

@Component({
    selector: 'app-chart',
    template: `
    <section class="chart-section" >
        <div class="chart-section__title">
            <span> {{title}} </span>
        </div>
        <div id="chartContainer" style="height: 370px; width: 100%;"></div>

    </section>
    `,
    styleUrls: ['./chart.component.scss'],

})
export class ChartComponent implements OnInit {
    private chart;
    @Input() data: ChartData[];
    @Input() title: string;
    @Input() type: string;


    ngOnInit() {
        this.initChart();
    }

    private initChart() {
        this.chart = new CanvasJS.Chart('chartContainer', {
            animationEnabled: true,
            exportEnabled: true,
            legend: {
                cursor: 'pointer',
                itemclick: this.explodePie
            },
            data: [
                {
                    type: this.type,
                    showInLegend: true,
                    indexLabel: '{name} - {y} aluno(s)',
                    dataPoints: this.data
                }
            ]
        });

        this.chart.render();
    }
    private explodePie(e) {
        if (
            typeof e.dataSeries.dataPoints[e.dataPointIndex].exploded ===
            'undefined' ||
            !e.dataSeries.dataPoints[e.dataPointIndex].exploded
        ) {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
        } else {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
        }
        e.chart.render();
    }

    chartRender() {
        this.chart.render();
    }
    setData(data: ChartData[]) {
        this.chart.options.data[0].dataPoints = data;

        this.chartRender();
    }
}

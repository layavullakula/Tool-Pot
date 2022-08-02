import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

import { faClock, faProjectDiagram, faTools, faUsers, } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/services/admin.service';
import { ThemeOption } from 'ngx-echarts';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  d = new Date()
  time: any = this.d.getTime();
  intervalId: any;

  loading1 = true;

  projectsNo = 0;
  toolsNo = 0;
  usersNo = 0;

  options: EChartsOption = {};
  optionst: EChartsOption = {};

  wholeData: any = [];

  project: any = [];
  pendingP: any = [];
  inPP: any = [];
  doneP: any = [];
  chartD: any = [];
  tools: any = [];

  loading = true;

  // icons
  projects = faProjectDiagram
  clock = faClock
  tool = faTools
  users = faUsers

  constructor(private service: AdminService) { }

  ngOnInit(): void {
    this.wholeDataChart();
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.getProject()
    this.getPendingP()
    this.getDoneP()
    this.getInPP();
    this.getTool();
    this.getChartData()
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  getProject() {
    this.service.getProjects()
      .subscribe((data) => {
        this.project = data.reverse().slice(0, 5);
        console.log("project", this.project);

      })
  }

  getPendingP() {
    this.service.getPendingP()
      .subscribe((data) => {
        this.pendingP = data;
        console.log("pending", this.pendingP);

      })
  }

  getInPP() {
    this.service.getInPP()
      .subscribe((data) => {
        this.inPP = data;
        console.log("pending", this.inPP);

      })
  }

  getDoneP() {
    this.service.getDoneP()
      .subscribe((data) => {
        this.doneP = data;
        console.log("pending", this.doneP);

      })
  }

  getTool() {
    this.service.getTools()
      .subscribe((data) => {
        this.tools = data.reverse().slice(0, 5);
        console.log("tool", this.tools);

      })
  }

  getChartData() {
    this.loading = true;
    let s: any = {};
    this.service.getChartData()
      .subscribe((data) => {
        for (let i of data) {
          if (i in s) {
            s[i] += 1
          } else {
            s[i] = 1
          }
        }
        console.log("data", s);

        for (let i = 1; i <= 12; i++) {
          if (i in s) {
            console.log("ya");

          } else {
            s[i] = 0
          }
        }

        this.chartD = Object.values(s);
        this.loading = false;
        // console.log("s data", this.chartD);

        // console.log("came before");


        this.options = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['X-4']
          },
          // grid: {
          //   left: '3%',
          //   right: '4%',
          //   bottom: '3%',
          //   containLabel: true
          // },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'X-4',
              type: 'line',
              stack: 'counts',
              areaStyle: { origin: 'start' },
              data: [...this.chartD]
            },
          ]
        };


      })







  }

  wholeDataChart() {
    this.loading1 = true;
    let s: any = [];
    this.service.getUsers()
      .subscribe((data) => {
        this.usersNo = data.length
        const d = {
          name: 'user',
          value: data.length
        }
        s.push(d);
        this.service.getProjects()
          .subscribe((data) => {
            this.projectsNo = data.length;
            const d = {
              name: 'projects',
              value: data.length
            }
            s.push(d);
            this.service.getTools()
              .subscribe((data) => {
                this.toolsNo = data.length;
                const d = {
                  name: 'tools',
                  value: data.length
                }
                const e = {
                  name: 'pending projects',
                  value: this.pendingP.length
                }
                const q = {
                  name: 'working projects',
                  value: this.inPP.length
                }
                const w = {
                  name: 'completed projects',
                  value: this.doneP.length
                }
                s.push(e)
                s.push(d)
                s.push(q)
                s.push(w)

                console.log("data", s, s.map((data: any) => data.name));

                this.loading1 = false;
                this.optionst = {
                  // title: {
                  //   text: 'Nightingale\'s Rose Diagram',
                  //   subtext: 'Mocking Data',

                  //   // x: 'center'
                  // },
                  tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                  },
                  legend: {
                    // x: 'center',
                    // y: 'bottom',
                    data: s.map((data: any) => data.name)
                  },
                  calculable: true,
                  series: [
                    {
                      name: 'area',
                      type: 'pie',
                      radius: [30, 110],
                      roseType: 'area',
                      data: s
                    }
                  ]
                };
              })
          })
      })
  }


  // charts-2
  // initOpts = {
  //   renderer: 'svg',
  //   width: 300,
  //   height: 300
  // };

  // option: EChartsOption = {
  //   color: ['#3398DB'],
  //   tooltip: {
  //     trigger: 'axis',
  //     axisPointer: {
  //       type: 'shadow'
  //     }
  //   },
  //   grid: {
  //     left: '3%',
  //     right: '4%',
  //     bottom: '3%',
  //     containLabel: true
  //   },
  //   xAxis: [
  //     {
  //       type: 'category',
  //       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //       axisTick: {
  //         alignWithLabel: true
  //       }
  //     }
  //   ],
  //   yAxis: [{
  //     type: 'value'
  //   }],
  //   series: [{
  //     name: 'Counters',
  //     type: 'bar',
  //     barWidth: '60%',
  //     data: [10, 52, 200, 334, 390, 330, 220]
  //   }]
  // };



  theme: any | ThemeOption;
  coolTheme = {
    color: [
      '#b21ab4',
      '#6f0099',
      '#2a2073',
      '#0b5ea8',
      '#17aecc',
      '#b3b3ff',
      '#eb99ff',
      '#fae6ff',
      '#e6f2ff',
      '#eeeeee'
    ],

    title: {
      textStyle: {
        fontWeight: 'normal',
        color: '#00aecd'
      }
    },

    visualMap: {
      color: ['#00aecd', '#a2d4e6']
    },

    toolbox: {
      color: ['#00aecd', '#00aecd', '#00aecd', '#00aecd']
    },

    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      axisPointer: {
        // Axis indicator, coordinate trigger effective
        type: 'line', // The default is a straight line： 'line' | 'shadow'
        lineStyle: {
          // Straight line indicator style settings
          color: '#00aecd',
          type: 'dashed'
        },
        crossStyle: {
          color: '#00aecd'
        },
        shadowStyle: {
          // Shadow indicator style settings
          color: 'rgba(200,200,200,0.3)'
        }
      }
    },

    // Area scaling controller
    dataZoom: {
      dataBackgroundColor: '#eee', // Data background color
      fillerColor: 'rgba(144,197,237,0.2)', // Fill the color
      handleColor: '#00aecd' // Handle color
    },

    timeline: {
      lineStyle: {
        color: '#00aecd'
      },
      controlStyle: {
        color: '#00aecd',
        borderColor: '00aecd'
      }
    },

    candlestick: {
      itemStyle: {
        color: '#00aecd',
        color0: '#a2d4e6'
      },
      lineStyle: {
        width: 1,
        color: '#00aecd',
        color0: '#a2d4e6'
      },
      areaStyle: {
        color: '#b21ab4',
        color0: '#0b5ea8'
      }
    },

    chord: {
      padding: 4,
      itemStyle: {
        color: '#b21ab4',
        borderWidth: 1,
        borderColor: 'rgba(128, 128, 128, 0.5)'
      },
      lineStyle: {
        color: 'rgba(128, 128, 128, 0.5)'
      },
      areaStyle: {
        color: '#0b5ea8'
      }
    },

    graph: {
      itemStyle: {
        color: '#b21ab4'
      },
      linkStyle: {
        color: '#2a2073'
      }
    },

    map: {
      itemStyle: {
        color: '#c12e34'
      },
      areaStyle: {
        color: '#ddd'
      },
      label: {
        color: '#c12e34'
      }
    },

    gauge: {
      axisLine: {
        lineStyle: {
          color: [
            [0.2, '#dddddd'],
            [0.8, '#00aecd'],
            [1, '#f5ccff']
          ],
          width: 8
        }
      }
    }
  };

}

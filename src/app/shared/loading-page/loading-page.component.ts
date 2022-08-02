import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-page',
  template: `
  <div class="center">
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
</div>
  `,
  styles: [`
  bodY {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .center {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-image: url('../../../assets/images/login-bg.jpg');
    background-size: cover; */
  }
  .wave {
    width: 5px;
    height: 100px;
    background: linear-gradient(45deg, #8860d0, #5680e9, #5ab9ea);
    margin: 10px;
    animation: wave 1s linear infinite;
    border-radius: 20px;
  }
  .wave:nth-child(2) {
    animation-delay: 0.1s;
  }
  .wave:nth-child(3) {
    animation-delay: 0.2s;
  }
  .wave:nth-child(4) {
    animation-delay: 0.3s;
  }
  .wave:nth-child(5) {
    animation-delay: 0.4s;
  }
  .wave:nth-child(6) {
    animation-delay: 0.5s;
  }
  .wave:nth-child(7) {
    animation-delay: 0.6s;
  }
  .wave:nth-child(8) {
    animation-delay: 0.7s;
  }
  .wave:nth-child(9) {
    animation-delay: 0.8s;
  }
  .wave:nth-child(10) {
    animation-delay: 0.9s;
  }
  
  @keyframes wave {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  
  `]
})
export class LoadingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

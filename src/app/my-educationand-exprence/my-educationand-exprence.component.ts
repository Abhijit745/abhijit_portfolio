import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-educationand-exprence',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-educationand-exprence.component.html',
  styleUrl: './my-educationand-exprence.component.css'
})
export class MyEducationandExprenceComponent {
  education = [
    {
      period: '2015 to 2019',
      degree: 'Bachelor of Technology in Electrical Engineering (B.Tech)',
      institution: 'Narula Institute of Technology, Kolkata, West Bengal',
      description: 'Completed Bachelor of Technology in Electrical Engineering with Honors. Gained strong foundations in circuit theory, control systems, embedded systems, and programming. Built practical skills in C, C++, and Java through lab work, simulations, and real-time projects'
    }
  ];

  experience = [
    {
      period: 'May 2023 to Present',
      title: 'Junior Software Engineer',
      company: 'Perceptron Software Labs Pvt Ltd',
      description: 'Developed 8+ RFID-enabled Android apps using Java/Kotlin, SEUIC, Zebra, and Chainway SDKs. Integrated real-time APIs, databases, and MQTT communication for high-performance IoT solutions. Led WMS project delivery with Agile, boosting inventory accuracy by 80% and reducing latency by 95%.'
    }
  ];

  @ViewChild('myEduExp') myEduExp!: ElementRef;

  ngAfterViewInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.myEduExp.nativeElement.classList.add('animate');
          observer.disconnect();
        }
      });
    }, options);

    observer.observe(this.myEduExp.nativeElement);
  }
}

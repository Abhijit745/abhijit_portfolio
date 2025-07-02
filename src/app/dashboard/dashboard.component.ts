import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MycontactformComponent } from "../mycontactform/mycontactform.component";
import { MyskillsimagesComponent } from "../myskillsimages/myskillsimages.component";
import { MyallprojectsdetailsComponent } from "../myallprojectsdetails/myallprojectsdetails.component";
import { MyaboutUSComponent } from "../myabout-us/myabout-us.component";
import { WhoAmIComponent } from "../who-am-i/who-am-i.component";
import { MyEducationandExprenceComponent } from "../my-educationand-exprence/my-educationand-exprence.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [RouterModule, CommonModule, MycontactformComponent, MyskillsimagesComponent, MyallprojectsdetailsComponent, MyaboutUSComponent, WhoAmIComponent, MyEducationandExprenceComponent, FooterComponent],
})
export class DashboardComponent {
  isNavbarVisible = false;
  isScrolled = false;
  isScrollToTopVisible = false;
  scrollPercentage = 0;
  isPopupOpen = false;
  activeSection = 'home';
  lastScrollTop = 0;
  isNavbarHidden = false;

  constructor(private router: Router) { }

  toggleNavbar(): void {
    this.isNavbarVisible = !this.isNavbarVisible;
  }

  scrollToSection(sectionId: string): void {
    this.isNavbarVisible = false;
    this.activeSection = sectionId;

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (
      this.isNavbarVisible &&
      !target.closest('.navbar') &&
      !target.closest('.hamburger')
    ) {
      this.isNavbarVisible = false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    if (scrollTop > this.lastScrollTop && scrollTop > 100) {
      this.isNavbarHidden = true;
    } else if (scrollTop < this.lastScrollTop) {
      this.isNavbarHidden = false;
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    this.isScrolled = scrollTop > 50;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollPercentage = (scrollTop / maxScroll) * 100;
    this.isScrollToTopVisible = scrollTop > 100;

    const sections = ['home', 'about', 'projects', 'skills', 'contact'];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element && element.getBoundingClientRect().top <= 100 && element.getBoundingClientRect().bottom > 0) {
        this.activeSection = section;
        break;
      }
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = 'assets/ABHIJIT_KUNDU_resume.pdf';
    link.download = 'Abhijit_Kundu.pdf';
    link.click();
  }

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }
}
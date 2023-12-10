import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');
    console.log(user);
  }

  navigateToQuiz() {
    this.router.navigate(['/quiz']);
  }

  navigateToStore() {
    this.router.navigate(['home/store']);
  }

  navigateToReport() {
    this.router.navigate(['home/report']);
  }
}

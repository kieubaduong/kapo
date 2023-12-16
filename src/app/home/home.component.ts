import { Component } from '@angular/core';
import { MatListItem } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  clickedItemIndex: number | null = null;

  navItems = [
    {
      icon: 'home',
      text: 'Home',
      clickHandler: () => this.onItemClicked(0)
    },
    {
      icon: 'inventory',
      text: 'Store',
      clickHandler: () => { this.navigateToStore(); this.onItemClicked(1); }
    },
    {
      icon: 'poll',
      text: 'Reports',
      clickHandler: () => { this.navigateToReport(); this.onItemClicked(2); }
    },
    {
      icon: 'group',
      text: 'Groups',
      clickHandler: () => this.onItemClicked(3)
    }
  ];

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

  onItemClicked(index: number) {
    this.clickedItemIndex = index;
  }
}

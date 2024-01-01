import { Component } from '@angular/core';
import { Router } from '@angular/router';
import GlobalData from 'src/core/global.data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  clickedItemIndex: number | null = null;

  navItems = [
    // {
    //   icon: 'home',
    //   text: 'Home',
    //   clickHandler: () => this.onItemClicked(0)
    // },
    {
      icon: 'inventory',
      text: 'Store',
      clickHandler: () => { this.navigateToStore(); this.onItemClicked(0); }
    },
    {
      icon: 'poll',
      text: 'Reports',
      clickHandler: () => { this.navigateToReport(); this.onItemClicked(1); }
    }
  ];

  constructor(public router: Router) { }
  
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');
    console.log(user);
  }

  logOut() {
    GlobalData.getInstance().clear();
    this.router.navigate(['/login']);
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

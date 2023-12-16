import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import Template from 'src/models/template';

export enum ViewMode {
  Default,
  Compact,
}

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent {
  viewMode = ViewMode.Default; // Default view mode
  ViewMode = ViewMode;

  templates: Template[] = [
    new Template(
      'The Quizzical Quiz',
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      50,
      'DuongKieu',
      500
    ),
    new Template(
      'Puzzling Puzzles',
      'https://images.unsplash.com/photo-1595147389795-37094173bfd8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DUrl2',
      75,
      'DuongKieu',
      750
    ),
    new Template(
      'Trivia Triumph',
      'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      100,
      'DuongKieu',
      1000
    ),
  ];

  templateSearchText = '';
  filteredTemplates: Template[] = this.templates;

  constructor(private router: Router) {}

  searchTemplates() {
    this.filteredTemplates = this.templates.filter((template) =>
      template.title
        .toLowerCase()
        .includes(this.templateSearchText.toLowerCase())
    );
  }

  tabChanged(event: MatTabChangeEvent) {
    this.viewMode = event.index === 0 ? ViewMode.Default : ViewMode.Compact; // Update the view mode when the tab changes
  }

  clearSearch() {
    this.templateSearchText = '';
    this.searchTemplates();
  }

  navigateToTemplate() {
    this.router.navigate(['home/template']);
  }
}

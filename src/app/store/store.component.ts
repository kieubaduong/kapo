import { Component } from '@angular/core';
import Template from 'src/models/template';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent {
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

  searchTemplates() {
    if (this.templateSearchText) {
      this.filteredTemplates = this.templates.filter((template) =>
        template.title
          .toLowerCase()
          .includes(this.templateSearchText.toLowerCase())
      );
    } else {
      this.filteredTemplates = this.templates;
    }
  }

  clearSearch() {
    this.templateSearchText = '';
    this.searchTemplates();
  }
}

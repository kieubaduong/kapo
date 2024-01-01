import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { TemplateDTO } from 'src/DTO/template.dto';
import { TemplateService } from 'src/service/template.service';

export enum ViewMode {
  Default,
  Compact,
}

export enum SelectType {
  Public = 'public',
  Favourites = 'favourites',
  Draft = 'draft',
}

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  viewMode = ViewMode.Default; // Default view mode
  ViewMode = ViewMode;

  templates: TemplateDTO[] = [];
  private templateCache: { [key in SelectType]?: TemplateDTO[] } = {};

  templateSearchText = '';
  filteredTemplates: TemplateDTO[] = this.templates;

  constructor(private router: Router) {}

  ngOnInit() {
    TemplateService.getAllTemplates(SelectType.Public).subscribe((response) => {
      if (response.success) {
        this.templates = response.data ? response.data : [];
        this.filteredTemplates = this.templates;
      } else {
        console.error(response.message);
      }
    });
  }

  changeSelectType(event: MatTabChangeEvent) {
    let selectType: SelectType = SelectType.Public;
    switch (event.index) {
      case 0:
        selectType = SelectType.Public;
        break;
      case 1:
        selectType = SelectType.Draft;
        break;
      case 2:
        selectType = SelectType.Favourites;
        break;
    }

    this.fetchTemplates(selectType);
  }

  searchTemplates() {
    this.filteredTemplates = this.templates.filter((template) =>
      template.title
        .toLowerCase()
        .includes(this.templateSearchText.toLowerCase())
    );
  }

  changeViewMode(event: MatTabChangeEvent) {
    this.viewMode = event.index === 0 ? ViewMode.Default : ViewMode.Compact; // Update the view mode when the tab changes
  }

  private fetchTemplates(selectType: SelectType) {
    if (this.templateCache[selectType]) {
      this.templates = this.templateCache[selectType]!;
      this.filteredTemplates = this.templates;
      return;
    }

    TemplateService.getAllTemplates(selectType).subscribe((response) => {
      if (response.success) {
        this.templates = response.data ? response.data : [];
        this.filteredTemplates = this.templates;

        this.templateCache[selectType] = this.templates;
      } else {
        console.error(response.message);
      }
    });
  }

  clearSearch() {
    this.templateSearchText = '';
    this.searchTemplates();
  }

  navigateToTemplate(templateId: number) {
    this.router.navigate(['home/template', templateId]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateDTO } from 'src/DTO/template.dto';
import { TemplateService } from 'src/service/template.service';
import { MOCK_IMAGE } from '../../core/const';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  template: TemplateDTO = TemplateDTO.null();
  isCollapsed: boolean[] = [];

  mockImage = MOCK_IMAGE;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      TemplateService.getTemplateById(+id).subscribe(response => {
        if (response.success) {
          this.template = response.data ?? TemplateDTO.null();
          this.isCollapsed = [...this.template.questions.map(() => true)];
        } else {
          console.error(response.message);
        }
      });
    }
  }

  showAnswers(): void {
    this.isCollapsed = [...this.isCollapsed.map(() => false)];
  }
}

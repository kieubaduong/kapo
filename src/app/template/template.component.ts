import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateDTO } from 'src/DTO/template.dto';
import { TemplateService } from 'src/service/template.service';
import { MOCK_IMAGE } from '../../core/const';
import { GameService } from 'src/service/game.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  template: TemplateDTO = TemplateDTO.null();
  isCollapsed: boolean[] = [];

  mockImage = MOCK_IMAGE;
  isStarSelected = false;

  constructor(private route: ActivatedRoute, private router: Router, private notificationService: NotificationService) {
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

  startGame(templateId: string): void {
    GameService.createGame(templateId).subscribe(response => {
      if (response.success) {
        const gameUrl = response.data.gameUrl;
        window.open(gameUrl, '_blank');
      } else {
        this.notificationService.showError(response.message ?? 'Could not create game');
      }
    });
  }

  navigateToQuiz(templateId: string): void {
    this.router.navigate(['/quiz', templateId]);
  }

  showAnswers(): void {
    this.isCollapsed = [...this.isCollapsed.map(() => false)];
  }

  toggleStar() {
    this.isStarSelected = !this.isStarSelected;
  }
}

import { Component, Input, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ReportUserDTO } from 'src/DTO/report.user.dto';
import Player from 'src/models/player';
import { ReportService } from 'src/service/report.service';

@Component({
  selector: 'app-players-report',
  templateUrl: './players-report.component.html',
  styleUrls: ['./players-report.component.css'],
})
export class PlayersReportComponent {
  @Input() gameId: number = 0;

  allPlayers: ReportUserDTO[] = [];
  displayedPlayers: ReportUserDTO[] = [];
  filteredPlayers: ReportUserDTO[] = [];

  displayedColumns: string[] = [
    'nickname',
    'rank',
    'correctAnswers',
    'unanswered',
    'finalScore',
  ];

  searchPlayerName: string = '';

  ngOnInit() {
    ReportService.getPlayersReport(this.gameId).subscribe((response) => {
      if (response.success) {
        this.allPlayers = response.data ?? [];
        this.displayedPlayers = this.allPlayers;
        this.filteredPlayers = this.displayedPlayers;
      }
    });
  }

  filterPlayers() {
    if (this.searchPlayerName !== '') {
      this.filteredPlayers = this.displayedPlayers.filter((player) =>
        player.username
          .toLowerCase()
          .includes(this.searchPlayerName.toLowerCase())
      );
    } else {
      this.filteredPlayers = this.displayedPlayers;
    }
  }

  updateDisplayedPlayers(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.displayedPlayers = this.allPlayers;
    } else if (event.index === 1) {
      this.displayedPlayers = this.allPlayers.filter(
        (player) =>
          player.correctAnswersCount /
            (player.answersCount + player.unansweredCount) <
          0.3
      );
    }
    this.filterPlayers();
  }

  sortData(sort: Sort) {
    const data = this.displayedPlayers.slice();
    if (!sort.active || sort.direction === '') {
      this.displayedPlayers = data;
      return;
    }

    this.displayedPlayers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nickname':
          return this.compare(a.username, b.username, isAsc);
        case 'rank':
          return this.compare(a.rank, b.rank, isAsc);
        case 'correctAnswers':
          return this.compare(
            a.correctAnswersCount / (a.answersCount + a.unansweredCount),
            b.correctAnswersCount / (b.answersCount + b.unansweredCount),
            isAsc
          );
        case 'unanswered':
          return this.compare(a.unansweredCount, b.unansweredCount, isAsc);
        case 'finalScore':
          return this.compare(a.points, b.points, isAsc);
        default:
          return 0;
      }
    });
  }

  clearSearch() {
    this.searchPlayerName = '';
    this.filterPlayers();
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  logPlayer(player: ReportUserDTO) {
    console.log(player);
  }
}

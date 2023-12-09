import { Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import Player from 'src/models/player';

@Component({
  selector: 'app-players-report',
  templateUrl: './players-report.component.html',
  styleUrls: ['./players-report.component.css'],
})
export class PlayersReportComponent {
  allPlayers: Player[] = [
    new Player('NinjaCoder', 1, 42, 0, 100),
    new Player('SleepyDev', 2, 35, 5, 85),
    new Player('CoffeeAddict', 3, 30, 10, 75),
    new Player('CodeWizard', 4, 25, 15, 65),
    new Player('KeyboardWarrior', 5, 20, 20, 55),
    new Player('BugHunter', 6, 15, 25, 45),
    new Player('TerminalJockey', 7, 10, 30, 35),
    new Player('ScriptKid', 8, 5, 35, 25),
    new Player('RookieCoder', 9, 0, 40, 15),
    new Player('HelloWorld', 10, 0, 45, 5),
  ];

  displayedPlayers: Player[] = [];
  filteredPlayers: any[] = [];

  displayedColumns: string[] = [
    'nickname',
    'rank',
    'correctAnswers',
    'unanswered',
    'finalScore',
  ];

  searchPlayerName: string = '';

  ngOnInit() {
    this.displayedPlayers = this.allPlayers;
    this.filteredPlayers = this.displayedPlayers;
  }

  filterPlayers() {
    if (this.searchPlayerName !== '') {
      this.filteredPlayers = this.displayedPlayers.filter((player) =>
        player.nickname
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
        (player) => player.correctAnswers < 30
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
          return this.compare(a.nickname, b.nickname, isAsc);
        case 'rank':
          return this.compare(a.rank, b.rank, isAsc);
        case 'correctAnswers':
          return this.compare(a.correctAnswers, b.correctAnswers, isAsc);
        case 'unanswered':
          return this.compare(a.unanswered, b.unanswered, isAsc);
        case 'finalScore':
          return this.compare(a.finalScore, b.finalScore, isAsc);
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
}

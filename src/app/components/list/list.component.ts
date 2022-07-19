import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import Game from 'src/app/models/game.dto';
import AlertService from 'src/app/services/alert.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'rollic-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  games: Game[];
  filteredGames: Game[];
  searchText: string = '';

  constructor(private router: Router, private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService
      .getGames()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.games = res;
          this.filteredGames = res;
          console.log(this.games);
        },
        error: (err) => console.log(err),
      });
  }

  deleteGame(id: string) {
    AlertService.Alert(
      'Delete this game?',
      'Are you sure you want to delete this game?',
      'warning',
      true,
      true,
      'Yes, delete',
      'No, take me back'
    ).then((result) => {
      if (result.isConfirmed) {
        this.gameService
          .deleteGame(id)
          .pipe(first())
          .subscribe({
            next: (res) => {
              this.games = res;
              this.filteredGames = this.games.filter((game) =>
                game.name.toLowerCase().includes(this.searchText)
              );
            },
            error: (err) => console.log(err),
          });
      }
    });
  }
  goCreatePage() {
    this.router.navigate(['/create']);
  }

  search(value: string) {
    console.log(value);
    this.searchText = value.toLowerCase();

    this.filteredGames = this.games.filter((game) =>
      game.name.toLowerCase().includes(this.searchText)
    );
  }
}

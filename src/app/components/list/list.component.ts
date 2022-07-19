import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import Game from 'src/app/models/game.dto';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'rollic-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  games: Game[];
  constructor(private router: Router, private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService
      .getGames()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.games = res;
          console.log(this.games);
        },
        error: (err) => console.log(err),
      });
  }

  goCreatePage() {
    this.router.navigate(['/create']);
  }
}

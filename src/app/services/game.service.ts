import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import games from '../../assets/mock-data/games.json';
import Game from '../models/game.dto';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  getGames(): Observable<Game[]> {
    // const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const gameList = of(games);
    return gameList;
  }
}

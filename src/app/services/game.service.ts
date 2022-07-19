import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import games from '../../assets/mock-data/games.json';
import Game from '../models/game.dto';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  checkOrSetLocalGames() {
    const localGames = JSON.parse(localStorage.getItem('games') || '[]');
    if (localGames.length) {
      // mock data'nın yapılan değişiklikleri değiştirmemesi için
      return;
    }
    localStorage.setItem('games', JSON.stringify(games));
  }

  getGames(): Observable<Game[]> {
    const localGames = JSON.parse(localStorage.getItem('games') || '[]');
    const games = of(localGames);
    return games;
  }

  addGame(game: Game): Observable<Game> {
    let localGames: Game[] = JSON.parse(localStorage.getItem('games') || '[]');
    const newGame: Game = {
      id: new Date().getTime().toString(),
      name: game.name,
      owner: game.owner,
      bundle: game.bundle,
      iconUrl: game.iconUrl,
    };

    localGames.push(newGame);
    localStorage.setItem('games', JSON.stringify(localGames));
    return of(newGame);
  }

  deleteGame(id: string): Observable<Game[]> {
    let localGames: Game[] = JSON.parse(localStorage.getItem('games') || '[]');
    let filteredGames = localGames.filter((game: Game) => game.id !== id);
    localStorage.setItem('games', JSON.stringify(filteredGames));
    return of(filteredGames);
  }
}

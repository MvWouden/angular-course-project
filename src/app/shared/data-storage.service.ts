import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private auth: AuthService
  ) {}

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http.put<Recipe[]>('https://ng-recipe-app-f6749.firebaseio.com/recipes.json', recipes).subscribe();
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>('https://ng-recipe-app-f6749.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}

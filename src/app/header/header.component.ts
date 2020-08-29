import { AuthService } from './../auth/auth.service';
import { AuthActions, Logout } from './../auth/store/auth.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isOpen = false;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorage: DataStorageService,
    private auth: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
    .pipe(map(authState => authState.user))
    .subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData(): void {
    this.dataStorage.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorage.fetchRecipes().subscribe();
  }

  onLogOut(): void {
    this.auth.logOut();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

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
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.auth.userSubj.subscribe(user => {
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

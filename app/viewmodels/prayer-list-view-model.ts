import { Observable } from '@nativescript/core';
import { DatabaseService } from '../services/database.service';
import { Prayer } from '../models/prayer';

export class PrayerListViewModel extends Observable {
  private database: DatabaseService;
  private _prayers: Prayer[] = [];
  
  constructor() {
    super();
    this.database = DatabaseService.getInstance();
    this.set('filterOptions', ['All', 'Public', 'Private', 'Answered']);
    this.set('selectedFilterIndex', 0);
    this.loadPrayers();
  }

  get prayers(): Prayer[] {
    return this._prayers;
  }

  set prayers(value: Prayer[]) {
    if (this._prayers !== value) {
      this._prayers = value;
      this.notifyPropertyChange('prayers', value);
    }
  }

  loadPrayers() {
    const filterIndex = this.get('selectedFilterIndex');
    let filteredPrayers: Prayer[] = [];

    switch (filterIndex) {
      case 0: // All
        filteredPrayers = [...this.database.getPrayers(true), ...this.database.getPrayers(false)];
        break;
      case 1: // Public
        filteredPrayers = this.database.getPrayers(true);
        break;
      case 2: // Private
        filteredPrayers = this.database.getPrayers(false);
        break;
      case 3: // Answered
        filteredPrayers = [...this.database.getPrayers(true), ...this.database.getPrayers(false)]
          .filter(p => p.isAnswered);
        break;
    }

    this.prayers = filteredPrayers.sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  showFilterDialog() {
    // Implement filter dialog logic here
    console.log('Filter dialog to be implemented');
  }
}
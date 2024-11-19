import { Observable } from '@nativescript/core';
import { DatabaseService } from '../services/database.service';

export class PrayerFormViewModel extends Observable {
  private database: DatabaseService;

  constructor() {
    super();
    this.database = DatabaseService.getInstance();
    this.initializeData();
  }

  private initializeData() {
    this.set('submitterName', '');
    this.set('email', '');
    this.set('phone', '');
    this.set('prayerFor', '');
    this.set('prayerRequest', '');
    this.set('isSubmitterNamePublic', true);
    this.set('isAnonymous', false);
    this.set('isPrayerForNamePublic', true);
    this.set('isPrayerForPrivate', false);
    this.set('privacyOptions', ['Public', 'Private']);
    this.set('selectedPrivacyIndex', 0);
    this.set('expirationDate', new Date());
  }

  async onSubmit() {
    try {
      const prayer = {
        submitterName: this.get('submitterName'),
        submitterEmail: this.get('email'),
        submitterPhone: this.get('phone'),
        prayerFor: this.get('prayerFor'),
        prayerRequest: this.get('prayerRequest'),
        isPublic: this.get('selectedPrivacyIndex') === 0,
        isSubmitterNamePublic: this.get('isSubmitterNamePublic'),
        isPrayerForNamePublic: this.get('isPrayerForNamePublic'),
        expirationDate: this.get('expirationDate'),
        isAnswered: false,
        status: 'active',
        createdAt: new Date()
      };

      await this.database.addPrayer(prayer);
      // Show success message and navigate back
    } catch (error) {
      console.error('Error submitting prayer:', error);
      // Show error message
    }
  }
}
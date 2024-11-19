import { Observable } from '@nativescript/core';
import { DatabaseService } from '../services/database.service';
import { Prayer, PrayerComment } from '../models/prayer';

export class PrayerDetailViewModel extends Observable {
  private database: DatabaseService;
  private _prayer: Prayer;
  private _comments: PrayerComment[] = [];

  constructor(prayerId: string) {
    super();
    this.database = DatabaseService.getInstance();
    this.loadPrayer(prayerId);
    this.loadComments(prayerId);
    this.set('newComment', '');
  }

  get prayer(): Prayer {
    return this._prayer;
  }

  set prayer(value: Prayer) {
    if (this._prayer !== value) {
      this._prayer = value;
      this.notifyPropertyChange('prayer', value);
    }
  }

  get comments(): PrayerComment[] {
    return this._comments;
  }

  set comments(value: PrayerComment[]) {
    if (this._comments !== value) {
      this._comments = value;
      this.notifyPropertyChange('comments', value);
    }
  }

  private loadPrayer(prayerId: string) {
    // In a real app, this would be an async call to the database
    const prayers = [...this.database.getPrayers(true), ...this.database.getPrayers(false)];
    this.prayer = prayers.find(p => p.id === prayerId);
  }

  private loadComments(prayerId: string) {
    this.comments = this.database.getComments(prayerId);
  }

  async onAddComment() {
    const comment: PrayerComment = {
      id: '',
      prayerId: this.prayer.id,
      userId: 'current-user', // In a real app, get from auth service
      comment: this.get('newComment'),
      type: 'update',
      createdAt: new Date()
    };

    await this.database.addComment(comment);
    this.set('newComment', '');
    this.loadComments(this.prayer.id);
  }

  async onAnsweredTap() {
    if (!this.prayer.isAnswered) {
      this.prayer.isAnswered = true;
      this.prayer.answerDate = new Date();
      // In a real app, show a dialog to get answer description
      this.prayer.answerDescription = 'Prayer was answered!';
      // Update in database
      this.notifyPropertyChange('prayer', this.prayer);
    }
  }
}
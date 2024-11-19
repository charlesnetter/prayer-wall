import { Observable } from '@nativescript/core';
import { Prayer, PrayerComment, User } from '../models/prayer';

export class DatabaseService extends Observable {
  private static instance: DatabaseService;
  private prayers: Prayer[] = [];
  private comments: PrayerComment[] = [];
  private users: User[] = [];

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Prayer Methods
  addPrayer(prayer: Prayer): Promise<Prayer> {
    prayer.id = Date.now().toString();
    prayer.createdAt = new Date();
    this.prayers.push(prayer);
    return Promise.resolve(prayer);
  }

  getPrayers(isPublic: boolean): Prayer[] {
    return this.prayers.filter(p => p.isPublic === isPublic && p.status === 'active');
  }

  getArchivedPrayers(): Prayer[] {
    return this.prayers.filter(p => p.status === 'archived');
  }

  // User Methods
  async addUser(user: User): Promise<User> {
    user.id = user.phone; // Phone number as user ID
    this.users.push(user);
    // Send email notification to admin
    await this.notifyAdmin(user);
    return user;
  }

  private async notifyAdmin(user: User): Promise<void> {
    console.log(`New user registration: ${user.name} (${user.email})`);
    // Implement email notification logic here
  }

  // Comment Methods
  addComment(comment: PrayerComment): Promise<PrayerComment> {
    comment.id = Date.now().toString();
    comment.createdAt = new Date();
    this.comments.push(comment);
    return Promise.resolve(comment);
  }

  getComments(prayerId: string): PrayerComment[] {
    return this.comments.filter(c => c.prayerId === prayerId);
  }
}
export interface Prayer {
  id: string;
  submitterName: string;
  submitterEmail: string;
  submitterPhone: string;
  prayerFor: string;
  prayerRequest: string;
  isPublic: boolean;
  isSubmitterNamePublic: boolean;
  isPrayerForNamePublic: boolean;
  expirationDate: Date;
  isAnswered: boolean;
  answerDescription?: string;
  answerDate?: Date;
  createdAt: Date;
  status: 'active' | 'archived';
}

export interface PrayerComment {
  id: string;
  prayerId: string;
  userId: string;
  comment: string;
  type: 'update' | 'praise';
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isApproved: boolean;
}
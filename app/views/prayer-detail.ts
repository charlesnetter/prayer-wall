import { NavigatedData, Page } from '@nativescript/core';
import { PrayerDetailViewModel } from '../viewmodels/prayer-detail-view-model';

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  const prayerId = args.context.prayerId;
  page.bindingContext = new PrayerDetailViewModel(prayerId);
}
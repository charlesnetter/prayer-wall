import { EventData, Page } from '@nativescript/core';
import { PrayerFormViewModel } from '../viewmodels/prayer-form-view-model';

export function onNavigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new PrayerFormViewModel();
}
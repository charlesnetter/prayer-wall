import { EventData, Page, NavigatedData } from '@nativescript/core';
import { PrayerListViewModel } from '../viewmodels/prayer-list-view-model';

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  if (!page.bindingContext) {
    page.bindingContext = new PrayerListViewModel();
  }
}

export function onAddTap() {
  const frame = require('@nativescript/core').Frame;
  frame.topmost().navigate('views/prayer-form');
}

export function onFilterTap() {
  const bindingContext = require('@nativescript/core').getViewById(this).bindingContext;
  bindingContext.showFilterDialog();
}

export function onPrayerTap(args: EventData) {
  const frame = require('@nativescript/core').Frame;
  const view = args.object;
  const prayer = view.bindingContext;
  
  frame.topmost().navigate({
    moduleName: 'views/prayer-detail',
    context: { prayerId: prayer.id }
  });
}
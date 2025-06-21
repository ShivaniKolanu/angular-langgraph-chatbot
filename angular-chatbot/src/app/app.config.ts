import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

export const appConfig = {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      MatDialogModule,
      // any other modules used app-wide
    ),
    provideHttpClient(),
  ],
};

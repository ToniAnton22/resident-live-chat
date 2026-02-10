import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { MessageComponent } from './app/components/Messanger/message.component';

bootstrapApplication(MessageComponent, appConfig)
  .catch((err) => console.error(err));

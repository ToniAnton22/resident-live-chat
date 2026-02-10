import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { MessageComponent } from './app/components/Messanger/message.component';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(MessageComponent, config, context);

export default bootstrap;

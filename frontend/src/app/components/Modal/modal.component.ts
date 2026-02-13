import { Component, output, signal } from '@angular/core';
import { form, FormField, maxLength, minLength, required, submit } from '@angular/forms/signals';

@Component({
  selector: 'modal',
  imports: [FormField],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  title = 'Modal';

  usernameChange = output<string>();

  usernameModel = signal({
    username: '',
  });

  attempted = signal<boolean>(false);

  userForm = form(this.usernameModel, (schemaPath) => {
    required(schemaPath.username, { message: 'Must not be empty.' });
    minLength(schemaPath.username, 3, { message: 'Cannot be smaller than 3 characters.' });
    maxLength(schemaPath.username, 20, { message: 'Name cannot be longer than 20.' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    this.attempted.set(true);
    submit(this.userForm, async () => {
      const username = this.usernameModel().username;
      this.sendData(username);
    });
  }

  sendData(username: string) {
    this.usernameChange.emit(username);
  }
}

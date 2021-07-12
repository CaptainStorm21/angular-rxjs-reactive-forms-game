import { AbstractControl } from "@angular/forms";

export class MathValidators {

  static addition(form: AbstractControl) {
    if (form.value.a + form.value.b === parseInt(form.value.answer)) {
      return null;
    }
    return { addition: true };
  }
}

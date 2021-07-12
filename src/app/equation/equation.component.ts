import { MathValidators } from './../math-validators';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [
      /*
      const { a, b, answer } => {
      if (a + b === parseInt(answer)){
      return null
      }
      }
      */

      MathValidators.addition('answer', 'a', 'b')
    ]
  );

  constructor() {}

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

  //whatever is inside of ngOnInit will start up as soon as the component is fired
  ngOnInit(): void {
    // console.log(this.mathForm.statusChanges)
    this.mathForm.statusChanges.subscribe(value => {
      console.log(value)
    })
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}

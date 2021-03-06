import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MathValidators } from './../math-validators';
import { delay, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {


  secondsPerSolution = 0;
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
    this.mathForm
      .statusChanges
      .pipe(
        filter(value => value === 'VALID'),
        delay(500),
        scan((acc) => {
          return {
          numberSolved: acc.numberSolved + 1,
          startTime: acc.startTime
          }
        },{
          numberSolved: 0,
          startTime: new Date()})
      )
      .subscribe(({
        numberSolved,
        startTime
      }) => {
      // this.mathForm.controls.a.setValue(this.randomNumber());
      // this.mathForm.controls.b.setValue(this.randomNumber());
      // this.mathForm.controls.answer.setValue('');
      // console.log(value)
        this.secondsPerSolution = (
          new Date().getTime() - startTime.getTime()
        ) / numberSolved / 1000;


//pathValue only updates 1 or 2. we can remove a: or b:
        this.mathForm.setValue({
        a: this.randomNumber(),
        b: this.randomNumber(),
        answer: ''
      })

    })
  }
  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}

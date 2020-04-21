import { Component, OnInit, Inject,Injectable, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interpretability-settings',
  templateUrl: './interpretability-settings.component.html',
  styleUrls: ['./interpretability-settings.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class InterpretabilitySettingsComponent implements OnInit {

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() interpretabilitySettingsValue: EventEmitter<any> = new EventEmitter<any>();

  model: any = {num_features:"5", num_samples:"200", hide_rest:true};

  constructor() { }

  ngOnInit() {
    this.interpretabilitySettingsValue.emit(this.model);
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onSubmit() {
    // console.log(JSON.stringify(this.model));
    this.interpretabilitySettingsValue.emit(this.model);
    this.close();
    }

}

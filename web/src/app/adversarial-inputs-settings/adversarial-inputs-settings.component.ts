import { Component, OnInit, Inject,Injectable, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adversarial-inputs-settings',
  templateUrl: './adversarial-inputs-settings.component.html',
  styleUrls: ['./adversarial-inputs-settings.component.css'],
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
export class AdversarialInputsSettingsComponent implements OnInit {
  private methodv:string = "fgsm";
  private displayFGSMOptions:boolean = true;
  private displayJSMAOptions:boolean = false;

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() adversarialSettingsValue: EventEmitter<any> = new EventEmitter<any>();
  private tresholdv: number = 0.1;
  private epsilonv:number = 0.3;
  private targetedv:boolean = false;
  private thetadv:number = 0.1;
  private gammav:number = 0.1;

  model: any = {"threshold":this.tresholdv, "eps":this.epsilonv, "targeted":this.targetedv};
  // this.model = {};

  thresholdValueChange($event) {
  this.tresholdv = this.model.threshold;
  }

  epsilonValueChange($event){
    this.epsilonv = this.model.eps;
  }

  targetedValueChange($event){
    this.targetedv = this.model.targeted;
  }

  thetaValueChange($event){
    this.thetadv = this.model.theta;
  }

  gammaValueChange($event){
    this.gammav = this.model.gamma;
  }

  onSubmit() {
    // console.log(JSON.stringify(this.model));
    // this.adversarialSettingsValue.emit(JSON.stringify(this.model));
    this.close();
    }

  constructor() { }

  ngOnInit() {

    this.adversarialSettingsValue.emit(this.model);

  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  methodSelect($event){

    // console.log($event.target.value);
    this.methodv= $event.target.value;

    if($event.target.value == "fgsm"){
      this.model = {"threshold":this.tresholdv, "method":this.methodv, "eps":this.epsilonv, "targeted":this.targetedv};
      this.displayFGSMOptions = true;
      this.displayJSMAOptions = false;
    }
    else if($event.target.value == "jsma"){
      this.model = {"threshold":this.tresholdv, "method":this.methodv, "theta":this.thetadv, "gamma":this.gammav};
      this.displayFGSMOptions = false;
      this.displayJSMAOptions = true;
    }

  }





}

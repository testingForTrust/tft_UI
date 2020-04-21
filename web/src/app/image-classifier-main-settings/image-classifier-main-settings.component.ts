import { Component, OnInit, Inject,Injectable, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-image-classifier-main-settings',
  templateUrl: './image-classifier-main-settings.component.html',
  styleUrls: ['./image-classifier-main-settings.component.css'],
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
export class ImageClassifierMainSettingsComponent implements OnInit {

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() imageClassifierSettingsValue: EventEmitter<any> = new EventEmitter<any>();

  model: any = {robustnessValue:false, adversarialExamplesValue:false, attributeVariationValue:false, modelComplexityValue:false, discriminationValue:false, explainabilityValue:false};

  constructor() { }

  ngOnInit() {
      this.imageClassifierSettingsValue.emit(JSON.stringify(this.model));
  }

  onsubChange($event){
    if(this.model.adversarialExamplesValue === true || this.model.attributeVariationValue === true){
    this.model.robustnessValue = true;
  }else{
    this.model.robustnessValue = false;
  }
  }

  ongensubChange($event){
    if(this.model.fourierfilteringValue === true || this.model.colortograyscaleValue === true || this.model.contrastValue === true || this.model.additivenoiseValue === true || this.model.eidolonnoiseValue === true || this.model.modelcomplexityValue === true){
    this.model.generalizaionValue = true;
  }else{
    this.model.generalizaionValue = false;
  }
  }

  onSubmit() {
    // console.log(JSON.stringify(this.model));
    this.imageClassifierSettingsValue.emit(JSON.stringify(this.model));
    this.close();
    }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}

import { Http } from '@angular/http';
import { ProjectCreationService } from './../_services/project-creation.service';
import { Component, OnInit, Inject, Injectable, Input, ChangeDetectorRef, Output, OnChanges, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface, SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
declare var jQuery: any;
declare var $: any;



@Component({
selector: 'app-image-classifier',
templateUrl: './image-classifier.component.html',
styleUrls: ['./image-classifier.component.css']
})
export class ImageClassifierComponent implements OnInit {

// formdata = new FormGroup({
//   txtInput: new FormControl(""),
//   uploadTxtFile: new FormControl("")
// });
// private modelDataPath: any = 'Path to Model Data';
// private testDataPath: any = 'Path to Test Data';
// private showPara: boolean = true;
// private showSlider: boolean = false;
private rotationtranslationshowPara: boolean = true;
private rotationtranslationshowSlider: boolean = false;
private fourierfilteringshowPara: boolean = true;
private fourierfilteringshowSlider: boolean = false;
private grayscaleshowPara: boolean = true;
private grayscaleshowSlider: boolean = false;
private contrastshowPara: boolean = true;
private contrastshowSlider: boolean = false;
private additivenoiseshowPara: boolean = true;
private additivenoiseshowSlider: boolean = false;
private eidolonnoiseshowPara: boolean = true;
private eidolonnoiseshowSlider: boolean = false;
private modelcomplexityshowPara: boolean = true;
private modelcomplexityshowSlider: boolean = false;
private adversarialInputsshowPara: boolean = true;
private adversarialInputsshowSlider: boolean = false;
private adversarialpatchesshowPara: boolean = true;
private adversarialpatchesshowSlider: boolean = false;
//private showLoader: boolean = false;
private showInitialTableRotationTranslation: boolean = true;
private showDetailTableRotationTranslation: boolean = false;
private showInitialTableFourierFiltering: boolean = true;
private showDetailTableFourierFiltering: boolean = false;
private showInitialTableGrayScale: boolean = true;
private showDetailTableGrayScale: boolean = false;
private showInitialTableContrast: boolean = true;
private showDetailTableContrast: boolean = false;
private showInitialTableAdditiveNoise: boolean = true;
private showDetailTableAdditiveNoise: boolean = false;
private showInitialTableEidolonNoise: boolean = true;
private showDetailTableEidolonNoise: boolean = false;
private showInitialTableModelComplexity: boolean = true;
private showDetailTableModelComplexity: boolean = false;
private showInitialTableAdversarialInputs: boolean = true;
private showDetailTableAdversarialInputs: boolean = false;
private showInitialTableAdversarialPatches: boolean = true;
private showDetailTableAdversarialPatches: boolean = false;
//private imgClassifierForm: FormGroup;
// private projectName: FormControl;
// private modelName: FormControl;
// private sampleData: FormControl;
private clickedClass: string;
private items = [];
private index1 = 0;
private index2 = 0;
private index3 = 0;
private index4 = 0;
private index5 = 0;
private index6 = 0;
private index7 = 0;
private index8 = 0;
private index9 = 0;
// fileName: string;
// uploadFileclear: string;
// textInputclear: string;
// readText: string;
// perComp: string;
// progressMsg: string;
// interval: any;
// advError: boolean = false
// tftRobCsvUrl: string = '/tft/assets/results/Robustness/AdversarialInputs/Results'
// tftInterCsvUrl: string = '/tft/assets/results/Interpretability/Results'
resultPath = './assets/results'
tftRobPath: string = this.resultPath + '/Robustness'
tftInterPath: string = this.resultPath + '/Interpretability'
tftGenUrl: string = this.resultPath + '/Generalization'
overallMatriCsUrlAdv: string = this.tftRobPath + '/AdversarialInputs/Results/overallmetrics.csv';
classMatriCsUrlAdv: string = this.tftRobPath + '/AdversarialInputs/Results/classmetrics.csv';  // URL to web API
outputCsvUrlAdv: string = this.tftRobPath + '/AdversarialInputs/Results/output.csv';

overallMatriCsUrl_Obj_RotationTranslation: string = this.tftGenUrl + '/RotationNTranslation/Results/overallmetrics.csv';
classMatriCsUrl_Obj_RotationTranslation: string = this.tftGenUrl + '/RotationNTranslation/Results/classmetrics.csv';
outputCsvUrl_Obj_RotationTranslation: string = this.tftGenUrl + '/RotationNTranslation/Results/output.csv';

overallMatriCsUrlFourier: string = this.tftGenUrl + '/FourierRadialFiltering/Results/overallmetrics.csv';
classMatriCsUrlFourier: string = this.tftGenUrl + '/FourierRadialFiltering/Results/classmetrics.csv';
outputCsvUrlFourier: string = this.tftGenUrl + '/FourierRadialFiltering/Results/output.csv';


/* ********* Please take a special care about flags set in "showDetailFunc" ***************/
//Path for overall csv data (gray scale)
overallMatriCsUrl_Obj_GrayScale: string = this.tftGenUrl + '/Object_Recognition/Results/GrayScale/overallmetrics.csv';
//Path for class level csv data (gray scale)
classMatriCsUrl_Obj_GrayScaler: string = this.tftGenUrl + '/Object_Recognition/Results/GrayScale/classmetrics.csv';
//output csv path to pick the image and show them in the slider
outputCsvUrl_Obj_GrayScale: string = this.tftGenUrl + '/Object_Recognition/Results/GrayScale/output.csv';


overallMatriCsUrl_Obj_Contrast: string = this.tftGenUrl + '/Object_Recognition/Results/LowContrast/overallmetrics.csv';
classMatriCsUrl_Obj_Contrast: string = this.tftGenUrl + '/Object_Recognition/Results/LowContrast/classmetrics.csv';
outputCsvUrl_Obj_Contrast: string = this.tftGenUrl + '/Object_Recognition/Results/LowContrast/output.csv';

overallMatriCsUrl_Obj_AdditiveNoise: string = this.tftGenUrl + '/Object_Recognition/Results/Noisy/overallmetrics.csv';
classMatriCsUrl_Obj_AdditiveNoise: string = this.tftGenUrl + '/Object_Recognition/Results/Noisy/classmetrics.csv';
outputCsvUrl_Obj_AdditiveNoise: string = this.tftGenUrl + '/Object_Recognition/Results/Noisy/output.csv';

overallMatriCsUrl_Obj_EidolonNoise: string = this.tftGenUrl + '/Object_Recognition/Results/Eidolon/overallmetrics.csv';
classMatriCsUrl_Obj_EidolonNoise: string = this.tftGenUrl + '/Object_Recognition/Results/Eidolon/classmetrics.csv';
outputCsvUrl_Obj_EidolonNoise: string = this.tftGenUrl + '/Object_Recognition/Results/Eidolon/output.csv';

overallMatriCsUrl_Obj_ModelComplexity: string = this.tftGenUrl + '/ModelComplexity/Results/overallmetrics.csv';
classMatriCsUrl_Obj_ModelComplexity: string = this.tftGenUrl + '/ModelComplexity/Results/classmetrics.csv';
outputCsvUrl_Obj_ModelComplexity: string = this.tftGenUrl + '/ModelComplexity/Results/output.csv';

overallMatriCsUrlAdversarialPatches: string = this.tftRobPath + '/AdversarialPatches/Results/overallmetrics.csv';
classMatriCsUrlAdversarialPatches: string = this.tftRobPath + '/AdversarialPatches/Results/classmetrics.csv';  // URL to web API
outputCsvUrlAdversarialPatches: string = this.tftRobPath + '/AdversarialPatches/Results/output.csv';

interpretablityCsvUrl: string = this.tftInterPath + '/Results/limeoutput.csv';

experimentsCsvURL: string = this.resultPath + '/experiments.csv';

// adversarialinputSettingsCsvURL: string = this.tftRobPath + '/AdversarialInputs/settings.csv';
adversarialinputSettingsCsvURL:string;
interpretabilitySettingsCsvURL: string = this.tftInterPath + '/settings.csv';

advImages: any[] = [];
objectRecRotationTranslationImages: any[] = [];
// rotationtranslationClassTextName:any[] = [];
// rotationtranslationClassText:any;
// rotationDegree:any;
// translationPixel:any;
fourierFilteredImages: any[] = [];
objectRecGrayScaleImages: any[] = [];
objectRecContrastImages: any[] = [];
objectRecAdditiveNoiseImages: any[] = [];
objectRecEidolonNoiseImages: any[] = [];
objectRecModelComplexityImages: any[] = [];
adversarialPatchesImages: any[] = [];
//Array holds the json record related to the clicked class from csvImgData_Obj_GrayScale
// see the selectedClassItems function how it is filtering the information

csvImgData_Adversarial: any[] = [];
csvImgData_Obj_RotationTranslation: any[] = [];
csvImgData_FourierFiltering: any[] = [];
csvImgData_Obj_GrayScale: any[] = [];
csvImgData_Obj_Contrast: any[] = [];
csvImgData_Obj_AdditiveNoise: any[] = [];
csvImgData_Obj_EidolonNoise: any[] = [];
csvImgData_Obj_ModelComplexity: any[] = [];
csvImgData_AdversarialPatches: any[] = [];
//Array contains information from output csv used in imageDisplay function
//which is later used to filter the clicked class information to display in slider
//just a representation of all output csv data as an array for later use
// see the imageDisplay function

limeCsvData: any[] = [];
overal_LimeCsvData: any[] = [];

filterClassMatricsData_Adv: any[] = [];
filterClassMatricsData_Obj_RotationTranslation: any[] = [];
filterClassMatricsData_Fourier: any[] = [];
filterClassMatricsData_Obj_GrayScale: any[] = []; //Array Contains class level information used in processClassMatrics function
filterClassMatricsData_Obj_Contrast: any[] = [];
filterClassMatricsData_Obj_AdditiveNoise: any[] = [];
filterClassMatricsData_Obj_EidolonNoise: any[] = [];
filterClassMatricsData_Obj_ModelComplexity: any[] = [];
filterClassMatricsData_AdversarialPatches: any[] = [];

overallFourierRadialFilteringData: any[] = [{ "overallMatricsOriginalPrecision": 0, "overallMatricsPrecision": 0, "overallMatricsDiff": 0 }];
// (overallObjRecGrayScaleData is an array) To display overall % used in readoverallMatricsCsvData function
overallObjRecGrayScaleData: any[] = [{ "overallMatricsOriginalPrecision": 0, "overallMatricsPrecision": 0, "overallMatricsDiff": 0 }];
overallAdversarialData: any[] = [{ "overallMatricsOriginalPrecision": 0, "overallMatricsPrecision": 0, "overallMatricsDiff": 0 }];
overallObjRecRotationTranslationData: any[] = [{ "overallMatricsOriginalPrecision": 0, "overallMatricsPrecision": 0, "overallMatricsDiff": 0 }];
overallFourierData: any[] = [{ "overallMatricsOriginalPrecision": 0, "overallMatricsPrecision": 0, "overallMatricsDiff": 0 }];
overallObjRecContrastData: any[] = [{ "overallMatricsOriginalPrecision": 0, "overallMatricsPrecision": 0, "overallMatricsDiff": 0 }];
overallObjRecAdditiveNoiseData: any[] = [{ "overallMatricsOriginalPrecision": 0, "overallMatricsPrecision": 0, "overallMatricsDiff": 0 }];
overallObjRecEidolonNoiseData: any[] = [{ "overallMatricsOriginalPrecision": 0, "overallMatricsPrecision": 0, "overallMatricsDiff": 0 }];
overallObjRecModelComplexityData: any[] = [{ "overallMatricsOriginalPrecision": 0, "overallMatricsPrecision": 0, "overallMatricsDiff": 0 }];
overallAdversarialPatchesData: any[] = [{ "overallMatricsOriginalPrecision": 0, "overallMatricsPrecision": 0, "overallMatricsDiff": 0 }];
experimentsRancsvData: any[] = [];
adversarialinputSettingscsvData:any[] = [];
interpretabilitySettingscsvData:any[] = [];

private asValue: any ;
// private icValue: any;
private ipValue: any;
//private interpretabilitySetting: any;
private activateAll: boolean = true;
private activateMisclassified: boolean = false;
private activateClassified: boolean = false;
private activateCorrectHighProbablity: boolean = false;
private blankFlag: boolean = false;
private clickedID:any;

model: any = { generalizaionValue: true, rotationtranslationValue:true, fourierfilteringValue: false, colortograyscaleValue: true, contrastValue: true, additivenoiseValue: true, eidolonnoiseValue: true, modelcomplexityValue: true, robustnessValue: true, adversarialExamplesValue: true, adversarialPatchesValue: true, discriminationValue: true, explainabilityValue: true };
pmodel:any = {probablityValue: 0.5}

// scrollbarOptions = { axis: 'x', theme: 'dark', scrollButtons:{enable:true}, autoExpandScrollbar:true, advanced:{ autoExpandHorizontalScroll: true }};

scrollbarOptions = { axis: 'x', theme: 'dark', scrollButtons:{enable:true}, autoExpandScrollbar:true, advanced:{ autoExpandHorizontalScroll: true }};


// addSlide() {
//   this.items.push({
//     title: `Slide 4`,
//     titlealt: `Slide 4 alt`,
//   });
// }

// doSomething($event){
//   console.log($event+" SLider reset");
// }

//collection = [];
constructor(private cdRef: ChangeDetectorRef,
  private projectServe: ProjectCreationService,
  private http: Http, private elRef: ElementRef, private mScrollbarService: MalihuScrollbarService) {
    elRef.nativeElement.ownerDocument.body.style.overflowY = 'scroll';
    // for (let i = 1; i <= 100; i++) {
    //   this.collection.push(`item ${i}`);
    // }
}



ngOnInit() {
  //this.createProjectFormControll();
  //this.createProjectForm();
  this.adversarialImgClass();
  this.readLimeData();
  this.fourier();
  this.objectRecognition_WeakSignals();
  this.adversarialpatchesImgClass();
  this.readexperimentsran();
  this.interpretabilitySettingFunc();

}

onpSubmit(){
  console.log(this.pmodel);
  this.searchClasseswithProbability(this.overal_LimeCsvData);
}

readexperimentsran() {
  this.http.get(this.experimentsCsvURL)
    .subscribe(
      data => {
        // console.log(data),
        this.extractexpData(data)
      },
      err => {console.log(err)}
    );
}

private extractexpData(res: any) {

   let csvData = res['_body'] || '';
   let allTextLines = csvData.split(/\r\n|\n/);
   let headers = allTextLines[0].split(',');
   let lines = [];

   for ( let i = 0; i < allTextLines.length; i++) {
       // split content based on comma
       let data = allTextLines[i].split(',');
       if (data.length == headers.length) {
           let tarr = [];
           for ( let j = 0; j < headers.length; j++) {
               tarr.push(data[j]);
           }
           // console.log(tarr);
           lines.push(tarr);
       }
   }
   this.experimentsRancsvData = lines;
   for(let i=0; i<lines[0].length;i++){
     //this.model[lines[0][i]] = true;
	    this.model[lines[0][i]] = JSON.parse(lines[1][i].toLowerCase());
  }
   // console.log(this.model);

   const myObjStr = JSON.stringify(csvData);
   // console.log(myObjStr);
   var jsonObject : any = JSON.parse(myObjStr);
   // console.log(jsonObject);
 }

 adversarialinputSetting() {
   this.http.get(this.adversarialinputSettingsCsvURL)
     .subscribe(
       data => {
         // console.log(data),
         this.extractaisData(data)
       },
       err => {console.log(err)}
     );
 }

 private extractaisData(res: any) {

    let csvData = res['_body'] || '';
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];

    for ( let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            let tarr = [];
            for ( let j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            // console.log(tarr);
            lines.push(tarr);
        }
    }
    this.adversarialinputSettingscsvData = lines;
    for(let i=0; i<lines[0].length;i++){
      //this.model[lines[0][i]] = true;
 	    this.asValue[lines[0][i]] = JSON.parse(lines[1][i].toLowerCase());
   }
    console.log(this.asValue);

    const myObjStr = JSON.stringify(csvData);
    // console.log(myObjStr);
    var jsonObject : any = JSON.parse(myObjStr);
    // console.log(jsonObject);
  }

  interpretabilitySettingFunc() {
    this.http.get(this.interpretabilitySettingsCsvURL)
      .subscribe(
        data => {
          // console.log(data),
          this.extractaipsData(data)
        },
        err => {console.log(err)}
      );
  }

  private extractaipsData(res: any) {

     let csvData = res['_body'] || '';
     let allTextLines = csvData.split(/\r\n|\n/);
     let headers = allTextLines[0].split(',');
     let lines = [];

     for ( let i = 0; i < allTextLines.length; i++) {
         // split content based on comma
         let data = allTextLines[i].split(',');
         if (data.length == headers.length) {
             let tarr = [];
             for ( let j = 0; j < headers.length; j++) {
                 tarr.push(data[j]);
             }
             // console.log(tarr);
             lines.push(tarr);
         }
     }
     this.interpretabilitySettingscsvData = lines;
     for(let i=0; i<lines[0].length;i++){
       //this.model[lines[0][i]] = true;
  	    this.ipValue[lines[0][i]] = JSON.parse(lines[1][i].toLowerCase());
    }
     // console.log(this.ipValue);

     const myObjStr = JSON.stringify(csvData);
     // console.log(myObjStr);
     var jsonObject : any = JSON.parse(myObjStr);
     // console.log(jsonObject);
   }


onsubChange($event) {
  if (this.model.adversarialExamplesValue === true || this.model.adversarialPatchesValue === true) {
    this.model.robustnessValue = true;
  } else {
    this.model.robustnessValue = false;
  }
}

ongensubChange($event) {
  if (this.model.fourierfilteringValue === true || this.model.colortograyscaleValue === true || this.model.contrastValue === true || this.model.additivenoiseValue === true || this.model.eidolonnoiseValue === true || this.model.modelcomplexityValue === true) {
    this.model.generalizaionValue = true;
  } else {
    this.model.generalizaionValue = false;
  }
}

adversarialSettingsValue($event) {
  this.asValue = $event;

  // console.log("adv settings---",this.asValue);
  // console.log(this.adversarialSettingsValue);
}


settingMethod($event){
  //console.log("myMethod is clicked");
  switch($event.toElement.id){
    case 'rnts':{ this.adversarialinputSettingsCsvURL = this.tftGenUrl + '/RotationNTranslation/settings.csv'; break;}
    case 'ffs':{ this.adversarialinputSettingsCsvURL = this.tftGenUrl + '/FourierRadialFiltering/settings.csv'; break;}
    case 'gss':{ this.adversarialinputSettingsCsvURL = this.tftGenUrl + '/Object_Recognition/Results/GrayScale/settings.csv'; break;}
    case 'cs':{ this.adversarialinputSettingsCsvURL = this.tftGenUrl + '/Object_Recognition/Results/LowContrast/settings.csv'; break;}
    case 'ans':{ this.adversarialinputSettingsCsvURL = this.tftGenUrl + '/Object_Recognition/Results/Noisy/settings.csv'; break;}
    case 'ens':{ this.adversarialinputSettingsCsvURL = this.tftGenUrl + '/Object_Recognition/Results/Eidolon/settings.csv'; break;}
    case 'mcs':{ this.adversarialinputSettingsCsvURL = this.tftGenUrl + '/Object_Recognition/Results/ModelComplexity/settings.csv'; break;}
    case 'ais':{ this.adversarialinputSettingsCsvURL = this.tftRobPath + '/AdversarialInputs/settings.csv'; break;}
    case 'aps':{ this.adversarialinputSettingsCsvURL = this.tftRobPath + '/AttributeVariation_/settings.csv'; break;}
  }

  // if($event.toElement.id==='rnts'){
  //   // console.log("RNT");
  //   // this.adversarialinputSettingsCsvURL = this.tftRobPath + '/AttributeVariation_/settings.csv';
  //
  //
  // }
  // else if($event.toElement.id==='ais'){
  //   //console.log("Got the Correctly classified")
  //   this.adversarialinputSettingsCsvURL = this.tftRobPath + '/AdversarialInputs/settings.csv';
  // }

  this.adversarialinputSetting();
}

interpretabilitySettingsValue($event) {
  this.ipValue = $event;
  // console.log("lime settings-- ",this.ipValue);

}

// imageClassifierSettingsValue($event) {
//   this.icValue = $event;
//   //console.log("global settings--",this.icValue);
// }

showFiller = false;
@ViewChild('menuBurger') menuBurger: ElementRef;

menuclick() {
  if (this.menuBurger.nativeElement.classList.contains('open')) {
    this.closeMenu();
  }
  else {
    this.openMenu();
  }
}
myMethod($event){
  //console.log("myMethod is clicked");
  this.clickedID = $event.toElement.id;
  if($event.toElement.id==='wrongly_classified'){
    //console.log("Got the wrongly classified")
    this.misclassifiedClassesWithHighProbability(this.overal_LimeCsvData);
  }
  else if($event.toElement.id==='Correctly_classified'){
    //console.log("Got the Correctly classified")
    this.classifiedClassesWithLowProbability(this.overal_LimeCsvData)
  }
  else if($event.toElement.id==='Correctly_classified_High_Probablity'){
    //console.log("Got the Correctly_classified_High_Probablity")
    this.correctlyClassifiedWithHighProbablity(this.overal_LimeCsvData)
  }
  else if($event.toElement.id==='overall'){
    //console.log("Got the overall")
    this.allClassifiedClasses(this.overal_LimeCsvData);

  }
}

searchClasseswithProbability(limeCsv){

  let tempLimeCsv: any[] = []
  if(this.clickedID === 'wrongly_classified'){
    for(let i=0;i<limeCsv.length;i++){
      //checks each json object of the array
      //Add the record to tempLimeCsv where Probability value and Misclassified_classes_with_high_probability is TRUE
      if((limeCsv[i].search_classes_with_probability<=this.pmodel.probablityValue) && (limeCsv[i].Misclassified_classes_with_high_probability.toUpperCase()==='TRUE')){
        tempLimeCsv.push(limeCsv[i])
      }
    }
  }else if(this.clickedID === 'Correctly_classified'){
    for(let i=0;i<limeCsv.length;i++){
      //checks each json object of the array
      //Add the record to tempLimeCsv where Probability value and Misclassified_classes_with_high_probability is TRUE
      if((limeCsv[i].search_classes_with_probability<=this.pmodel.probablityValue) && (limeCsv[i].Classified_classes_with_low_probability.toUpperCase()==='TRUE')){
        tempLimeCsv.push(limeCsv[i])
      }
    }
  }else if(this.clickedID === 'Correctly_classified_High_Probablity'){
    for(let i=0;i<limeCsv.length;i++){
      //checks each json object of the array
      //Add the record to tempLimeCsv where Probability value and Misclassified_classes_with_high_probability is TRUE
      if((limeCsv[i].search_classes_with_probability<=this.pmodel.probablityValue) && (limeCsv[i].Correctly_classified_with_high_probability.toUpperCase()==='TRUE')){
        tempLimeCsv.push(limeCsv[i])
      }
    }
  }else{
    for(let i=0;i<limeCsv.length;i++){
      //checks each json object of the array
      //Add the record to tempLimeCsv Probability value
      if(limeCsv[i].search_classes_with_probability<=this.pmodel.probablityValue){
        tempLimeCsv.push(limeCsv[i])
      }
    }
  }
  this.limeCsvData = []
  this.limeCsvData = tempLimeCsv
  console.log("searchClasseswithProbability -- ",this.limeCsvData.length)
  if(this.limeCsvData.length===0){
    this.blankFlag=true
  }
  else{
    this.blankFlag=false
  }
}

misclassifiedClassesWithHighProbability(limeCsv){
  this.activateMisclassified = true;
  this.activateClassified = false;
  this.activateAll = false;
  this.activateCorrectHighProbablity = false;

  let tempLimeCsv: any[] = []
  for(let i=0;i<limeCsv.length;i++){
    //checks each json object of the array
    //Add the record to tempLimeCsv where Misclassified_classes_with_high_probability is TRUE
    if(limeCsv[i].Misclassified_classes_with_high_probability.toUpperCase()==='TRUE'){
      tempLimeCsv.push(limeCsv[i])
    }
  }
  this.limeCsvData = []
  this.limeCsvData = tempLimeCsv
  console.log("misclassifiedClassesWithHighProbability -- ",this.limeCsvData.length)
  if(this.limeCsvData.length===0){
    this.blankFlag=true
  }
  else{
    this.blankFlag=false
  }
}

classifiedClassesWithLowProbability(limeCsv){
  this.activateClassified = true;
  this.activateMisclassified = false;
  this.activateAll = false;
  this.activateCorrectHighProbablity = false;
  let tempLimeCsv: any[] = []
  for(let i=0;i<limeCsv.length;i++){
    //checks each json object of the array
    //Add the record to tempLimeCsv where Classified_classes_with_low_probability is TRUE
    if(limeCsv[i].Classified_classes_with_low_probability.toUpperCase()==='TRUE'){
      tempLimeCsv.push(limeCsv[i])
    }
  }
  this.limeCsvData = []
  this.limeCsvData = tempLimeCsv;
  console.log("classifiedClassesWithLowProbability -- ",this.limeCsvData.length)
  if(this.limeCsvData.length===0){
    this.blankFlag=true
  }
  else{
    this.blankFlag=false
  }
}

correctlyClassifiedWithHighProbablity(limeCsv){
  this.activateCorrectHighProbablity = true;
  this.activateAll = false;
  this.activateClassified = false;
  this.activateMisclassified = false;
  let tempLimeCsv: any[] = []
  for(let i=0;i<limeCsv.length;i++){
    //checks each json object of the array
    //Add the record to tempLimeCsv where Correctly_classified_with_high_probability is TRUE
    if(limeCsv[i].Correctly_classified_with_high_probability.toUpperCase()==='TRUE'){
      tempLimeCsv.push(limeCsv[i])
    }
  }
  this.limeCsvData = []
  this.limeCsvData = tempLimeCsv;
  console.log("correctlyClassifiedWithHighProbablity -- ",this.limeCsvData.length)
  if(this.limeCsvData.length===0){
    this.blankFlag=true
  }
  else{
    this.blankFlag=false
  }
}

allClassifiedClasses(limeCsv){
  this.activateAll = true;
  this.activateClassified = false;
  this.activateMisclassified = false;
  this.activateCorrectHighProbablity = false;
  this.limeCsvData = [];
  this.limeCsvData = this.overal_LimeCsvData;
  console.log("allClassifiedClasses -- ",this.limeCsvData.length);
  if(this.limeCsvData.length===0){
    this.blankFlag=true
  }
  else{
    this.blankFlag=false
  }
}

// createProjectForm() {
//   this.imgClassifierForm = new FormGroup({
//     projectName: this.projectName,
//     modelName: this.modelName,
//     sampleData: this.sampleData
//   }
//   );
// }

readClassMatricsCsvDataAdv() {
  this.http.get(this.classMatriCsUrlAdv)
    .subscribe(
      data => {
        this.processClassMatrics_Adv(data)
      },
      err => this.handleError(err)
    );
}

readClassMatricsCsvDataRotationTranslation() {
  this.http.get(this.classMatriCsUrl_Obj_RotationTranslation)
    .subscribe(
      data => {
        this.processClassMatrics_RotationTranslation(data)
      },
      err => this.handleError(err)
    );
}

readClassMatricsCsvDataFourier() {
  this.http.get(this.classMatriCsUrlFourier)
    .subscribe(
      data => {
        this.processClassMatrics_Fourier(data)
      },
      err => this.handleError(err)
    );
}

readClassMatricsCsvDataGrayScale() {
  this.http.get(this.classMatriCsUrl_Obj_GrayScaler)
    .subscribe(
      data => {
        this.processClassMatrics_GrayScale(data)
      },
      err => this.handleError(err)
    );
}

readClassMatricsCsvDataContrast() {
  this.http.get(this.classMatriCsUrl_Obj_Contrast)
    .subscribe(
      data => {
        this.processClassMatrics_Contrast(data)
      },
      err => this.handleError(err)
    );
}

readClassMatricsCsvDataAdditiveNoise() {
  this.http.get(this.classMatriCsUrl_Obj_AdditiveNoise)
    .subscribe(
      data => {
        this.processClassMatrics_AdditiveNoise(data)
      },
      err => this.handleError(err)
    );
}

readClassMatricsCsvDataEidolonNoise() {
  this.http.get(this.classMatriCsUrl_Obj_EidolonNoise)
    .subscribe(
      data => {
        this.processClassMatrics_EidolonNoise(data)
      },
      err => this.handleError(err)
    );
}

readClassMatricsCsvDataModelComplexity() {
  this.http.get(this.classMatriCsUrl_Obj_ModelComplexity)
    .subscribe(
      data => {
        this.processClassMatrics_ModelComplexity(data)
      },
      err => this.handleError(err)
    );
}

readClassMatricsCsvDataAdversarialPatches() {
  this.http.get(this.classMatriCsUrlAdversarialPatches)
    .subscribe(
      data => {
        this.processClassMatrics_AdversarialPatches(data)
      },
      err => this.handleError(err)
    );
}

processClassMatrics_Adv(data: any) {
  this.filterClassMatricsData_Adv = []
  this.filterClassMatricsData_Adv = this.projectServe.extractData(data)
  // console.log("showDetailTable -- ", this.filterClassMatricsData_Adv)
}

processClassMatrics_RotationTranslation(data: any) {
  this.filterClassMatricsData_Obj_RotationTranslation = []
  this.filterClassMatricsData_Obj_RotationTranslation = this.projectServe.extractRNTData(data)
  // console.log("filterClassMatricsData_Obj_GrayScale -- ", this.filterClassMatricsData_Obj_GrayScale)
}

processClassMatrics_Fourier(data: any) {
  this.filterClassMatricsData_Fourier = []
  this.filterClassMatricsData_Fourier = this.projectServe.extractData(data)
  // console.log("showDetailTable -- ", this.filterClassMatricsData_Fourier)
}

processClassMatrics_GrayScale(data: any) {
  this.filterClassMatricsData_Obj_GrayScale = []
  this.filterClassMatricsData_Obj_GrayScale = this.projectServe.extractData(data)
  // console.log("filterClassMatricsData_Obj_GrayScale -- ", this.filterClassMatricsData_Obj_GrayScale)
}

processClassMatrics_Contrast(data: any) {
  this.filterClassMatricsData_Obj_Contrast = []
  this.filterClassMatricsData_Obj_Contrast = this.projectServe.extractData(data)
  // console.log("showDetailTable -- ", this.filterClassMatricsData_Obj_Contrast)
}

processClassMatrics_AdditiveNoise(data: any) {
  this.filterClassMatricsData_Obj_AdditiveNoise = []
  this.filterClassMatricsData_Obj_AdditiveNoise = this.projectServe.extractData(data)
  // console.log("showDetailTable -- ", this.filterClassMatricsData_Obj_AdditiveNoise)
}

processClassMatrics_EidolonNoise(data: any) {
  this.filterClassMatricsData_Obj_EidolonNoise = []
  this.filterClassMatricsData_Obj_EidolonNoise = this.projectServe.extractData(data)
  // console.log("showDetailTable -- ", this.filterClassMatricsData_Obj_EidolonNoise)
}

processClassMatrics_ModelComplexity(data: any) {
  this.filterClassMatricsData_Obj_ModelComplexity = []
  this.filterClassMatricsData_Obj_ModelComplexity = this.projectServe.extractData(data)
  // console.log("showDetailTable -- ", this.filterClassMatricsData_Obj_ModelComplexity)
}

processClassMatrics_AdversarialPatches(data: any) {
  this.filterClassMatricsData_AdversarialPatches = []
  this.filterClassMatricsData_AdversarialPatches = this.projectServe.extractData(data)
  // console.log("showDetailTable -- ", this.filterClassMatricsData_AdversarialPatches)
}

readoverallMatricsCsvDataAdv() {
  this.http.get(this.overallMatriCsUrlAdv)
    .subscribe(
      data => {
        this.overallData_Adv(data)
      },
      err => this.handleError(err)
    );
}

readoverallMatricsCsvDataRotationTranslation() {
  this.http.get(this.overallMatriCsUrl_Obj_RotationTranslation)
    .subscribe(
      data => {
        this.overallData_RotationTranslation(data)
      },
      err => this.handleError(err)
    );
}

readoverallMatricsCsvDataFourier() {
  this.http.get(this.overallMatriCsUrlFourier)
    .subscribe(
      data => {
        this.overallData_Fourier(data)
      },
      err => this.handleError(err)
    );
}

readoverallMatricsCsvDataGrayScale() {
  this.http.get(this.overallMatriCsUrl_Obj_GrayScale)
    .subscribe(
      data => {
        this.overallData_GrayScaler(data)
      },
      err => this.handleError(err)
    );
}

readoverallMatricsCsvDataContrast() {
  this.http.get(this.overallMatriCsUrl_Obj_Contrast)
    .subscribe(
      data => {
        this.overallData_Contrast(data)
      },
      err => this.handleError(err)
    );
}

readoverallMatricsCsvDataAdditiveNoise() {
  this.http.get(this.overallMatriCsUrl_Obj_AdditiveNoise)
    .subscribe(
      data => {
        this.overallData_AdditiveNoise(data)
      },
      err => this.handleError(err)
    );
}

readoverallMatricsCsvDataEidolonNoise() {
  this.http.get(this.overallMatriCsUrl_Obj_EidolonNoise)
    .subscribe(
      data => {
        this.overallData_EidolonNoise(data)
      },
      err => this.handleError(err)
    );
}

readoverallMatricsCsvDataModelComplexity() {
  this.http.get(this.overallMatriCsUrl_Obj_ModelComplexity)
    .subscribe(
      data => {
        this.overallData_ModelComplexity(data)
      },
      err => this.handleError(err)
    );
}

readoverallMatricsCsvDataAdversarialPatches() {
  this.http.get(this.overallMatriCsUrlAdversarialPatches)
    .subscribe(
      data => {
        this.overallData_AdversarialPatches(data)
      },
      err => this.handleError(err)
    );
}

overallData_Adv(data: any) {
  this.overallAdversarialData = []
  this.overallAdversarialData = this.extractoverallData(data)
  //console.log()
}

overallData_RotationTranslation(data: any) {
  this.overallObjRecRotationTranslationData = []
  this.overallObjRecRotationTranslationData = this.extractoverallData(data)
  // console.log()
}

overallData_Fourier(data: any) {
  this.overallFourierData = []
  this.overallFourierData = this.extractoverallData(data)
  //console.log()
}

overallData_GrayScaler(data: any) {
  this.overallObjRecGrayScaleData = []
  this.overallObjRecGrayScaleData = this.extractoverallData(data)
  // console.log()
}

overallData_Contrast(data: any) {
  this.overallObjRecContrastData = []
  this.overallObjRecContrastData = this.extractoverallData(data)
  // console.log()
}

overallData_AdditiveNoise(data: any) {
  this.overallObjRecAdditiveNoiseData = []
  this.overallObjRecAdditiveNoiseData = this.extractoverallData(data)
  // console.log()
}

overallData_EidolonNoise(data: any) {
  this.overallObjRecEidolonNoiseData = []
  this.overallObjRecEidolonNoiseData = this.extractoverallData(data)
  // console.log()
}

overallData_ModelComplexity(data: any) {
  this.overallObjRecModelComplexityData = []
  this.overallObjRecModelComplexityData = this.extractoverallData(data)
  // console.log()
}

overallData_AdversarialPatches(data: any) {
  this.overallAdversarialPatchesData = []
  this.overallAdversarialPatchesData = this.extractoverallData(data)
  //console.log()
}


private extractoverallData(res: any) {
  var tempoverallAdversarialData = []
  var tempoverallMatricsData = this.projectServe.extractCsvData(res);
  var tempoverallMatricsOriginalPrecision = Math.round((Math.round((tempoverallMatricsData[0][1] * 1 + 0.00001) * 100) / 100) * 100);
  var tempoverallMatricsPrecision = Math.round((Math.round((tempoverallMatricsData[0][2] * 1 + 0.00001) * 100) / 100) * 100);
  var tempoverallMatricsDiff
  if (tempoverallMatricsData[0][3] == 'True') {
    tempoverallMatricsDiff = 'red';
  }
  else {
    tempoverallMatricsDiff = 'green';
  }
  let overallData = {
    overallMatricsOriginalPrecision: tempoverallMatricsOriginalPrecision,
    overallMatricsPrecision: tempoverallMatricsPrecision,
    overallMatricsDiff: tempoverallMatricsDiff
  };
  tempoverallAdversarialData.push(overallData)
  return tempoverallAdversarialData
  //sessionStorage.setItem('overallData', JSON.stringify(overallData));
}

private extractData(res: any) {
  var filteredData: any[] = [];
  var classMatricsData = this.projectServe.extractCsvData(res);

  for (let i = 0; i < classMatricsData.length; i++) {
    for (let j = 0; j < classMatricsData[i].length; j++) {
      if (isNaN(classMatricsData[i][j])) {
        //console.log("This is String ",this.classMatricsData[i][j])
      }
      else {
        classMatricsData[i][j] = Math.round((Math.round((classMatricsData[i][j] * 1 + 0.00001) * 100) / 100) * 100);
      }
    }
  }

  let tempRecall: any = [];
  for (let i = 0; i < classMatricsData.length; i++) {
    for (let j = 9; j < 10; j++) {
      if (classMatricsData[i][j] == 'True') {
        tempRecall[i] = 'red';
      }
      else {
        tempRecall[i] = 'green';
      }
    }
  }

  for (let i = 0; i < classMatricsData.length; i++) {
    let record = {
      className: classMatricsData[i][0],
      originalExample: classMatricsData[i][3],
      adversarialExample: classMatricsData[i][4],
      diffRecall: tempRecall[i]
    }
    filteredData.push(record);
  }
  // this.showDetailTable = true
  return filteredData
  //sessionStorage.setItem('filterClassMatricsData',JSON.stringify(filteredData));
}

private handleError(error: any) {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg); // log to console instead
  return errMsg;
}
// createProjectFormControll() {
//   this.projectName = new FormControl('', Validators.required);
//   this.modelName = new FormControl('', Validators.required);
//   this.sampleData = new FormControl('', Validators.required);
// }

adversarialImgClass() {
  this.readoverallMatricsCsvDataAdv();
  this.readClassMatricsCsvDataAdv();
  this.readImageAdv();
  this.showInitialTableAdversarialInputs = true;
}

fourier() {
  this.readoverallMatricsCsvDataFourier();
  this.readClassMatricsCsvDataFourier();
  this.readImageFourierFiltering();
  this.showInitialTableFourierFiltering = true;
}

objectRecognition_WeakSignals() {
  this.grayScale();
  this.contrast();
  this.additivenoise();
  this.eidolonnoise();
  this.modelcomplexity();
  this.rotationtranslation();
  this.showInitialTableGrayScale = true;
}

rotationtranslation() {
  this.readoverallMatricsCsvDataRotationTranslation();
  this.readClassMatricsCsvDataRotationTranslation();
  this.readImageRotationTranslation();
  this.showInitialTableRotationTranslation = true;
}

grayScale() {
  this.readoverallMatricsCsvDataGrayScale();
  this.readClassMatricsCsvDataGrayScale();
  this.readImageGrayScaler();
  this.showInitialTableGrayScale = true;
}

contrast() {
  this.readoverallMatricsCsvDataContrast();
  this.readClassMatricsCsvDataContrast();
  this.readImageContrast();
  this.showInitialTableContrast = true;
}

additivenoise() {
  this.readoverallMatricsCsvDataAdditiveNoise();
  this.readClassMatricsCsvDataAdditiveNoise();
  this.readImageAdditiveNoise();
  this.showInitialTableContrast = true;
}

eidolonnoise() {
  this.readoverallMatricsCsvDataEidolonNoise();
  this.readClassMatricsCsvDataEidolonNoise();
  this.readImageEidolonNoise();
  this.showInitialTableContrast = true;
}

modelcomplexity() {
  // this.readoverallMatricsCsvDataModelComplexity();
  // this.readClassMatricsCsvDataModelComplexity();
  // this.readImageModelComplexity();
  // this.showInitialTableContrast = true;
}

adversarialpatchesImgClass() {
  // this.readoverallMatricsCsvDataAdversarialPatches();
  // this.readClassMatricsCsvDataAdversarialPatches();
  // this.readImageAdversarialPatches();
  // this.showInitialTableAdversarialInputs = true;
}

openMenu() {
  $('div.burger').addClass('open');
  $('div.y').fadeOut(100);
  $('div.screen').addClass('animate');

  setTimeout(function() {
    $('div.x').addClass('rotate30');
    $('div.z').addClass('rotate150');
    $('.menu').addClass('animate');

    setTimeout(function() {
      $('div.x').addClass('rotate45');
      $('div.z').addClass('rotate135');
    }, 100);
  }, 10);
}

closeMenu() {
  $('div.screen, .menu').removeClass('animate');
  $('div.y').fadeIn(150);
  $('div.burger').removeClass('open');
  $('div.x').removeClass('rotate45').addClass('rotate30');
  $('div.z').removeClass('rotate135').addClass('rotate150');

  setTimeout(function() {
    $('div.x').removeClass('rotate30');
    $('div.z').removeClass('rotate150');
  }, 50);
  setTimeout(function() {
    $('div.x, div.z').removeClass('collapse');
  }, 70);
}

// selectModelDataFile(event) {
//   this.modelDataPath = null;
//   var file = event.target.files[0];
//   this.modelDataPath = file.name;
//   this.modelName = event.target.files[0].name;
// }

// selectTestDataFile(event) {
//   this.testDataPath = null;
//   var file = event.target.files[0];
//   this.testDataPath = file.name;
//   this.sampleData = event.target.files[0].name;
// }

readImageAdv() {
  this.http.get(this.outputCsvUrlAdv)
    .subscribe(
      data => {
        this.imageDisplay_Adv(data)
      },
      err => alert("error please check")
    );
}

readImageRotationTranslation() {
  this.http.get(this.outputCsvUrl_Obj_RotationTranslation)
    .subscribe(
      data => {
        this.imageDisplay_RotationTranslation(data)
      },
      err => alert("error please check")
    );
}

readImageFourierFiltering() {
  this.http.get(this.outputCsvUrlFourier)
    .subscribe(
      data => {
        this.imageDisplay_FourierFiltering(data)
      },
      err => alert("error please check")
    );
}

readImageGrayScaler() {
  this.http.get(this.outputCsvUrl_Obj_GrayScale)
    .subscribe(
      data => {
        this.imageDisplay_GrayScale(data)
      },
      err => alert("error please check")
    );
}

readImageContrast() {
  this.http.get(this.outputCsvUrl_Obj_Contrast)
    .subscribe(
      data => {
        this.imageDisplay_Contrast(data)
      },
      err => alert("error please check")
    );
}

readImageAdditiveNoise() {
  this.http.get(this.outputCsvUrl_Obj_AdditiveNoise)
    .subscribe(
      data => {
        this.imageDisplay_AdditiveNoise(data)
      },
      err => alert("error please check")
    );
}

readImageEidolonNoise() {
  this.http.get(this.outputCsvUrl_Obj_EidolonNoise)
    .subscribe(
      data => {
        this.imageDisplay_EidolonNoise(data)
      },
      err => alert("error please check")
    );
}

readImageModelComplexity() {
  this.http.get(this.outputCsvUrl_Obj_ModelComplexity)
    .subscribe(
      data => {
        this.imageDisplay_ModelComplexity(data)
      },
      err => alert("error please check")
    );
}

readImageAdversarialPatches() {
  this.http.get(this.outputCsvUrlAdversarialPatches)
    .subscribe(
      data => {
        this.imageDisplay_AdversarialPatches(data)
      },
      err => alert("error please check")
    );
}

imageDisplay_Adv(data: any) {
  this.csvImgData_Adversarial = []
  this.csvImgData_Adversarial = this.showImage(data)
}

imageDisplay_RotationTranslation(data: any) {
  this.csvImgData_Obj_RotationTranslation = []
  this.csvImgData_Obj_RotationTranslation = this.showImage(data)
  // console.log()
}

imageDisplay_FourierFiltering(data: any) {
  this.csvImgData_FourierFiltering = []
  this.csvImgData_FourierFiltering = this.showImage(data)
}

imageDisplay_GrayScale(data: any) {
  this.csvImgData_Obj_GrayScale = []
  this.csvImgData_Obj_GrayScale = this.showImage(data)
  // console.log()
}

imageDisplay_Contrast(data: any) {
  this.csvImgData_Obj_Contrast = []
  this.csvImgData_Obj_Contrast = this.showImage(data)
  // console.log()
}

imageDisplay_AdditiveNoise(data: any) {
  this.csvImgData_Obj_AdditiveNoise = []
  this.csvImgData_Obj_AdditiveNoise = this.showImage(data)
  // console.log()
}

imageDisplay_EidolonNoise(data: any) {
  this.csvImgData_Obj_EidolonNoise = []
  this.csvImgData_Obj_EidolonNoise = this.showImage(data)
  // console.log()
}

imageDisplay_ModelComplexity(data: any) {
  this.csvImgData_Obj_ModelComplexity = []
  this.csvImgData_Obj_ModelComplexity = this.showImage(data)
  // console.log()
}

imageDisplay_AdversarialPatches(data: any) {
  this.csvImgData_AdversarialPatches = []
  this.csvImgData_AdversarialPatches = this.showImage(data)
}

readLimeData() {
  this.http.get(this.interpretablityCsvUrl)
    .subscribe(
      data => this.extractInterpretablityCsvData(data),
      err => alert("No lime output found!!")
    );
}

extractInterpretablityCsvData(res: any) {
  let csvData = res['_body'] || '';
  let allTextLines = csvData.split(/\r\n/);
  //let headers = allTextLines[0].split(',');
  let limeJson: any;
  let predict: any;
  let explain: any;
  let prob: any;
  let search_classes_with_probability:any;
  let Misclassified_classes_with_high_probability: any;
  let Classified_classes_with_low_probability: any;
  let Correctly_classified_with_high_probability: any;
  let outerFolder: string;
  let imgFolder: string;
  let originalImage: string;
  let className: string;
  let classNameToSearch: string;
  let firstPrediction: string;
  let len = allTextLines.length - 1;
  this.limeCsvData = [];
  this.overal_LimeCsvData = [];
  for (let i = 1; i < allTextLines.length - 1; i++) {
    // split content based on comma
    limeJson = {};
    for (let j = 0; j < 3; j++) {
      if (j == 0) {
        predict = allTextLines[i].substring(allTextLines[i].indexOf("[") + 1, allTextLines[i].indexOf("]"));
        allTextLines[i] = allTextLines[i].replace(allTextLines[i].substring(allTextLines[i].indexOf("[") - 2, allTextLines[i].indexOf("]") + 2), "")
        predict = predict.replace(/'/g, '');
        predict = predict.replace(/ /g, '');
        predict = predict.split(',').slice(0,2);
      }
      else if (j == 1) {
        explain = allTextLines[i].substring(allTextLines[i].indexOf("[") + 1, allTextLines[i].indexOf("]"));
        allTextLines[i] = allTextLines[i].replace(allTextLines[i].substring(allTextLines[i].indexOf("[") - 2, allTextLines[i].indexOf("]") + 2), "")
        explain = explain.replace(/'/g, '');
        explain = explain.replace(/ /g, '');
        explain = explain.split(',').slice(0,2);
      }
      else {
        prob = allTextLines[i].substring(allTextLines[i].indexOf("[") + 1, allTextLines[i].indexOf("]"));
        allTextLines[i] = allTextLines[i].replace(allTextLines[i].substring(allTextLines[i].indexOf("[") - 2, allTextLines[i].indexOf("]") + 2), "")
        prob = prob.replace(/'/g, '');
        prob = prob.replace(/ /g, '');
        prob = prob.split(',').slice(0,2);
        for (let i = 0; i < prob.length; i++) {
          if (!isNaN(prob[i])) {
            prob[i] = parseFloat(prob[i]).toFixed(3);
          }
        }

      }
    }
    let limeSplitData = allTextLines[i].split(',');
    imgFolder = limeSplitData[0].substring(0, limeSplitData[0].indexOf("."));
    originalImage = limeSplitData[0];
    className = limeSplitData[1];
    //Replace the underscore in className with space to make it ready for google image search
    classNameToSearch = className.replace(/_/g, ' ');
    Misclassified_classes_with_high_probability = limeSplitData[4];
    //First prediction out of top three predictions
    firstPrediction = predict[0].replace(/_/g, ' ');
    search_classes_with_probability = limeSplitData[3];
    Classified_classes_with_low_probability = limeSplitData[5];
    Correctly_classified_with_high_probability = limeSplitData[6]
    limeJson = {
      limeImgFolder: imgFolder,
      limeOriginalImage: originalImage,
      limeOriginalClassName: className,
      classNameToSearch: classNameToSearch,
      firstPrediction: firstPrediction,
      predictions: predict,
      explaination: explain,
      probablity: prob,
      search_classes_with_probability:search_classes_with_probability,
      Misclassified_classes_with_high_probability: Misclassified_classes_with_high_probability,
      Classified_classes_with_low_probability: Classified_classes_with_low_probability,
      Correctly_classified_with_high_probability: Correctly_classified_with_high_probability
    }
    this.limeCsvData.push(limeJson);
    // console.log("lime json is --> ", JSON.stringify(limeJson));
  }
  //sessionStorage.setItem('limeCsvData', JSON.stringify(this.limeCsvData));
  //console.log("Lime csv data -->", this.limeCsvData);
  this.overal_LimeCsvData = this.limeCsvData;
}

showImage(res: any) {
  var tempcsvImgData = []
  tempcsvImgData = this.projectServe.extractCsvData(res);
  return tempcsvImgData
  //sessionStorage.setItem('csvImgData', JSON.stringify(this.csvImgData));
}

selectedClassItems_AdversarialInputs($event) {
  // this.showPara = false;
  let col = $event.target.dataset.index;
  this.clickedClass = $event.target.textContent;
  this.advImages = [];
  let x = 0;
  for (let i = 0; i < this.csvImgData_Adversarial.length; i++) {
    if (this.csvImgData_Adversarial[i][1] == this.clickedClass) {
      let record = {
        image: this.csvImgData_Adversarial[i][0],
        orgName: this.csvImgData_Adversarial[i][2],
        perName: this.csvImgData_Adversarial[i][3],
        className: this.csvImgData_Adversarial[i][1]
      }
      this.advImages.push(record);
    }
  }
  // this.showSlider = true;
  this.index8 = 0
}

rotationtranslationClassClick(){
  this.rotationtranslationshowPara = false;
  this.rotationtranslationshowSlider = true;
}

fourierfilteringClassClick(){
  this.fourierfilteringshowPara = false;
  this.fourierfilteringshowSlider = true;
}

grayscaleClassClick(){
  this.grayscaleshowPara = false;
  this.grayscaleshowSlider = true;
}

contrastClassClick(){
  this.contrastshowPara = false;
  this.contrastshowSlider = true;
}

addtivenoiseClassClick(){
  this.additivenoiseshowPara = false;
  this.additivenoiseshowSlider = true;
}

eidolonnoiseClassClick(){
  this.eidolonnoiseshowPara = false;
  this.eidolonnoiseshowSlider = true;
}

modelcomplexityClassClick() {
  this.modelcomplexityshowPara = false;
  this.modelcomplexityshowSlider = true;
}

adversarialInputsClassClick() {
  this.adversarialInputsshowPara = false;
  this.adversarialInputsshowSlider = true;
}

adversarialpatchesClassClick() {
  this.adversarialpatchesshowPara = false;
  this.adversarialpatchesshowSlider = true;
}

selectedClassItems_RotationTranslation($event) {
  // this.showPara = false;
  let col = $event.target.dataset.index;
  this.clickedClass = $event.target.textContent;
  this.objectRecRotationTranslationImages = [];
  let x = 0;
  for (let i = 0; i < this.csvImgData_Obj_RotationTranslation.length; i++) {
    console.log("clicked class -- ", this.csvImgData_Obj_RotationTranslation[i][1])
    if (this.csvImgData_Obj_RotationTranslation[i][1] == this.clickedClass) {
      let record = {
        image: this.csvImgData_Obj_RotationTranslation[i][0],
        orgName: this.csvImgData_Obj_RotationTranslation[i][2],
        perName: this.csvImgData_Obj_RotationTranslation[i][3],
        className: this.csvImgData_Obj_RotationTranslation[i][1],
        rotationtranslationClassTextName: this.csvImgData_Obj_RotationTranslation[i][0].split("."),
        // rotationtranslationClassInitialText:this.csvImgData_Obj_RotationTranslation[i][0].split("."),

        // rotationtranslationClassText: this.csvImgData_Obj_RotationTranslation[i][0].rotationtranslationClassTextName.length,
        // rotationDegree : rotationtranslationClassTextName.length,
        // translationPixel :this.rotationtranslationClassTextName[this.rotationtranslationClassTextName.length-1]

      }
      let array = record.rotationtranslationClassTextName[0].split("_");
      let arrayLength = array.length;
      record["rotationDegree"] = array[array.length-2];
      record["translationPixel"] = array[array.length-1];

      this.objectRecRotationTranslationImages.push(record);
    }
  }

  // this.rotationtranslationClassTextName =

  // for (let j = 0; j < this.rotationtranslationClassTextName.length; j++) {
  //     rotationtranslationClassTextName: this.csvImgData_Obj_RotationTranslation[i][0].split("_"),
  //     // console.log("clicked class is ", this.rotationtranslationClassTextName[j][0]),
  // }

  // this.showSlider = true;
  this.index1=0
}

selectedClassItems_Fourier($event) {
  // this.showPara = false;
  let col = $event.target.dataset.index;
  this.clickedClass = $event.target.textContent;
  this.fourierFilteredImages = [];
  let x = 0;
  for (let i = 0; i < this.csvImgData_FourierFiltering.length; i++) {
    //console.log("clicked class -- ",this.csvImgData_FourierFiltering[i][1])
    if (this.csvImgData_FourierFiltering[i][1] == this.clickedClass) {
      let record = {
        image: this.csvImgData_FourierFiltering[i][0],
        orgName: this.csvImgData_FourierFiltering[i][2],
        perName: this.csvImgData_FourierFiltering[i][3],
        className: this.csvImgData_FourierFiltering[i][1]
      }
      this.fourierFilteredImages.push(record);
    }
  }
  // this.showSlider = true;
  this.index2=0
}

selectedClassItems_GrayScale($event) {
  // this.showPara = false;
  let col = $event.target.dataset.index;
  this.clickedClass = $event.target.textContent;
  this.objectRecGrayScaleImages = [];
  let x = 0;
  for (let i = 0; i < this.csvImgData_Obj_GrayScale.length; i++) {
    console.log("clicked class -- ", this.csvImgData_Obj_GrayScale[i][1])
    if (this.csvImgData_Obj_GrayScale[i][1] == this.clickedClass) {
      let record = {
        image: this.csvImgData_Obj_GrayScale[i][0],
        orgName: this.csvImgData_Obj_GrayScale[i][2],
        perName: this.csvImgData_Obj_GrayScale[i][3],
        className: this.csvImgData_Obj_GrayScale[i][1]
      }
      this.objectRecGrayScaleImages.push(record);
    }
  }
  // this.showSlider = true;
  this.index3=0
}

selectedClassItems_Contrast($event) {
  // this.showPara = false;
  let col = $event.target.dataset.index;
  this.clickedClass = $event.target.textContent;
  this.objectRecContrastImages = [];
  let x = 0;
  for (let i = 0; i < this.csvImgData_Obj_Contrast.length; i++) {
    console.log("clicked class -- ", this.csvImgData_Obj_Contrast[i][1])
    if (this.csvImgData_Obj_Contrast[i][1] == this.clickedClass) {
      let record = {
        image: this.csvImgData_Obj_Contrast[i][0],
        orgName: this.csvImgData_Obj_Contrast[i][2],
        perName: this.csvImgData_Obj_Contrast[i][3],
        className: this.csvImgData_Obj_Contrast[i][1]
      }
      this.objectRecContrastImages.push(record);
    }
  }
  // this.showSlider = true;
  this.index4 = 0
}

selectedClassItems_AdditiveNoise($event) {
  // this.showPara = false;
  let col = $event.target.dataset.index;
  this.clickedClass = $event.target.textContent;
  this.objectRecAdditiveNoiseImages = [];
  let x = 0;
  for (let i = 0; i < this.csvImgData_Obj_AdditiveNoise.length; i++) {
    console.log("clicked class -- ", this.csvImgData_Obj_AdditiveNoise[i][1])
    if (this.csvImgData_Obj_AdditiveNoise[i][1] == this.clickedClass) {
      let record = {
        image: this.csvImgData_Obj_AdditiveNoise[i][0],
        orgName: this.csvImgData_Obj_AdditiveNoise[i][2],
        perName: this.csvImgData_Obj_AdditiveNoise[i][3],
        className: this.csvImgData_Obj_AdditiveNoise[i][1]
      }
      this.objectRecAdditiveNoiseImages.push(record);
    }
  }
  // this.showSlider = true;
  this.index5 = 0
}

selectedClassItems_EidolonNoise($event) {
  // this.showPara = false;
  let col = $event.target.dataset.index;
  this.clickedClass = $event.target.textContent;
  this.objectRecEidolonNoiseImages = [];
  let x = 0;
  for (let i = 0; i < this.csvImgData_Obj_EidolonNoise.length; i++) {
    console.log("clicked class -- ", this.csvImgData_Obj_EidolonNoise[i][1])
    if (this.csvImgData_Obj_EidolonNoise[i][1] == this.clickedClass) {
      let record = {
        image: this.csvImgData_Obj_EidolonNoise[i][0],
        orgName: this.csvImgData_Obj_EidolonNoise[i][2],
        perName: this.csvImgData_Obj_EidolonNoise[i][3],
        className: this.csvImgData_Obj_EidolonNoise[i][1]
      }
      this.objectRecEidolonNoiseImages.push(record);
    }
  }
  // this.showSlider = true;
  this.index6 = 0
}

selectedClassItems_ModelComplexity($event) {
  // this.showPara = false;
  let col = $event.target.dataset.index;
  this.clickedClass = $event.target.textContent;
  this.objectRecModelComplexityImages = [];
  let x = 0;
  for (let i = 0; i < this.csvImgData_Obj_ModelComplexity.length; i++) {
    console.log("clicked class -- ", this.csvImgData_Obj_ModelComplexity[i][1])
    if (this.csvImgData_Obj_ModelComplexity[i][1] == this.clickedClass) {
      let record = {
        image: this.csvImgData_Obj_ModelComplexity[i][0],
        orgName: this.csvImgData_Obj_ModelComplexity[i][2],
        perName: this.csvImgData_Obj_ModelComplexity[i][3],
        className: this.csvImgData_Obj_ModelComplexity[i][1]
      }
      this.objectRecModelComplexityImages.push(record);
    }
  }
  // this.showSlider = true;
}

selectedClassItems_AdversarialPatches($event) {
  // this.showPara = false;
  let col = $event.target.dataset.index;
  this.clickedClass = $event.target.textContent;
  this.adversarialPatchesImages = [];
  let x = 0;
  for (let i = 0; i < this.csvImgData_AdversarialPatches.length; i++) {
    if (this.csvImgData_AdversarialPatches[i][1] == this.clickedClass) {
      let record = {
        image: this.csvImgData_AdversarialPatches[i][0],
        orgName: this.csvImgData_AdversarialPatches[i][2],
        perName: this.csvImgData_AdversarialPatches[i][3],
        className: this.csvImgData_AdversarialPatches[i][1]
      }
      this.adversarialPatchesImages.push(record);
    }
  }
  // this.showSlider = true;
  this.index9 = 0;
}

showDetailFuncRotationTranslation() {
  this.showInitialTableRotationTranslation = false;
  this.showDetailTableRotationTranslation = true;
}

showDetailFuncFourierFiltering() {
  this.showInitialTableFourierFiltering = false;
  this.showDetailTableFourierFiltering = true;
}

showDetailFuncGrayScale() {
  this.showInitialTableGrayScale = false;
  this.showDetailTableGrayScale = true;
}

showDetailFuncContrast() {
  this.showInitialTableContrast = false;
  this.showDetailTableContrast = true;
}

showDetailFuncAdditiveNoise() {
  this.showInitialTableAdditiveNoise = false;
  this.showDetailTableAdditiveNoise = true;
}

showDetailFuncEidolonNoise() {
  this.showInitialTableEidolonNoise = false;
  this.showDetailTableEidolonNoise = true;
}

showDetailFuncModelComplexity() {
  this.showInitialTableModelComplexity = false;
  this.showDetailTableModelComplexity = true;
}

showDetailFuncAdversarialInputs() {
  this.showInitialTableAdversarialInputs = false;
  this.showDetailTableAdversarialInputs = true;
}

showDetailFuncAdversarialPatches() {
  this.showInitialTableAdversarialPatches = false;
  this.showDetailTableAdversarialPatches = true;
}

showInitialFuncRotationTranslation() {
  this.showInitialTableRotationTranslation = true;
  this.showDetailTableRotationTranslation = false;
}

showInitialFuncFourierFiltering() {
  this.showInitialTableFourierFiltering = true;
  this.showDetailTableFourierFiltering = false;
}

showInitialFuncGrayScale() {
  this.showInitialTableGrayScale = true;
  this.showDetailTableGrayScale = false;
}

showInitialFuncContrast() {
  this.showInitialTableContrast = true;
  this.showDetailTableContrast = false;
}

showInitialFuncAdditiveNoise() {
  this.showInitialTableAdditiveNoise = true;
  this.showDetailTableAdditiveNoise = false;
}

showInitialFuncEidolonNoise() {
  this.showInitialTableEidolonNoise = true;
  this.showDetailTableEidolonNoise = false;
}

showInitialFuncModelComplexity() {
  this.showInitialTableModelComplexity = true;
  this.showDetailTableModelComplexity = false;
}

showInitialFuncAdversarialInputs() {
  this.showInitialTableAdversarialInputs = true;
  this.showDetailTableAdversarialInputs = false;
}

showInitialFuncAdversarialPatches() {
  this.showInitialTableAdversarialPatches = true;
  this.showDetailTableAdversarialPatches = false;
}

// checkicValue(): boolean {
//   let localIcValue: any;
//   let icFlag: boolean = false;
//   if (typeof this.icValue == 'string') {
//     localIcValue = JSON.parse(this.icValue);
//     if (localIcValue.robustnessValue || localIcValue.adversarialExamplesValue || localIcValue.adversarialPatchesValue
//       || localIcValue.modelComplexityValue || localIcValue.discriminationValue ||
//       localIcValue.explainabilityValue) {
//       icFlag = true;
//     }
//     else {
//       icFlag = false;
//     }
//   }
//   else
//     icFlag = false;
//   //console.log("icFlag is---",icFlag)
//   return icFlag;
// }


//public show: boolean = true;

  // public slides = [
  //   'First slide',
  //   'Second slide',
  //   'Third slide',
  //   'Fourth slide',
  //   'Fifth slide',
  //   'Sixth slide'
  // ];

  public type: string = 'component';

  public disabled: boolean = false;

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };





  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;


   public onIndexChange(index: number): void {
     console.log('Swiper index: ', index);

   }

   public onSwiperEvent(event: string): void {
     console.log('Swiper event: ', event);
   }

followUpSelect($event){
  console.log($event.target);
}


}

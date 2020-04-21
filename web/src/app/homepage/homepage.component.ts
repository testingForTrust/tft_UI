import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
declare var jQuery:any;
declare var $ :any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

	constructor(public dialog: MatDialog, private router: Router) {}
	private userCheck : boolean ;
  private clickTrigger : boolean ;

  ngOnInit() {

    // @ViewChild('myDiv') private myDiv: ElementRef;


		// if(window.sessionStorage.getItem('user')==="true"){
		// 	this.userCheck = false;
		// }
		//alert("IN home page")
    $('#fullpage').fullpage({
		//Navigation
		// menu: '#menu',
		// lockAnchors: false,
		// anchors:['firstPage', 'secondPage'],
		navigation: false,
		navigationPosition: 'right',
		navigationTooltips: ['firstSlide', 'secondSlide'],
		showActiveTooltip: false,
		slidesNavigation: false,
		slidesNavPosition: 'bottom',

		//Scrolling
		css3: true,
		scrollingSpeed: 700,
		autoScrolling: true,
		fitToSection: true,
		fitToSectionDelay: 1000,
		scrollBar: false,
		easing: 'easeInOutCubic',
		easingcss3: 'ease',
		loopBottom: false,
		loopTop: false,
		loopHorizontal: true,
		continuousVertical: false,
		continuousHorizontal: false,
		scrollHorizontally: false,
		interlockedSlides: false,
		dragAndMove: false,
		offsetSections: false,
		resetSliders: false,
		fadingEffect: false,
		normalScrollElements: '#element1, .element2',
		scrollOverflow: false,
		scrollOverflowReset: false,
		scrollOverflowOptions: null,
		touchSensitivity: 15,
		normalScrollElementTouchThreshold: 5,
		bigSectionsDestination: null,

		//Accessibility
		keyboardScrolling: true,
		animateAnchor: true,
		recordHistory: true,

		//Design
		controlArrows: true,
		verticalCentered: true,
		sectionsColor : ['#ccc', '#fff'],
		paddingTop: '3em',
		paddingBottom: '10px',
		fixedElements: '#header, .footer',
		responsiveWidth: 0,
		responsiveHeight: 0,
		responsiveSlides: false,
		parallax: false,
		parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},

		//Custom selectors
		sectionSelector: '.section',
		slideSelector: '.slide',

		lazyLoading: true,

		//events
		onLeave: function(index, nextIndex, direction){

      if( index == 1 ) {
        $('.section-02').find('.card-01').delay(500).animate({
          opacity:'1',
        }, 4000, 'easeOutExpo');

        $('.section-02').find('.card-02').delay(1000).animate({
          opacity:'1',
        }, 4000, 'easeOutExpo');

        $('.section-02').find('.card-03').delay(1500).animate({
          opacity:'1',
        }, 4000, 'easeOutExpo');

      }

      if( index == 1 && nextIndex == 2 ) {
          // $('.card').addClass('animated fadeIn');
          // $('.card').eq(0).css('animation-delay', '.3s');
      }

      if( index == 2 ) {
        $('.section-03').find('span').delay(500).animate({
          opacity:'1',
        }, 4000, 'easeOutExpo');

        $('.section-03').find('.section-03-cont-wrap').delay(1000).animate({
          opacity:'1',
        }, 4000, 'easeOutExpo');


      }



    },
		afterLoad: function(anchorLink, index){},
		afterRender: function(){
      $('.section-01').find('h1').delay(500).animate({
        opacity:'1',
      }, 4000, 'easeOutExpo');
      $('.section-01').find('p').delay(1500).animate({
        opacity:'1',
      }, 4000, 'easeOutExpo');
    },
		afterResize: function(){},
		afterResponsive: function(isResponsive){},
		afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
		onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
	});

  }

  private tab01:boolean= true;
  private tab02:boolean= false;
  private tab03:boolean= false;

  private showTabContent($event){

  if($event.target.innerText==="Generalization"){
  	this.tab01 = true;
  	this.tab02=  this.tab03 =false;
  }else if($event.target.innerText==="Robustness"){
    this.tab02 = true;
  	this.tab01=  this.tab03 =false;
  }
  	// }else if($event.target.innerText==="Discrimination"){
    //   this.tab02 = true;
    // 	this.tab01=  this.tab03 =false;
    // 	}
    else{
      this.tab03 = true;
    	this.tab01=  this.tab02 =false;
    }
  }



// ngAfterViewInit() {
//     // console.log(this.input.nativeElement.value);
//     // console.debug(this.divs);
//   }

  triggerclick() {
    let element:HTMLElement = document.getElementById('LoginButton') as HTMLElement;

		this.router.navigate(['/image-classifier'])
    // if(sessionStorage.getItem('currentUser')){
    //   this.router.navigate(['\image-classifier']);
    // }
    // else{
    //   element.click();
    //   this.router.navigate(['\image-classifier']);
    // }

  }



}

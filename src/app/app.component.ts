import { Component, OnInit } from '@angular/core';
import {Firestore} from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {AnimateHero} from './hero.animation';
import {AnimateText} from './test.animation'; // TODO: Add text animation
// import gsap from 'gsap';
@Component({
  selector: 'owl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showNavMenu: boolean = false;
  logoImg$: BehaviorSubject<any>;

  constructor(/* private afs: AngularFirestore */) {
    this.logoImg$ = new BehaviorSubject('logo_full_shadow.png');
  }

  // async addNewSubscriber(name: string, email: string, form: NgForm) {
  //   const data = {
  //     name,
  //     email,
  //     timestamp: new Date()
  //   };
  //   const response = await this.afs.collection('subscribers').add(data);
  //   if (response) {
  //     alert('Successfully subscribed!')
  //   }
  //   form.reset();
  // }

  // async addNewContact(data: any, form: NgForm) {
  //   data.timestamp = new Date();
  //   const response = await this.afs.collection('contacts').add(data);
  //   if (response) {
  //     alert('Successfully sent message!')
  //   }
  //   form.reset();
  // }

  toggleNav() {
    this.showNavMenu = !this.showNavMenu;
  }

  getResponsiveLogo() {
    const windowWidth = window.outerWidth;
    return windowWidth > 767 ? this.logoImg$.next('logo_full_shadow.png') : this.logoImg$.next('logo_@2500.png');
  }

  ngOnInit() {
    this.getResponsiveLogo();
    AnimateHero();
    /**
   * Easy selector helper function
   */
  const select = (el: any, all = false) => {
    el = el.trim()
    if (all) {
      return document.querySelectorAll(el)
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type: string, el: string, listener: any, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach((e: any) => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Mobile nav toggle
   */
  const toogleNav = function() {
    let navButton = select('.nav-toggle')
    navButton.classList.toggle('nav-toggle-active')
    navButton.classList.toggle('is-active')

    select('.nav-menu').classList.toggle('nav-menu-active')
  }
  on('click', '.nav-toggle', function(e: any) {
    toogleNav();
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.nav-menu .drop-down > a', function(e: any) {
    e.preventDefault()
    select('.nav-menu .drop-down > a').nextElementSibling.classList.toggle('drop-down-active')
    select('.nav-menu .drop-down > a').parentElement.classList.toggle('active')
  }, true)

  /**
   * Scrool links with a class name .scrollto
   */
  on('click', '.scrollto', function(e: Event) {
    if (select(e.target)) {
      select('.nav-menu .active').classList.remove('active')
      select('.scrollTo').parentElement.classList.toggle('active')
      toogleNav();
    }
  }, true)

  }
}

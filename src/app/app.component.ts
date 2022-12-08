import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {AnimateHero} from './hero.animation';
import {AnimateText} from './text.animation'; // TODO: Add text animation
import * as Aos from 'aos';

@Component({
  selector: 'owl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showNavMenu: boolean = false;
  logoImg$: BehaviorSubject<any>;
  subscriberData?: any = {};
  contactData?: any = {};
  faqDb?: any = [];
  regexpVal: string = `(\b)(on\S+)(\s*)=|javascript|<(|\/|[^\/>][^>]+|\/[^>][^>]+)>`;
  subMsg?: any;
  contactMsg?: any = {
    success: false,
    msg: '',
  };

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.logoImg$ = new BehaviorSubject('logo_full_shadow.png');
  }

  async addNewSubscriber(data: any, form: NgForm) {
    data.timestamp = new Date();
    const res = await this.afs.collection<any>('subscribers').add(data);
    if (res) {
      form.reset();
    } else {
      alert('Opps! Something went wrong. Please, try again.')
    }

  }

  async addNewContact(data: any, form: NgForm) {
    data.timestamp = new Date();
    const res = await this.afs.collection('contacts').add(data);
    if (res) {
      form.reset();
      this.contactMsg.success = true;
      this.contactMsg.msg = `Your message has been sent!`;
    } else {
      alert('Opps! Something went wrong. Please, try again.')
    }

  }

  toggleNav() {
    this.showNavMenu = !this.showNavMenu;
  }

  getResponsiveLogo() {
    const windowWidth = window.outerWidth;
    return windowWidth > 767 ? this.logoImg$.next('logo_full_shadow.png') : this.logoImg$.next('logo_@2500.png');
  }

  ngOnInit() {
    Aos.init({
      useClassNames: true,
      once: false,
      duration: 600,
    });
    this.getResponsiveLogo();
    AnimateHero();

    this.db.list('faq').valueChanges().subscribe(db => this.faqDb = db);

    /**
   * Easy selector helper function
   */
  const select = (el?: any, all = false) => {
    el = el.trim()
    if (all) {
      return document.querySelectorAll(el)
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function TODO: use ng-click to replace all event listeners
   */
  const on = (type?: string, el?: any, listener?: any, all = false) => {
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
  const toogleNav = () => {
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
  // on('click', '.scrollto', function(e: Event) {
  //   if (e.target.hash) {
  //     select('.nav-menu .active').classList.remove('active')
  //     select('.scrollTo:focus').parentElement.classList.toggle('active')
  //     toogleNav();
  //   }
  // }, true)

  }
}

import { Component, OnInit } from '@angular/core';

import {AnimateHero} from './hero.animation';
import {AnimateText} from './test.animation';
// import gsap from 'gsap';
@Component({
  selector: 'owl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
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

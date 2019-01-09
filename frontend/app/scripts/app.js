'use strict';

import $ from 'jquery';
import initServicerWorker from './sw/service-worker-registration';
import magnificPopupInit from './utils/popup';

// Register Service Worker
initServicerWorker();

class Person {
  constructor(name) {
    this.name = name;
  }

  hello() {
    if (typeof this.name === 'string') {
      return `Hello, I am ${this.name}!`;
    }

    return 'Hello!';
  }
}



$('h1').html('Hello from app.js!');

const harry = new Person('Harman Manchanda');
console.log(harry.hello());

magnificPopupInit();
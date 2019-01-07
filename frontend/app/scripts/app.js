'use strict';

import $ from 'jquery';
import screenSize from './utils/screenSize';
import magnificPopupInit from './utils/popup';

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

console.log( screenSize().x, 12345 );
console.log($('figure').html());

const harry = new Person('Harman Manchanda');
console.log(harry.hello());

magnificPopupInit();
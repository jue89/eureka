# Eureka!

This is just a very tiny framework<sup>[1](#fn1)</sup> for grouping several node services into one node process. All in all this repository accommodates an empty shell. All the magic will happen in its forks.

## Example

File: services/a.js
```javascript
'use strict';
// Fire me up!

module.exports = {
  implements: 'service:a',
  inject: []
};

module.exports.factory = function() {

  console.log( "a up" );

  let i = setInterval( () => console.log( "a" ), 1200 );

  return function() {
    clearInterval( i );
    console.log( "a down" );
  }

};
```

File: services/b.js
```javascript
'use strict';
// Fire me up!

module.exports = {
  implements: 'service:b',
  inject: []
};

module.exports.factory = function() {

  console.log( "b up" );

  let i = setInterval( () => console.log( "b" ), 1100 );

  return function() {
    return new Promise( ( resolve ) => {
      setTimeout( () => {
        clearInterval( i );
        console.log( "b down" );
        resolve();
      }, 1500 );
    } );
  };

};
```

Start *Eureka*, observe its outputs and then shutdown the process by pressing ```<CTRL> + <C>```

---

<a name="fn1">1</a>: Yes, I like writing frameworks. I must force myself not to write a framework for every *Hello World* project that I come in touch with. But this time I think it's worth to put this little amount of time into *Eureka*.

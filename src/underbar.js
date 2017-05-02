(function() {
  'use strict';

  window._ = {};

  _.identity = function(val) {
    return val;
  };


  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };


  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length-1] 
    } else if (n === 0) {
      return [];
    } else {
      return array.slice(-n);
    }
  }; 


  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection){
        iterator(collection[key], key, collection);
      }
    }
  };

  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };


  _.filter = function(collection, test) {
    var result = [];
      _.each(collection, function(element, key){
        if (test(element, key)) {
          result.push(element);
        }
      });

    return result;
  };


  _.reject = function(collection, test) {
    return _.filter(collection, function(element, key){
      return !test(element, key);
    });
  };


  _.uniq = function(array) {
    var result = [];
    var duplicate = false;

    _.each(array, function(item, index){
      _.each(result, function(itemResult, indexResult){
        if (item === itemResult){
          duplicate = true;
        }
      });
      if (duplicate === false){
        result.push(item);
      }
      duplicate = false;
    });

    return result;
  };


  _.map = function(collection, iterator) {
    var result = [];
      _.each(collection, function(element, key){
        result.push(iterator(element, key));
      })

    return result;
  };


  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };


  _.reduce = function(collection, iterator, accumulator) {
    var result = accumulator;
    if (accumulator === undefined) {
      result = collection[0];
      collection = collection.slice(1);
    }
    
    _.each(collection, function(element, key) {
      result = iterator(result, element, key);
    })

    return result;
  };



  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


   // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    
    return _.reduce(collection, function(allTrue, element){
      if (!allTrue){
        return false;
      }
      if (!iterator){
        return !!element;
      } 
      return !!iterator(element);
    }, true)
  };







  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  // TIP: There's a very clever way to re-use every() here.

  _.some = function(collection, iterator) {
    var atLeastOneTrue = false;
    _.each(collection, function(element, key){
      if (!iterator){
        if (!!element){
          atLeastOneTrue = true;
        }
      }
      else if (iterator(element)){
        atLeastOneTrue = true;
      }
    })
    return atLeastOneTrue;
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var args = Array.prototype.slice.call(arguments);
    args = args.slice(1);

    _.each(args, function(element){
      _.each(element, function(element, key){
        obj[key] = element;
      });
    })

    return obj;

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var args = Array.prototype.slice.call(arguments);
    args = args.slice(1);
    
    _.each(args, function(element){
      _.each(element, function(element, key){
        if (obj[key] === undefined){
          obj[key] = element;
        }
      })
    })

    return obj;

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var previousArguments = {};

    return function(){
      var key = JSON.stringify(arguments);
      console.log(key);

      if (previousArguments[key] !== undefined){
        return previousArguments[key];
      } 
      var result = func.apply(this, arguments);
      previousArguments[key] = result;
      return result;

    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments);
    args = args.slice(2);

    setTimeout(function(){
      func.apply(this, args)
    }, wait);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice

  _.shuffle = function(array) {
    var results = array.slice();
    var temp;
    var randomNumber;

    for (var i = results.length - 1; i >= 0; i--){
      temp = results[i];
      randomNumber = Math.floor(Math.random() * i);
      results[i] = results[randomNumber];
      results[randomNumber] = temp;
    }    
    return results;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());


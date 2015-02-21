var app = angular.module('modaApp');

app.directive('bnLazySrc', function($window, $document) {
    // I manage all the images that are currently being
    // monitored on the page for lazy loading.
    var lazyLoader = (function() {
      // I maintain a list of images that lazy-loading
      // and have yet to be rendered.
      var images = [];
      // I define the render timer for the lazy loading
      // images to that the DOM-querying (for offsets)
      // is chunked in groups.
      var renderTimer = null;
      var renderDelay = 500;
      // I cache the window element as a jQuery reference.
      var win = $window;
        console.log(win);

      // I cache the document document height so that
      // we can respond to changes in the height due to
      // dynamic content.
      var doc = angular.element($document);
        console.log("doc:: " + doc);
      var documentHeight = doc.clientHeight;
      var documentTimer = null;
      var documentDelay = 2000;
      // I determine if the window dimension events
      // (ie. resize, scroll) are currenlty being
      // monitored for changes.
      var isWatchingWindow = false;
      // ---
      // PUBLIC METHODS.
      // ---
      // I start monitoring the given image for visibility
      // and then render it when necessary.
      function addImage(image) {
        images.push(image);
        if (!renderTimer) {
          startRenderTimer();
        }
        if (!isWatchingWindow) {
          startWatchingWindow();
                        console.log("isWatchingWindow:: " + isWatchingWindow);

        }
      }
      // I remove the given image from the render queue.
      function removeImage(image) {
        // Remove the given image from the render queue.
        for (var i = 0; i < images.length; i++) {
          if (images[i] === image) {
            images.splice(i, 1);
            break;
          }
        }
        // If removing the given image has cleared the
        // render queue, then we can stop monitoring
        // the window and the image queue.
        if (!images.length) {
          clearRenderTimer();
          stopWatchingWindow();
        }
      }
      // ---
      // PRIVATE METHODS.
      // ---
      // I check the document height to see if it's changed.
      function checkDocumentHeight() {
        // If the render time is currently active, then
        // don't bother getting the document height -
        // it won't actually do anything.
        if (renderTimer) {
          return;
        }
        var currentDocumentHeight = doc.clientHeight;
        // If the height has not changed, then ignore -
        // no more images could have come into view.
        if (currentDocumentHeight === documentHeight) {
          return;
        }
        // Cache the new document height.
        documentHeight = currentDocumentHeight;
        startRenderTimer();
      }
      // I check the lazy-load images that have yet to
      // be rendered.
      function checkImages() {
        // Log here so we can see how often this
        // gets called during page activity.
        console.log('Checking for visible images...');
        var visible = [];
        var hidden = [];
        // Determine the window dimensions.
        var windowHeight = win.innerHeight;
        var scrollTop = win.scrollY;
        console.log("win.scrollY::: " + win.scrollY);

          
        // Calculate the viewport offsets.
        var topFoldOffset = scrollTop;
        var bottomFoldOffset = (topFoldOffset + windowHeight);
        // Query the DOM for layout and seperate the
        // images into two different categories: those
        // that are now in the viewport and those that
        // still remain hidden.
        console.log("images.length::: " + images.length)
        for (var i = 0; i < images.length; i++) {
          var image = images[i];
            console.log("topFoldOffset:: " + topFoldOffset);
          if (image.isVisible(topFoldOffset, bottomFoldOffset)) {
            visible.push(image);
          } else {
            hidden.push(image); // <- this is a DOM element and not a jqLite element
          }
        }
        // Update the DOM with new image source values.
        for (var i = 0; i < visible.length; i++) {
          visible[i].render();
        }
        // Keep the still-hidden images as the new
        // image queue to be monitored.
        images = hidden;
        console.log("hidden: " + hidden);
        // Clear the render timer so that it can be set
        // again in response to window changes.
        clearRenderTimer();
        // If we've rendered all the images, then stop
        // monitoring the window for changes.
        if (!images.length) {
          stopWatchingWindow();
        }
      }
      // I clear the render timer so that we can easily
      // check to see if the timer is running.
      function clearRenderTimer() {
        clearTimeout(renderTimer);
        console.log('clear timer');
        renderTimer = null;
        console.log('Render Timer: ' + renderTimer);
      }
      // I start the render time, allowing more images to
      // be added to the images queue before the render
      // action is executed.
      function startRenderTimer() {
        console.log('render');
        renderTimer = setTimeout(checkImages, renderDelay);
      }
      // I start watching the window for changes in dimension.
      function startWatchingWindow() {
        isWatchingWindow = true;
        // Listen for window changes.
        angular.element(win).on('resize', windowChanged);
        angular.element(win).on('scroll', windowChanged);
        // Set up a timer to watch for document-height changes.
        documentTimer = setInterval(checkDocumentHeight, documentDelay);
      }
      // I stop watching the window for changes in dimension.
      function stopWatchingWindow() {
        isWatchingWindow = false;
        // Stop watching for window changes.
        angular.element(win).off('resize');
        angular.element(win).off('scroll');
        // Stop watching for document changes.
        clearInterval(documentTimer);
      }
      // I start the render time if the window changes.
      function windowChanged() {
        console.log('scroll');
        console.log(renderTimer);
        if (!renderTimer) {
          startRenderTimer();
        }
      }
      // Return the public API.
      return ({
        addImage: addImage,
        removeImage: removeImage
      });
    })();
    
    
    
    
    
    
    
    
    // ------------------------------------------ //
    // ------------------------------------------ //
    // I represent a single lazy-load image.
    function LazyImage(element) {
      // I am the interpolated LAZY SRC attribute of
      // the image as reported by AngularJS.
      var source = null;
      // I determine if the image has already been
      // rendered (ie, that it has been exposed to the
      // viewport and the source had been loaded).
      var isRendered = false;
      // I am the cached height of the element. We are
      // going to assume that the image doesn't change
      // height over time.
      var height = null;
      // ---
      // PUBLIC METHODS.
      // ---
      // I determine if the element is above the given
      // fold of the page.
      function isVisible(topFoldOffset, bottomFoldOffset) {
        // TODO: the first time it is called the element is a jqlite element, so we need to get it as first element of an array
        // On the second instance the element is a DOM img, so it doesn't need to be retrieved.
        // The element should be always the same.
        if (element[0]) {
          element = element[0];
        }
        // If the element is not visible because it
        // is hidden, don't bother testing it.
        // if ( ! element.is( ':visible' ) ) {
        //
        //   return( false );
        //
        // }
        // If the height has not yet been calculated,
        // the cache it for the duration of the page.
        if (height === null) {
          height = element.offsetHeight;
        }
        // Update the dimensions of the element.
        var top = element.offsetTop;
        var bottom = (top + height);

        // Return true if the element is:
        // 1. The top offset is in view.
        // 2. The bottom offset is in view.
        // 3. The element is overlapping the viewport.
        return (
          (
            (top <= bottomFoldOffset) &&
            (top >= topFoldOffset)
          ) ||
          (
            (bottom <= bottomFoldOffset) &&
            (bottom >= topFoldOffset)
          ) ||
          (
            (top <= topFoldOffset) &&
            (bottom >= bottomFoldOffset)
          )
        );

      }
      // I move the cached source into the live source.
      function render() {
        isRendered = true;
        renderSource();
      }
      // I set the interpolated source value reported
      // by the directive / AngularJS.
      function setSource(newSource) {
        source = newSource;
        if (isRendered) {
          renderSource();
        }
      }
      // ---
      // PRIVATE METHODS.
      // ---
      // I load the lazy source value into the actual
      // source value of the image element.
      function renderSource() {
        element.src = source;
      }
      // Return the public API.
      return ({
        isVisible: isVisible,
        render: render,
        setSource: setSource
      });
    }
    // ------------------------------------------ //
    // ------------------------------------------ //
    // I bind the UI events to the scope.
    function link($scope, element, attributes) {
      var lazyImage = new LazyImage(element);
      // Start watching the image for changes in its
      // visibility.
      lazyLoader.addImage(lazyImage);
      // Since the lazy-src will likely need some sort
      // of string interpolation, we don't want to
      attributes.$observe(
        'bnLazySrc',
        function(newSource) {
          lazyImage.setSource(newSource);
                        console.log("newSource::::: " + newSource);

        }
      );
      // When the scope is destroyed, we need to remove
      // the image from the render queue.
      $scope.$on(
        '$destroy',
        function() {
          lazyLoader.removeImage(lazyImage);
        }
      );
    }
    // Return the directive configuration.
    return ({
      link: link,
      restrict: 'A'
    });
  }
);
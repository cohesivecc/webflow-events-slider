## Webflow Slider Events

This library is a simple addition to [Webflow's](https://webflow.com) slider component that triggers a jQuery event any time a slider component is 'navigated.' This includes clicking on the previous/next arrows, clicking a nav dot, or swiping left/right.

### Usage

This library does just one thing: fire the events - you'll write code to listen for these events and perform some action. You can listen for all sliders events on your page, or you can listen to specific sliders by giving them and id, class or data attribute(s) and using jQuery selectors.

**Gotcha:** This library will fire an event **every time** a 'navigation' events occurs, **regardless of whether or not the slide actually changes** (ie. if you click the first nav dot six times, then six events will fire). It's your responsibility to handle this scenario (if necessary) in your event listener functionality to prevent unwanted duplication of actions.

Create a listener hook in your Javascript somewhere:

```javascript
var Webflow = Webflow || [];
Webflow.push(function () {
  // listen for all sliders on the page - .w-slider is Webflow's default class for slider components
  $(document).on('slider-event', '.w-slider', function(e, data) {
    	// do your thang
 	});

  // OR - listen for events from a specific subset of sliders
  $(document).on('slider-event', '.trackable-slider', function(e, data) {
    	// do your thang
 	});
});
```

Finally, upload your Javascript and ```webflow.events.slider.js``` to your server, and include them via script tag in the Custom Code section of your site in Webflow:

```
<script src="/your-event-handler-script.js" type="text/javascript"></script>
<script src="/webflow.events.slider.js" type="text/javascript"></script>
```

**Important:** When the page finishes loading, ```webflow.events.slider.js``` automatically triggers an event for the first slide on all (visible) sliders on the page. For this reason your event handler script(s) must be included **before** ```webflow.events.slider.js``` if you want it to pick up the initial event for the first slide.

### Parameters

#### ```event```

This is the event triggered on the slider for any navigation event. It is a standard (jQuery event object)[https://api.jquery.com/category/events/event-object/].

* ```event.target``` - The slider that the event was triggered on.

#### ```data```

This is the data object that Webflow's Javascript library attaches to a slider. It contains some useful information like:

* ```data.index``` - The index of the current slide showing.
* ```data.previous``` - The index of the previously displayed slide.
* ```data.slides``` - DOM elements for the individual slides.
* ```data.nav``` - The DOM element which contains the nav dots.

### Example
This example makes a simple call to Google Analytics for each time a slide is displayed. You could very easily enhance this to track more descriptive info by adding data attributes to either the slider or even the slides themselves.

```javascript
var Webflow = Webflow || [];
Webflow.push(function () {
  $(document).on('slider-event', '.w-slider', function(event, data) {
      // track which slides are viewed in Google Analytics
      var slider  = event.target;
      var slide   = data.slides[data.index];

      // prevent a slide from being recorded in GA twice for a given page load
      if(!$(slide).data('tracked')) {
        $(slide).data('tracked', true); // set a simple data attribute on the slide to prevent multiple GA calls
      	ga('send', 'event', 'Slider View', $(slider).attr('id'), "Slide #"+data.index);
      }
    });
});
```

### License
This library is licensed under the [MIT License](http://www.opensource.org/licenses/MIT).

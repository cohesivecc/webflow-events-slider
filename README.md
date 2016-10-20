## Webflow Slider Events

This library is a simple addition to [Webflow's](https://webflow.com) slider component that triggers a jQuery event any time a designated slider component is 'navigated.' This includes clicking on the previous/next arrows, clicking a nav dot, or swiping left/right.


### Usage

This library does just one thing: fire the events. You'll need to write code to listen for these events. Additionally, this library will fire an event every time a 'navigation' events occurs, regardless of whether or not the slide actually changes (ie. if you click the first nav dot six times, then 6 events will fire). It's your responsibility to handle this scenario in your event listener functionality.

Listener hook:

```javascript
var Webflow = Webflow || [];
Webflow.push(function () {
  $(document).off('slider-event', '[data-slider-events]')
    .on('slider-event', '[data-slider-events]', function(e, data, slider) {
    	// do your thang
 	});
});
```

Next, add the 'data-slider-events' attribute to any sliders you want to track.

Finally, upload your Javascript and ```webflow.events.slider.js``` to your server, and include them via script tag in the Custom Code section of your site in Webflow:

```
<script src="/your-event-handler-script.js" type="text/javascript"></script>
<script src="/webflow.events.slider.js" type="text/javascript"></script>
```

**Note:** Your event handler script(s) must be included **before** ```webflow.events.slider.js``` if you want it to pick up the initial event for the first slide.

### Parameters

#### ```data```

This is the data object that Webflow's Javascript library attaches to a slider. It contains some useful information like:

* ```data.index``` - The index of the current slide showing.
* ```data.previous``` - The index of the previously displayed slide.
* ```data.slides``` - DOM elements for the individual slides.
* ```data.nav``` - The DOM element which contains the nav dots.

#### ```slider```

This is the DOM element for the slider itself.

### Example
This example makes a simple call to Google Analytics for each time a slide is displayed. You could very easily enhance this to track more descriptive info by adding data attributes to either the slider or even the slides themselves.

```javascript
var Webflow = Webflow || [];
Webflow.push(function () {
  $(document)
  	.off('slider-event', '[data-slider-events]')
    .on('slider-event', '[data-slider-events]', function(e, data, slider) {
    	ga('send', 'event', 'Slider View', $(slider).attr('id'), data.index);
    });
});
```



### License
This library is licensed under the [MIT License](http://www.opensource.org/licenses/MIT).

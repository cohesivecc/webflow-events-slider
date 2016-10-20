/*
 * Webflow Embedly GA: Adds Google Analytics event tracking to a Webflow site for Embedly embedded videos (Webflow's default)
 * @license MIT
 * @author Neal White - http://www.cohesive.cc
 *
 * https://github.com/cohesivecc/webflow-events-slider
*/

var Webflow = Webflow || [];
Webflow.push(function () {
  var namespace = '.w-slider';

  function slideChangeEvent(evt) {
    var slider;
    if($(evt.target).is('[data-slider-events]')) {
      slider = $(evt.target);
    } else {
      slider = $(evt.target).closest('[data-slider-events]')
    }
    if(slider) {
      $(slider).trigger('slider-event', $(slider).data(namespace));
    }
  }

  var tap_selector = '[data-slider-events] .w-slider-arrow-left, [data-slider-events] .w-slider-arrow-right, [data-slider-events] .w-slider-dot';
  $(document).off('tap' + namespace, tap_selector, slideChangeEvent).on('tap' + namespace, tap_selector, slideChangeEvent);

  var swipe_selector = '[data-slider-events]';
  $(document).off('swipe' + namespace, swipe_selector, slideChangeEvent).on('swipe' + namespace, swipe_selector, slideChangeEvent);

  // initial slide - manually trigger the event
  $('[data-slider-events]:visible').each(function(i, s) {
    slideChangeEvent({ target: s })
  });

});

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

  $('[data-slider-events]' + namespace).each(function() {

    var _data = $(this).data(namespace);
    var _this = this;

    _this.slideChanged = function() {
      $(_this).trigger('slider-event', [_data, _this])
    }

    // listeners
    _data.el.on('swipe' + namespace, function(e, d) {
      _this.slideChanged();
    });
    _data.left.on('tap' + namespace, function(e) {
      _this.slideChanged();
    });
    _data.right.on('tap' + namespace, function(e) {
      _this.slideChanged();
    });
  	_data.nav.on('tap' + namespace, '> div', function(e) {
      _this.slideChanged();
    });

    // initial slide - manually trigger the event
    if($(_data.el).is(":visible")) {
      _this.slideChanged();
    }
  });

});

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-group'],
  classNameBindings: ['hasFeedback', 'hasSuccess', 'hasWarning'],
  hasFeedback: function () {
    return this.get('isDirty')
  }.property('isDirty'),
  hasSuccess: function () {
    return this.get('isValid')
  }.property('isValid'),
  hasWarning: function () {
    return this.get('isDirty') && !this.get('isValid')
  }.property('isDirty', 'isValid'),
  actions: {
    validate: function () {
      var text = this.get('value'),
        loc = {},
        isDirty = false,
        isLatValid = false,
        isLngValid = false,
        isValid = false,
        errorText = "";

      if (!Ember.isEmpty(text)) {
        try {
          var splits = text.trim().split(',', 2);

          isDirty = splits.length === 2;

          loc.lat = parseFloat(splits[0]);
          loc.lng = parseFloat(splits[1]);

          isLatValid = ((!isNaN(loc.lat)) && loc.lat <= 90 && loc.lat >= -90);
          isLngValid = ((!isNaN(loc.lng)) && loc.lng <= 180 && loc.lng >= -180);

          isValid = isLatValid && isLngValid;

          if (!isValid) {
            if (!isLatValid) {
              errorText += "Invalid Latitude; ";
            }

            if (!isLngValid) {
              errorText += "Invalid Longitude; ";
            }
          }

        }
        catch (e) {
          console.log('LOC-INPUT.JS> ' + e);
        }

      }

      this.set('loc', loc);
      this.set('isDirty', isDirty);
      this.set('isValid', isValid);
      this.set('errorText', errorText);

    }
  }
});


import Ember from 'ember';

export default Ember.Component.extend({
  isExpanded:true,
  actions:{
    toggleExpanded:function(){
      this.toggleProperty('isExpanded');
      console.log("form expanded: "+this.get('isExpanded'));
    }
  }
});

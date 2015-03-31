'use strict';

/**
 * @ngdoc service
 * @name lggApp.contactFormRepository
 * @description
 * # contactFormRepository
 * Factory in the lggApp.
 */
angular.module('lggApp')
  .factory('contactFormRepository', function (fbutil) {
    // Service logic
    var ref = fbutil.ref('contactForms');
    var forms = fbutil.sync(ref.orderByChild('entryDate')).$asArray();
    // Public API here
    return {
      getContactForm: function (formId) {
        return fbutil.sync(ref.child(formId)).$asObject();
      },
      getContactForms: function () {
        return forms;
      },
      
      addContactForm: function(newForm) {
         newForm.entryDate = newForm.entryDate.getTime(); 
          return fbutil.sync(ref).$push(newForm);
      }, 
      editContactForm: function(form) {
        if(form.entryDate.getTime) { form.entryDate = form.entryDate.getTime(); }
        return forms.$save(form);
      }
  }
});

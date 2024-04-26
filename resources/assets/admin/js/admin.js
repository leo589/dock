require('./bootstrap');

window.Vue = require('vue');

Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('class-student', require('./components/class_information/ClassStudent.vue'))

const admin = new Vue({
    el: '#app'
});

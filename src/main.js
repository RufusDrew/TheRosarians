import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { library } from "@fortawesome/fontawesome-svg-core";
// import {
//   faPlay,
//   faPause,
//   faStepForward,
//   faStepBackward,
//   faTimes
// } from "@fortawesome/free-solid-svg-icons";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./registerServiceWorker";
// library.add(faPlay, faPause, faStepForward, faStepBackward, faTimes, faGithub);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Vue2Editor);

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
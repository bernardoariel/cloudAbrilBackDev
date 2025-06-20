"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firebaseConfig = {
    apiKey: "AIzaSyBfd1SsZoBsAYvaYkd5d7lUm3Oj6-MXuAk",
    authDomain: "abril-login.firebaseapp.com",
    projectId: "abril-login",
    storageBucket: "abril-login.appspot.com",
    messagingSenderId: "78779911413",
    appId: "1:78779911413:web:7f68d722800855052689bc"
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.auth = (0, auth_1.getAuth)(app);
//# sourceMappingURL=firebase-config.js.map
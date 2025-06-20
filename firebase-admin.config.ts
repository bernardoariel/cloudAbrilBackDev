import * as admin from 'firebase-admin';
import * as serviceAccount from './src/config/firebase-service-account.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: 'abril-login.appspot.com', 
});

export const firebaseAdmin = admin;

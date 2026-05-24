import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDP767vYddqUDd8OsMpf7LQJ6oJcseSCPs",
  authDomain: "zakatnow-1b7fb.firebaseapp.com",
  projectId: "zakatnow-1b7fb",
  storageBucket: "zakatnow-1b7fb.firebasestorage.app",
  messagingSenderId: "375169065947",
  appId: "1:375169065947:web:07871cd35b224b64d77dfe"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
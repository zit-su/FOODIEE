import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, onDisconnect, onValue, ref, serverTimestamp, set, update } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const config = window.FOODIE_FIREBASE_CONFIG || {};
const hasRealValue = (value) => value && !String(value).includes("YOUR_");
const configured = Boolean(hasRealValue(config.apiKey) && hasRealValue(config.databaseURL) && hasRealValue(config.projectId) && hasRealValue(config.appId));
let database = null;
try { if (configured) database = getDatabase(initializeApp(config)); } catch (error) { console.warn("Foodie Firebase could not be initialized.", error); }
window.FoodieFirebase = {
  configured: Boolean(database), database,
  ref: (path) => ref(database, path),
  set: (pathOrRef, value) => set(typeof pathOrRef === "string" ? ref(database, pathOrRef) : pathOrRef, value),
  update: (pathOrRef, value) => update(typeof pathOrRef === "string" ? ref(database, pathOrRef) : pathOrRef, value),
  listen: (path, callback, onError) => onValue(ref(database, path), (snapshot) => callback(snapshot.val()), onError),
  serverTimestamp,
  onDisconnect: (pathOrRef) => onDisconnect(typeof pathOrRef === "string" ? ref(database, pathOrRef) : pathOrRef)
};
window.dispatchEvent(new CustomEvent("foodie-firebase-ready", { detail: { configured: Boolean(database) } }));

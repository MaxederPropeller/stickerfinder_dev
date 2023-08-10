import { useState } from "react";
import {
  app,
  auth as firebaseAuth,
  db,
  storage,
} from "./path-to-your-firebase-config"; // Pfad zu deiner Firebase-Konfigurationsdatei
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

export const useFirebase = () => {
  const [user, setUser] = useState(null);

  // User Auth
  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(firebaseAuth);
      setUser(null);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Collection abrufen ------------------
  // -------------------------------------
  // Gerade eben eien Funktion zum add von dokumentn in fire store beigefügt::
  // nächster schritt anpassen auf alle Usecases und auth einrichten,
  // danach kann man einen context über die app legen
  // und die funktionen in den context legen und überall verwenden
  // Danach User prof einrihten:
  const addMarker = async () => {
    try {
      await setDoc(doc(db, "cities", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
      });
      console.log("City added successfully");
    } catch (error) {
      console.error("Error adding city:", error);
    }
  };

  // Verwende die Funktion an der entsprechenden Stelle in deinem Code
  addCity();

  const getCollection = async (collectionName: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Zur Collection hinzufügen
  const addToCollection = async (collectionName: string, data: object) => {
    try {
      await addDoc(collection(db, collectionName), data);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Storage-Pfad abrufen
  const getStoragePath = async (path: string) => {
    try {
      const storageRef = ref(storage, path);
      return await getDownloadURL(storageRef);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Daten in den Storage hochladen
  const uploadToStorage = async (path: string, data: Blob) => {
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, data);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    user,
    signUp,
    logOut,
    getCollection,
    addToCollection,
    getStoragePath,
    uploadToStorage,
  };
};

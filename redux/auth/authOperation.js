import {auth} from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer";


const {updateUserProfile, authStateChange, authSingOut } = authSlice.actions;

export const authSingUpUser =
  ({ email, password, login, image }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: image
      //   email: email,
      //  image
      });

      // const user = await auth.currentUser;
      // console.log(user);


      const { uid, displayName, photoURL } = await auth.currentUser;
      dispatch(
       updateUserProfile({
          userId: uid,
         userName: displayName,
         userEmail: email,
          userPhoto: photoURL
        })
      );
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSingInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error.code);
      console.log("error.message", error.message);
    }
  };

export const authSingOutUser = () => async (dispatch, setState) => {
  const user = auth.signOut();
  
  dispatch(authSingOut())
};

export const authStateChangeUser = () => async (dispatch, setState) => {
  await onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      dispatch(
        updateUserProfile({
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          userPhoto: user.photoURL
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

import { db } from "../../firebase/config";
import {
  collection,
  where,
  query,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import { postsSlice } from "./postsReducer";
const { updatePosts, updateProfilePosts } = postsSlice.actions;

export const getAllPosts = () => async (dispatch, getState) => {
  const dbPosts = query(collection(db, "posts"));

  const postsAll = await getDocs(dbPosts);

  const newPost = postsAll.docs.map(async (doc) => {
    const snapshot = await getCountFromServer(collection(doc.ref, "comments"));
    const snapshotLikes = await getCountFromServer(
      collection(doc.ref, "likes")
    );

    const countComments = snapshot.data().count;
    const countLikes = snapshotLikes.data().count;

    return { ...doc.data(), id: doc.id, countComments, countLikes };
  });
  const payload = await Promise.all(newPost);
  dispatch(updatePosts(payload));
};

export const getUserPosts = (userId) => async (dispatch, getState) => {
  const dbPosts = query(collection(db, "posts"), where("userId", "==", userId));

  const allUserPosts = await getDocs(dbPosts);

  const newUserPosts = allUserPosts.docs.map(async (doc) => {
    const snapshot = await getCountFromServer(collection(doc.ref, "comments"));
    const snapshotLikes = await getCountFromServer(
      collection(doc.ref, "likes")
    );
    const countComments = snapshot.data().count;
    const countLikes = snapshotLikes.data().count;

    return { ...doc.data(), id: doc.id, countComments, countLikes };
  });
  const payload = await Promise.all(newUserPosts);
  dispatch(updateProfilePosts(payload));
};

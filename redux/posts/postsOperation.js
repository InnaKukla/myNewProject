import { db } from "../../firebase/config";
import {
  collection,
  onSnapshot,
  where,
  doc,
  query,
  addDoc,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import { postsSlice } from "./postsReducer";
import { useSelector } from "react-redux";
const { updatePosts, updateComments, updateProfilePosts } = postsSlice.actions;



export const getAllPosts = () => async (dispatch, getState) => {
  const dbPosts = query(
      collection(db, "posts"),
    );
  console.log("dbPosts", dbPosts);
  
    const postsAll = await getDocs(dbPosts);
  // const postsAll = await getDocs(collection(db, "posts"));

  const newPost = postsAll.docs.map(async (doc) => {

    const snapshot = await getCountFromServer(collection(doc.ref, "comments"));
    const snapshotLikes = await getCountFromServer(collection(doc.ref, "likes"));

    const countComments = snapshot.data().count;
    const countLikes = snapshotLikes.data().count;

    return { ...doc.data(), id: doc.id, countComments, countLikes };
  });
  const payload = await Promise.all(newPost);
  console.log(payload);
  dispatch(updatePosts(payload));
};

export const getUserPosts = (userId) => async (dispatch, getState) => {
  // const { userId } = useSelector((state) => state.auth);

const dbPosts = query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );
    console.log("dbPosts", dbPosts);

// const rrr = await onSnapshot(dbPosts, (data) => {
//       const  fff = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//       console.log("fff", fff);
      
//     });


  // const dbPosts = query(collection(db, "posts"), where("userId", "==", userId));
  const allUserPosts = await getDocs(dbPosts)
  console.log("allUserPosts", allUserPosts);

  const newUserPosts = allUserPosts.docs.map( async (doc) => {
    const snapshot = await getCountFromServer(collection(doc.ref, "comments"));
const snapshotLikes = await getCountFromServer(collection(doc.ref, "likes"));
    const countComments = snapshot.data().count;
     const countLikes = snapshotLikes.data().count;

    return { ...doc.data(), id: doc.id, countComments, countLikes };
  });
  const payload = await Promise.all(newUserPosts);
  console.log(payload);
  dispatch(updateProfilePosts(payload));
};


// export const getAllComments = (postId) => async (dispatch, getState) => {
//     const allPosts = await doc(db, "posts", postId);
//   console.log(getAllPosts);
  
//   const allComments = await getDocs(collection(allPosts, "comments"))
//   console.log(allComments);

//   const newComments = allComments.docs.map(async (doc) => {
//     return {...doc.data(), id: doc.id}
//   })
//   const payload = await Promise.all(newComments);
//   console.log(payload);
//   dispatch(updateComments(payload));
  //  await onSnapshot(collection(commentsAll, "comments"), (data) => {
  //     console.log("data.docs", data.doc);
  //     // console.log("data", data);
  //     const ttt = data.docs.map(async(doc) => {
  //    return { ...doc.data(), id: doc.id }
  //   });
  //  });
  // const payload = await Promise.all(ttt);
  // console.log(payload);
  // dispatch(updateProfilePosts(payload));
  // dispatch(updateComments(payload));
    // setCountComments(data.docs.length);
    // console.log(allComments);
    // console.log("data.docs.countComments", data);
  // };
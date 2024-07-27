import {
    auth,
    createUserWithEmailAndPassword,
    doc,
    setDoc,
    db,
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
  } from "../../utiles/utils.js";
  
  
  
  const signup_btn = document.getElementById("signup_form");
  const submit_btn = document.getElementById("submit_btn");
  
  signup_btn.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const img = e.target[0].files[0];
    const email = e.target[1].value;
    const password = e.target[2].value;
    const firstName = e.target[4].value;
    const lastName = e.target[5].value;
    const phone = e.target[6].value;
  
    const userInfo = {
      img,
      email,
      password,
      firstName,
      lastName,
      phone,
    };
  
    submit_btn.disabled = true;
    submit_btn.innerText = "Loading...";
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        const userRef = ref(storage, `user/${user.user.uid}`);
        uploadBytes(userRef, img)
          .then(() => {
            getDownloadURL(userRef)
              .then((url) => {
  
                userInfo.img = url;
  
                const userDbRef = doc(db, "users", user.user.uid);
  
                setDoc(userDbRef, userInfo).then(() => {
                  window.location.href = "/";
                  submit_btn.disabled = false;
                  submit_btn.innerText = "Submit";
                });
              })
              .catch((err) => {
                submit_btn.disabled = false;
                submit_btn.innerText = "Submit";
              });
          })
          .catch(() => {
            submit_btn.disabled = false;
            submit_btn.innerText = "Submit";
          });
      })
      .catch((err) => {
        alert(err), (submit_btn.disabled = false);
        submit_btn.innerText = "Submit";
      });
  
  });
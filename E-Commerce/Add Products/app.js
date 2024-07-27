import {ref,
  storage,
  uploadBytes,
  getDownloadURL,
  db,
  collection,
  addDoc,
  auth,
    } from  "../utiles/utils.js"

const add_products_forms = document.getElementById("add_products_forms");


add_products_forms.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);
     const productInfo={
        image: e.target[0].files[0],
        Category: e.target[1].value,
        productItem: e.target[2].value,
        price: e.target[3].value,
        createdBy: auth.currentUser.uid,
    createdByEmail: auth.currentUser.email,
    cart:[],
    };
    console.log(productInfo)
    const imgRef= ref(storage, productInfo.image.name );
    uploadBytes(imgRef,productInfo.image).then(()=>{
        console.log("file done")
        getDownloadURL(imgRef).then((url)=>{
          console.log(url);
          productInfo.image=url

       const productcollection= collection(db,"products")
       addDoc(productcollection,productInfo).then(()=>{
            console.log("do ne")
        window.location.href="/"

       });
        });
    });
})
  
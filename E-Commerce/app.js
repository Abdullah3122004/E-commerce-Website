import {auth,
  storage,
  db,
  signOut,
  getDoc,
  doc,
  onAuthStateChanged,
  getDocs,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,} from './utiles/utils.js'

const logout_button= document.getElementById("logout_button");
const My_product_btn= document.getElementById("My_product_btn");
const Create_btn= document.getElementById("Create_btn");
const Login_link= document.getElementById("Login_link");
const user_img= document.getElementById("user_img");
const products_container_card= document.getElementById("products_container_card");


getAllProducts();
onAuthStateChanged(auth, (user) => {
if (user) {
    const uid = user.uid;
    Login_link.style.display="none"
    user_img.style.display="inline-block"
    logout_button.style.display="inline-block"
    My_product_btn.style.display="inline-block"
    Create_btn.style.display="inline-block"
    getUserInfo(uid);
  } else {
   Login_link.style.display="inline-block"
   user_img.style.display="none"
   logout_button.style.display="none"
   My_product_btn.style.display="none"
   Create_btn.style.display="none"

  }
});

logout_button.addEventListener("click",()=>{
   signOut(auth);
});


function getUserInfo(uid) {
  const userRef = doc(db, "users", uid);
  getDoc(userRef).then((data) => {
    user_img.src = data.data()?.img;
  });
}


  async function getAllProducts() {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      products_container_card.innerHTML = "";
      querySnapshot.forEach((doc) => {
  
        const product = doc.data();

        const { image, productItem,  
           price,Category } =
        product;
  
        const card = `<div class="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src="${image}"
          alt=" product Image"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h1 class="text-xl font-bold mb-2">${Category}</h1>
          <p class="text-gray-600 mb-2">Brand Name: ${productItem}</p>
          <p class="text-gray-600 mb-2">Price: ${price}</p>
          <div class="flex justify-between items-center">
           <button  id = ${doc.id}
           onclick ="Addtocart(this)"
           class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
           >
           ${auth?.currentUser&& product?.cart?.includes(auth?.currentUser.uid) ? "Carted..": "Add to Cart"}
           
           
           </button>
             
          
          </div>
        </div>
      </div>`;


      window.Addtocart = Addtocart;
  
        products_container_card.innerHTML += card;
      });
    } catch (err) {
      alert(err);
    }
  }
  async function Addtocart(e){
    if (auth.currentUser) {
      e.disabled = true;
      const docRef = doc(db, "products", e.id);
      if (e.innerText == "Carted..") {
        updateDoc(docRef, {
          cart: arrayRemove(auth.currentUser.uid),
        })
          .then(() => {
            e.innerText = "Add to Cart";
            e.disabled = false;
          })
          .catch((err) => console.log(err));
      } else {
        updateDoc(docRef, {
          cart: arrayUnion(auth.currentUser.uid),
        })
          .then(() => {
            e.innerText = "Carted..";
            e.disabled = false;
          })
          .catch((err) => console.log(err));
      }

}else{
  window.location.href="/auth/login/login.html"
}
  };
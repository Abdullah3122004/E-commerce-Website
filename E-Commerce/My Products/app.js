import {auth,
    db,
    signOut,
    getDoc,
    doc,
    onAuthStateChanged,
    getDocs,
    collection,
    query,
    where,
    deleteDoc,} from '../utiles/utils.js'
  
  const logout_button= document.getElementById("logout_button")
  const Login_link= document.getElementById("Login_link")
  const user_img= document.getElementById("user_img")
  const products_container_card= document.getElementById("products_container_card")
  
  
  onAuthStateChanged(auth, (user) => {
  if (user) {
      const uid = user.uid;
      Login_link.style.display="none"
      user_img.style.display="inline-block"
      getUserInfo(uid);
      getMyProducts(user.uid);
    } else {
     Login_link.style.display="inline-block"
     user_img.style.display="none"
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
  
  
    async function getMyProducts(uid) {
      try {
        const q = query(collection(db,"products"),where("createdBy", "==", uid));
        const querySnapshot = await getDocs(q);
        products_container_card.innerHTML = "";
        querySnapshot.forEach((doc) => {
    
          const product = doc.data();
  
          const { image, productItem,  createdByEmail
            , price,Category } =
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
            <p class="text-gray-600 mb-2">Creator: ${createdByEmail}</p>
            <p class="text-gray-600 mb-2">Price: ${price}</p>
            <div class="flex justify-between items-center">
             <button  
             class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
             >
             ${auth?.currentUser&& product?.cart?.includes(auth?.currentUser.uid) ? "Carted..": "Add to Cart"}
             
             
             </button>
             <button  id = ${doc.id}
             onclick ="DeleteProduct(this)"
             class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
             > Delete
             </button>
               
            
            </div>
          </div>
        </div>`;
  
        window.DeleteProduct = DeleteProduct;
          products_container_card.innerHTML += card;
        });
      } catch (err) {
        alert(err);
      }
    }
   
    async function DeleteProduct(e) {
    
      const docRef = doc(db, "products", e.id);
      await deleteDoc(docRef);
      getMyProducts(auth.currentUser.uid);
    }
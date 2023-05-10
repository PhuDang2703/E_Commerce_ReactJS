import { useState } from 'react'
import styles from './AddProduct.module.scss'
import Card from '../../card/Card'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../../firebase/config'
import { toast } from 'react-toastify'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../loader/Loader'
import { useSelector } from 'react-redux'
import { selectProduct } from '../../../redux/slice/productSlice'


const category = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
]

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
}

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProduct);
  const productEdit = products.find((item) => item.id === id);
  console.log(productEdit);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id,
      { ...initialState },
      productEdit,
    )
    return newState;
  })

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target)
    setProduct({ ...product, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    //Monitor Upload Progress in firebase
    //Nếu ta upload 2 hình thì firebase sẽ lấy hình sau thay thế và xóa hình đầu, vì vậy ta thêm hàm Date.now để ngăn chặn việc đó vì khung tgian là luôn thay đổi.
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setUploadProgress(progress);

        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL })
          toast.success("Image uploaded successfully.")
        });
      }
    );
  }

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product)
    setIsLoading(true);

    try {
      // Add a new document with a generated id.(search add docs)
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0)
      setProduct({ ...initialState })

      toast.success("Product uploaded successfully.");
      navigate("/admin/all-products")
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }
    try {
      //Tab Add and manage data->add data->Set a document
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate()
      });
      setIsLoading(false);
      toast.success("Product Edited Successfully");
      navigate("/admin/all-products");

    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            {/* Name */}
            <label>Product name:</label>
            <input type='text' placeholder='Product name' required name='name' value={product.name} onChange={e => handleInputChange(e)} />

            {/* Image */}
            <label>Product image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div className={styles["progress-bar"]} style={{ width: `${uploadProgress}%` }}>
                    {uploadProgress < 100 ? `${uploadProgress}%` : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input type='file' accept='image/*' placeholder='Product image' name='image' onChange={e => handleImageChange(e)} />

              {product.imageURL === "" ? null : (
                <input type='text' required placeholder='image URL' name='imageURL' value={product.imageURL} disabled />
              )}
            </Card>

            {/* Price */}
            <label>Product price:</label>
            <input type='number' placeholder='Product price' required name='price' value={product.price} onChange={e => handleInputChange(e)} />

            {/* Category */}
            <label>Product Category:</label>
            <select required name='category' value={product.category} onChange={e => handleInputChange(e)}>
              <option value="" disabled>-- Choose product category --</option>
              {category.map((cate) => {
                return (
                  <option key={cate.id} value={cate.name}>{cate.name}</option>
                )
              })}
            </select>

            {/* Brand */}
            <label>Product Company/Brand:</label>
            <input type='text' placeholder='Product brand' required name='brand' value={product.brand} onChange={e => handleInputChange(e)} />

            {/* Description */}
            <label>Product Description</label>
            <textarea name='desc' value={product.desc} cols="30" rows="10" onChange={e => handleInputChange(e)}></textarea>
            <button className="--btn --btn-primary">{detectForm(id, "Save Product", "Edit Product")}</button>
          </form>
        </Card>
      </div>
    </>
  )
}

export default AddProduct
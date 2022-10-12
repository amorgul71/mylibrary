import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";


const EditBook = (props) => {
  const dispatch = useDispatch()
  const {categoriesState, booksState}= useSelector((state)=>state)
    const params = useParams()
    const navigate = useNavigate()
    console.log("param", params)
    
  const[bookName, setBookName]= useState("");
  const[author, setAuthor]= useState("");
  const[isbn,setIsbn]= useState("");
  const [category,setCategory]= useState("")
  //const[categories,setCategories]= useState(null)
  const [showModal, setShowModal]= useState(false)

    useEffect(()=>{
      const arananKitap= booksState.books.find(item=> item.id == params.bookId )
      
      
      setBookName(arananKitap.name);
      setAuthor(arananKitap.author);
      setIsbn(arananKitap.isbn);
       setCategory(arananKitap.categoryId);
  
      /*     
      axios
      	.get(`http://localhost:3004/books/${params.bookId}`)
      .then((res) => {
      	console.log(res.data);
     		setBookName(res.data.name);
    		setAuthor(res.data.author);
		    setIsbn(res.data.isbn);
 		    setCategory(res.data.categoryId);
    
  axios
 	.get("http://localhost:3004/categories")
    	.then((res) => {
     		setCategories(res.data);
  	})
      	.catch((err) => console.log("categories error", err));
     
      	})
      	.catch((err) => console.log(err));
   */
    
          document.title= `My Library-Edit Book-${arananKitap.name}`
     
    },[]);

    const handleSubmit= (event)=>{
        event.preventDefault();
        setShowModal(true)
         
  

    };
      
    const editBook=()=>{
      if (bookName === "" || author === "" || category === "") {
        alert("Kitap adı, Yazar adı ve Kategori boş bırakılamaz!!!");
        return;
      };
       const updatedBook = {
        id: params.bookId,
        name: bookName,
        author: author,
        categoryId: category,
        isbn: isbn,
       };

       console.log ("updatedBook", updatedBook)
       axios.put(`http://localhost:3004/books/${params.bookId}`, updatedBook)
       .then((res)=>{
        console.log(res)
        dispatch({ type:"EDIT_BOOK", payload: updatedBook })
        setShowModal(false)
        navigate("/")

       })
       .catch((err)=> console.log("edit error",err))
    }

  
    if(categoriesState.success !== true || booksState.success !==true) {
        return <Loading/>;
      }

  return (
    <div>
        <Header/>
        
        <div className='container my-5'>
        <form onSubmit={handleSubmit}>
        <div className="row">
  <div className="col">
    <input 
    type="text" 
    className="form-control"
    placeholder="Kitap Adı" 
    value={bookName}
    onChange ={(event)=> setBookName(event.target.value)}

    />
  </div>
  <div className="col">
    <input 
    type="text" 
    className="form-control" 
    placeholder="Yazar" 
    value={author}
    onChange={(event)=>setAuthor(event.target.value)}
    />
  </div>
  
</div>
<div className="row my-5">
  <div className="col">
    <input 
    type="text" 
    className="form-control" 
    placeholder="ISBN" 
    value={isbn}
    onChange={(event)=>setIsbn(event.target.value)}
    />
  </div>
  <div className="col">
  <select
								className="form-select"
								value={category}
								onChange={(event) => setCategory(event.target.value)}
							>
								<option value={""} selected>
									{" "}
									Kategori Seçiniz{" "}
								</option>
								{categoriesState.categories.map((cat) => {
									return (
										<option key={cat.id} value={cat.id}>
											{" "}
											{cat.name}{" "}
										</option>
									);
								})}
							</select>
  </div>
  <div className='d-flex justify-content-center'>
  <button
  onClick={()=> navigate("/")}
    type='button' 
    className='btn btn-outline-danger my-3 w-25 mx-2'>
      Vazgeç
    </button>
    <button
    type='submit' 
    className='btn btn-primary my-3 w-25'>
      Kaydet
    </button>
  </div>
  
</div>
        </form>
    </div>
    {
      showModal===true && (
        <Modal
        title= "Kitap Güncelleme"
        aciklama= {`${bookName} isimli kitabı güncellemeka için onaylınız`}
        onCancel= { ()=> setShowModal(false)}
        onConfirm= {()=> editBook()}
        />
      )
    }
    
    </div>
  )
}

export default EditBook
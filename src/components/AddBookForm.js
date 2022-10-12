import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'


const AddBookForm = (props) => {
  const dispatch= useDispatch()
  const {categoriesState}= useSelector((state)=> state)

  const navigate= useNavigate()
  //const[categories,setCategories]= useState(null)
  const[bookName, setBookname]= useState("");
  const[author, setAuthor]= useState("");
  const[isbn,setIsbn]= useState("");
  const [category,setCategory]= useState("")


/*
  useEffect(()=>{
    axios.get("http://localhost:3004/categories")
    .then((res)=>{
      console.log(res)
      setCategories(res.data)

    })
    .catch((err)=> console.log(err))


  },[])
*/
  const handleSubmit= (event)=>{
    event.preventDefault();
    
    if(bookName === "" || author === "" || category === ""){
      alert("Kitap adı, Yazar adı ya da Kategori boş bırakılamaz")
      return
    }

    const newBook= {
      id: new Date().getTime(),
      name: bookName,
      author: author,
      isbn: isbn,
      categoryId: category

    };

    axios.post("http://localhost:3004/books", newBook)
    .then((res)=>{
      dispatch({ type:"ADD_BOOK", payload: newBook});
      setBookname("");
      setAuthor("");
      setIsbn("");
      setCategory("");
      navigate("/")
      

    })
    .catch((err)=> console.log(err))



  }

  if(categoriesState.success !== true) {
    return <Loading/>;
  }
 

  return (
    <div className='container my-5'>
        <form onSubmit={handleSubmit}>
        <div className="row">
  <div className="col">
    <input 
    type="text" 
    className="form-control"
    placeholder="Kitap Adı" 
    value={bookName}
    onChange ={(event)=> setBookname(event.target.value)}

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
  aria-label="Default select example"
  value={category}
  onChange={(event)=>setCategory(event.target.value)}
  >
  <option value={""} selected>Kategori seçiniz</option>
  {
    categoriesState.categories.map(cat=>{
      return <option value={cat.id}>{cat.name}</option>}
      
      )
  }
 
  
</select>
  </div>
  <div className='d-flex justify-content-center'>
    <button
    type='submit' 
    className='btn btn-primary my-3 w-50'>
      Kaydet
    </button>
  </div>
  
</div>
        </form>
    </div>
  )
}

export default AddBookForm
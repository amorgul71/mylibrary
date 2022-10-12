import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Loading from '../components/Loading';

const EditCategory = (prpops) => {
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const [category,setCategory]= useState(null)
    const [newCategoryName, setNewCategoryName]= useState("")
    const [allCategories, setAllCategories]= useState(null)
    const params = useParams();
    console.log(params.categoryId);

    useEffect(()=>{
        axios.get(`http://localhost:3004/categories`)
        .then((res)=>{
            console.log(res.data);
            setAllCategories(res.data)
            const myCategory = res.data.find(
                (item)=>item.id == params.categoryId)
            setCategory(myCategory)
            setNewCategoryName(myCategory.name)
        })
        .catch((err)=>console.log("EditCategoryErr", err));

        document.title="My Library-Edit Book"
    },[]);

    const handleEdit= (event)=> {
        event.preventDefault();
        if (newCategoryName===""){
            alert("Kategori ismi boş bırakılamaz")
            return;
        }
    const hasCategory = allCategories.find(
        (item)=> item.name.toLowerCase()===newCategoryName.toLowerCase());
    console.log("hasCat",hasCategory);

    if(hasCategory!== undefined){
        alert("Bu kategori zaten mevcuttur")
        return;
    };
    const newCategory= {
        ...category,
        name: newCategoryName
    };
    axios.put(`http://localhost:3004/categories/${category.id}`, newCategory)
    .then((res)=>{
        console.log(res.data)
        dispatch({ type: "EDIT_CATEGORY", payload: newCategory});
        navigate("/categories")

    })
    .catch((err)=>console.log(err))

    }

    if (allCategories===null){
        return <Loading/>
    };

  return (
    <div>
        <Header/>
        <div className='container my-5'>
            <form onSubmit={handleEdit}>
            <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">
        Kategori İsmi
        </label>
    <input
    type="text"
    className="form-control"
    id="exampleInputEmail1" 
    value={newCategoryName}
     onChange= {(event)=> setNewCategoryName(event.target.value)}
    
   />
  </div>
  <div className='d-flex justify-content-center'>
    <button
    type='submit' 
    className='btn btn-primary my-3 w-50'>
      Kaydet
    </button>
  </div>
            </form>
        </div>
    </div>
  )
}

export default EditCategory
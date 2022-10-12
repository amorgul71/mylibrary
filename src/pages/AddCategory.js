import React, {useEffect} from 'react'
import AddCategoryForm from '../components/AddCategoryForm'
import Header from '../components/Header'

const AddCategory = (props) => {

    useEffect(()=> {

        document.title="My Library-AddCategory"
    },[])
 
 
    return (
    <div>
        <Header/>
        <AddCategoryForm/>
      
    </div>
  )
}

export default AddCategory
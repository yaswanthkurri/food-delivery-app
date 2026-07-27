import { assets } from '../../assets/assets'
import './Add.css'
import React, { useEffect, useState } from 'react'
import axios from "axios"

const Add = () => {
  const url="http://localhost:4000";
  const [image,setimage]=useState(false);
  const [data,setdata]=useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })
  const Onchangehandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
   setdata(data=>({...data,[name]:value})) // ...data it is spread operator used to existing data and [name]:value is used to update the specific field in the data object based on the input's name attribute.
  }
  const onSubmithandler=async(event)=>{
event.preventDefault();//prevents reloading of page after submitting form
if (!image) {
  alert("Please select an image");
  return;
}
const formData=new FormData();
formData.append("name",data.name);
formData.append("description",data.description);
formData.append("price",Number(data.price));
formData.append("category",data.category);
formData.append("image",image);

const response=await axios.post(`${url}/api/food/add`,formData);  
//Axios is a JavaScript library used to send HTTP requests between your frontend and backend.
// User fills form
//        ↓
// Name
// Description
// Price
// Category
// Image
//        ↓
// onSubmithandler()
//        ↓
// Create FormData
//        ↓
// Axios POST request
//        ↓
// http://localhost:4000/api/food/add
//        ↓
// Backend receives data
//        ↓
// Backend processes image
//        ↓
// Backend saves food in database
if(response.data.success){ //after successfully adding data to database reset data to intial data and image also false
  setdata(
    {
    name:"",
    description:"",
    price:"",
    category:"Salad"
    }
  )
  setimage(false);

}
else{
  
}
  }
//   useEffect(()=>{
// console.log(data);
//   },[data])
//   useEffect() → React Hook
// () => { ... } → code that should run
// [data] → dependency array

// This means:

// "Whenever data changes, run this code."

  return (
    <div className='add'>
      <form className='flex-col'  onSubmit={onSubmithandler}>
        <div className="add-image-upload flex-col" >
<p>Upload Image</p>
<label htmlFor="image">
  <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />

</label>
{/* useState stores the selected image, and onChange detects when the user selects an image and updates the state with that selected file. */}
<input onChange={(e)=>setimage(e.target.files[0])} type="file" id='image' hidden />
        </div>
<div  className="add-product-name flex-col">
<p>Product name</p>
<input onChange={Onchangehandler} value={data.name} type="text" name='name' placeholder='Type-here' />
</div>
<div className="add-product-description flex-col">
  <p>Product description</p>
  <textarea onChange={Onchangehandler} value={data.description} name="description" rows="6" placeholder='Write content here' ></textarea>
</div>
<div className="add-category-price">
  <div className="add-category flex-col">
<p>Product category</p>

<select onChange={Onchangehandler} value={data.category} name="category" >
  <option value="Salad">Salad</option>
  <option value="Rolls">Rolls</option>
  <option value="Deserts">Deserts</option>
  <option value="Sandwich">Sandwich</option>
  <option value="Cake">Cake</option>
  <option value="Pure Veg">Pure Veg</option>
  <option value="Pasta">Pasta</option>
  <option value="Noodles">Noodles</option>

</select>
  </div>
  <div className="add-price flex-col">
   <p>Product Price</p>
   <input onChange={Onchangehandler} value={data.price} type="number" name='price' placeholder='$20' />
  </div>
</div>
<button type='submit' className='add-btn'>ADD</button>
      </form>
      
    </div>
  )
}

export default Add;

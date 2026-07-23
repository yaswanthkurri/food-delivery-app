import { assets } from '../../assets/assets'
import './Add.css'
import React, { useEffect, useState } from 'react'

const Add = () => {
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
   setdata(data=>({...data,[name]:value}))


  }
  useEffect(()=>{
console.log(data);
  },[data])

  return (
    <div className='add'>
      <form className='flex-col'>
        <div className="add-image-upload flex-col" >
<p>Upload Image</p>
<label htmlFor="image">
  <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />

</label>
{/* useState stores the selected image, and onChange detects when the user selects an image and updates the state with that selected file. */}
<input onChange={(e)=>setimage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
<div onChange={Onchangehandler} value={data.name}  className="add-product-name flex-col">
<p>Product name</p>
<input type="text" name='name' placeholder='Type-here' />
</div>
<div onChange={Onchangehandler} value={data.description} className="add-product-description flex-col">
  <p>Product description</p>
  <textarea name="description" rows="6" placeholder='Write content here' ></textarea>
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
  <div onChange={Onchangehandler} value={data.price} className="add-price flex-col">
   <p>Product Price</p>
   <input type="number" name='price' placeholder='$20' />
  </div>
</div>
<button type='submit' className='add-btn'>ADD</button>
      </form>
      
    </div>
  )
}

export default Add

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";
const Category=()=>{
    const navigate=useNavigate();
    const [showedit,setShowedit]=useState(false);
    const [showInput, setShowInput] = useState(false);
    const [editid,setEditid]=useState(null);
    const [editname,setEditname]=useState(null);
    const ref1=useRef(null);
    const [msg,setMsg]=useState([]);
    
    const getCat = async () => {
      const res=await axios.get("https://expense-tracker-backend-production-c23b.up.railway.app/getCat");
      setMsg(res.data);
    }

    const insertCat=async()=>{
        await axios.post(`https://expense-tracker-backend-production-c23b.up.railway.app/insertCat`,{"name":ref1.current.value});
         getCat();
    }
    const deleteCat=async(id)=>{
        await axios.delete(`https://expense-tracker-backend-production-c23b.up.railway.app/delCat/${id}`)
        getCat();
    }
    const updateCat=async(id)=>{
        await axios.put(`https://expense-tracker-backend-production-c23b.up.railway.app/updateCat/${id}`,{id:editid,name:editname})
        setEditid(null);
        setEditname("");
        getCat();
    }

    useEffect(()=>{
        getCat();
    },[])
    return(
        <>
        <div className="category-container">
        <h2>📂 Categories</h2>
        <table border={2} cellPadding={10} cellSpacing={10}>
            <thead>
                <tr>
                    <th>SI.NO</th>
                    <th>Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
            msg.map((category,index)=>{
               return(
                <tr key={index}>
                    <td>{category.id}</td>
                     <td>{category.name}</td>
                     <td className="edit"><i className="fa fa-edit" onClick={() => {
                           setEditid(category.id);
                           setEditname(category.name); 
                    }}></i></td>

                    <td className="delete"><i className="fa fa-trash" onClick={()=>deleteCat(category.id)} ></i></td>
                </tr>
               )
            })
        }
            </tbody>
            <tfoot></tfoot>
        </table>
        
        {/* insert oparation */}
        <button onClick={() => setShowInput(true)}>Add New Category</button>
        <br></br>
        <br></br>
        {showInput ? (
               <>
                     <input type="text" ref={ref1} placeholder="Enter category you like" />
                     <br /><br></br>
                    <button onClick={insertCat}>Add</button>
                    <button onClick={() => setShowInput(false)}>Cancel</button>
               </>
              ) : null}

        {editid !== null && (
                  <>
                     <h3>✏️ Edit Category</h3>
                     <input type="text" value={editname} onChange={(e) => setEditname(e.target.value)} />
                     <button onClick={() => updateCat(editid)}>Save</button>
                       <button onClick={() => setEditid(null)}>Cancel</button>
                 </>
                )}

        <button onClick={()=>navigate(-1)}>Go Back </button>
        
        </div>
        </>
    
    )
}
export default Category;
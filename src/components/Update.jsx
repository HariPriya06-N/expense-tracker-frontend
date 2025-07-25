import axios from "axios";
import Category from "./Category";
import "./Insert.css";
import { useLocation,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
const API_BASE_URL = "https://expense-tracker-backend-production-c23b.up.railway.app";

const Update=()=>{
    const [categoryList, setCategoryList] = useState([]);

    const navigate=useNavigate();
    const {state}=useLocation();
    const{expense1}=state;
    const [title,setTitle]=useState(expense1.title);
    const [expense,setExpense]=useState(expense1.expense);
    const [category,setCategory]=useState(expense1.category);
    const [date,setDate]=useState(expense1.date);

    const update_expense = async (id) => {
  if (
    title.trim() === "" ||
    String(expense).trim() === "" ||
    category.trim() === "" ||
    date.trim() === "" ||
    isNaN(Number(expense)) ||
    Number(expense) <= 0
  ) {
    alert("Please fill all fields correctly before updating.");
    return;
  }

  await axios.put(`${API_BASE_URL}/${id}`, {
    title: title.trim(),
    expense: Number(expense),
    category: category.trim(),
    date: date.trim(),
  });

  navigate("/");
};



    useEffect(() => {
           axios.get(`${API_BASE_URL}/getCat`)
              .then(res => setCategoryList(res.data))
              .catch(err => console.error("Error fetching categories", err));
        }, []);
    return(
        <>
        <div className="insertContainer">
            <fieldset>
            <legend>Fill the form </legend>
                <input type="text"  value= {title} onChange={(e)=> setTitle(e.target.value)} placeholder="Enter Title"></input>
                <br></br><br></br>
                <input type="number" value={expense} onChange={(e)=> setExpense(e.target.value)} placeholder="Enter expense"></input>
                <br></br><br></br>

                <select value={category} onChange={(e) => {
                      const value = e.target.value;
                     if (value === "add-new") {
                     navigate("/cat");
                     } else {
                  setCategory(value);
                     }
                      }}>

                      <option value="">-- Select Category --</option>
                             {categoryList.map((cat) => (
                      <option key={cat.id} value={cat.name}> {cat.name}</option>
                 ))}
                <option disabled>──────────</option>
             <option value="add-new">➕ Add New Category</option>
             </select>

                <br></br><br></br>
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} placeholder="Enter date"></input>
                <br></br><br></br>
                <button onClick={()=>update_expense(expense1.id)}>Update Expense</button>
                <button onClick={()=>navigate(-1)}>GO Back</button>
            
        </fieldset>
        </div>
        </>
    )

}

export default Update;
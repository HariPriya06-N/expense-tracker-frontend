import axios from "axios";
import "./Insert.css";
import { useRef,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Category from "./Category";

const Insert=()=>{
    const [categoryList, setCategoryList] = useState([]);
    const [category1,setCategory1]=useState();
    const navigate=useNavigate();
    const title=useRef(null);
    const expense=useRef(null);
    // const category=useRef(null);
    const date=useRef(null);
    const insertExpense=async()=>{
        const titleValue = title.current?.value.trim();
  const expenseValue = expense.current?.value.trim();
  const categoryValue = category1?.trim(); // from state
  const dateValue = date.current?.value;

  if (!titleValue || !expenseValue || !categoryValue || !dateValue) {
    alert("Please fill in all fields.");
    return;
  }

  await axios.post(`http://localhost:5000/insert`, {
    title: titleValue,
    expense: expenseValue,
    category: categoryValue,
    date: dateValue,
  });

  navigate("/");
    }
    useEffect(() => {
           axios.get("http://localhost:5000/getCat")
              .then(res => setCategoryList(res.data))
              .catch(err => console.error("Error fetching categories", err));
        }, []);
    return(
        <>
        <div className="insertContainer">
            <fieldset>
            <legend>✨ Add a New Expense</legend>
            <input type="text" ref={title} placeholder="Enter title"></input>
            <br></br>
            <br></br>
            <input type="number" ref={expense} placeholder="Enter Expense"></input>
            <br></br><br></br>
            <select value={category1} onChange={(e) => {
                      const value = e.target.value;
                     if (value === "add-new") {
                     navigate("/cat");
                     } else {
                     setCategory1(value);
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
            <input type="date" ref={date} placeholder="Enter Date"></input>
            <br></br>
            <br></br>
            <button  style={{backgroundColor:"sky-blue"}}onClick={insertExpense}>Insert Expense</button>
            <button onClick={()=>navigate(-1)}>GO Back</button>
        </fieldset>
        </div>

        </>
    )

}
export default Insert;
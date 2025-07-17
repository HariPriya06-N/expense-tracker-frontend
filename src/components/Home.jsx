import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Category from "./Category";
const Home=()=>{
    const navigate=useNavigate();
    const [obj,setObj]=useState([]);
    const [loading, setLoading] = useState(true);
    const getExpense=async()=>{
        setLoading(true);
        const res=await axios.get("https://expense-tracker-backend-production-114e.up.railway.app/get");
        const{data}=res;
        setObj(data);
        setLoading(false);

    }
    const delete_expense=async(id)=>{
        const res=await axios.delete(`https://expense-tracker-backend-production-114e.up.railway.app/delete/${id}`);
        getExpense();
    }
    const insertExpense=()=>{
        navigate("/insert");
    }
    useEffect(()=>{
        getExpense();

    },[])
    return(
        <>
        <nav className="navbar">
                <h1 className="appTitle">💰 Expense Tracker</h1>
                 <div className="navLinks">
                    <Link to="/">Home</Link>
                    <Link to="/insert">Add Expense</Link>
                    <Link to="/categories">Show Categories</Link>

                 </div>
             </nav>
        
        <div className="container">
            <button className="addButton" onClick={insertExpense}>Add Expense</button>
        {loading ? (
  <div className="loading">Loading...</div>
) : (
  <div className="tableWrapper">
    <table className="insertTable" border={2} cellPadding={10} cellSpacing={10}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Expense</th>
          <th>Category</th>
          <th>Date</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {obj.map((ele, index) => (
          <tr key={ele.id}>
            <td>{index + 1}</td>
            <td>{ele.title}</td>
            <td>{ele.expense}</td>
            <td>{ele.category}</td>
            <td>{ele.date}</td>
            <td><i className="fa fa-edit" onClick={() => navigate("/update", { state: { expense1: ele } })}></i></td>
            <td><i className="fa fa-trash" onClick={() => delete_expense(ele.id)}></i></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

        </div>
        </>
    )
}
export default Home;
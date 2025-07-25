import { useEffect, useState } from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
   const navigate=useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://expense-tracker-backend-production-c23b.up.railway.app/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
       <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Select a Category</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {categories.map((cat, i) => (
          <li key={i} style={{ margin: "8px 0" }}>
            <Link to={`/filterdcategory/${cat}`} style={{ color: "blue", textDecoration: "underline" }}>
              Show {cat} Expenses
            </Link>
          </li>
        ))}
      </ul>
    </div> 
       <button onClick={()=>navigate(-1)}>GO Back</button>
    </>)
};

export default CategoryList;

import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./FilterdCategory.css";

const FilterdCategory = () => {
    const navigate=useNavigate();
    const { category } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`https://expense-tracker-backend-production-114e.up.railway.app/gettingItems/${category}`)
            .then(res => {
                setItems(res.data);
            })
            .catch(err => {
                console.error("Error fetching items:", err);
            });
    }, [category]);

    return (
        <>
        <div className="category-container1">
            <h2 className="itemheading">Expenses for category: {category}</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.title} - ₹{item.expense}
                    </li>
                ))}
            </ul>
        </div>
        <br></br>
        <button onClick={()=>navigate(-1)}>GO Back</button>
        </>
    );
};

export default FilterdCategory;

import Home from "./Home";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Insert from "./Insert";
import Update from "./Update";
import Category from "./Category";
import FilterdCategory from "./FilterdCategory";
import CategoryList from "./CategoriesList";

const Master=()=>{
    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/insert" element={<Insert></Insert>}></Route>
            <Route path="/update" element={<Update></Update>}></Route>
            <Route path="/cat" element={<Category></Category>}></Route>
            <Route path="/categories" element={<CategoryList></CategoryList>}></Route>
            <Route path="/filterdcategory/:category" element={<FilterdCategory></FilterdCategory>}></Route>

        </Routes>
        </BrowserRouter>
        </>
    )

}
export default Master;

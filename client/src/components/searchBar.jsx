import './css/AdminPanel.css';


const searchBar  = ()=>{


     return <>
<div className="search-bar">
    <form className="search-form">
        <input type="text" placeholder="search.." className="search-input" >
        </input>

        <button className="search-button">Search</button>
    </form>

</div>
      </>
}

export default searchBar;
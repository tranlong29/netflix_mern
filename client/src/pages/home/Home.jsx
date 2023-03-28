import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import Featured from "../../Components/featured/Featured";
import List from "../../Components/list/List";
import "./Home.scss";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre}/>
      {lists.map((list,id) =>( 
        <List key={id} list={list} />
      ))}
    </div>
  );
};

export default Home;

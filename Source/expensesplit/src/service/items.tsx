import axios from "axios";
import IItem from "../model/IItem";

const fetchItems = async() => {
    return await axios.get<IItem[]>(`${process.env.REACT_APP_API_BASE_URL}/items`)
        .then(response => response.data);
};

const addItem = (item : Omit< IItem, 'id' >) => {
    return axios.post<IItem>(`${process.env.REACT_APP_API_BASE_URL}/items`,
      item,
      {
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(response => response.data)  
  };
export {fetchItems,addItem};
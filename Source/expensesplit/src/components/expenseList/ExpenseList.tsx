import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import IItem from "../../model/IItem";
import {fetchItems} from "../../service/items";
import AddExpenseItem from "../addExpense/AddExpenseItem";
import ExpenseRecon from "../expenseRecon/ExpenseRecon";


const ExpenseList = ( ) => {
    const [loading,setLoading] =useState<boolean>( true );
    const [items,setItems] =useState<IItem[]>( [] );
    const [error,setError] =useState<Error | null>( null);
    const [showform, setShowForm] = useState<boolean>(false);

    useEffect(() => {
        const getItems = async () => {
            try{
                const data = await fetchItems( );
                setItems( data );
            }catch( error : any){
                console.log("error " + error);
                setError(error.response && error.response.data && error.response.message || error.message);
            }finally{
                console.log("loading  " + loading);
                setLoading(false);
            }
        }
        getItems() ;
    }
    ,[ showform ]);
    
      const success = () => {
        setShowForm(false);
      };
      const cancel = () => {
        setShowForm(false);
      };

    return(
        <>
            <Button as="input" type="button" value="Add Item"
                    onClick={() => setShowForm(true)} 
                    id="addButton"/>

            {showform && (
                <div className="form">
                <AddExpenseItem onTrue={success} onClose={cancel} />
                </div>
            )}
            { error && 
                (  <h2> Error in Loading </h2> ) 
            }

            { loading && 
                (  <h2> Loading </h2> ) 
            }

            { items && 
                (  <>
                    <Table 
                        className="my-4"
                        style={{width: '50%', margin:'auto',marginLeft:'26.58rem' }}  
                        bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Product Purchased</th>
                        <th>Price</th>
                        <th>Payee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map( ({id, payeeName,product,price ,setDate}) => (
                                (
                                    <tr key={id}>
                                    <td>{setDate}</td>
                                    <td>{product}</td>
                                    <td>{price}</td>
                                    <td className={`${payeeName}`}>{payeeName}</td>
                                    </tr>
                                )
                            ))
                        }
                     </tbody>
                    
                    </Table>
                    {console.log(" items passed to recon :" + items.length)}
                    { !loading && 
                    ( <ExpenseRecon items={items}/> )}
                    
                    </>)
            }
        </>
    
    );
};
export default ExpenseList;
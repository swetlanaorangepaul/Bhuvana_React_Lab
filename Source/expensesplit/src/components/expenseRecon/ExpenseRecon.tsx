import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import IItem from "../../model/IItem";

type Props ={
    items: IItem[];
}
const ExpenseRecon = ({items}: Props) => {
    const [sum, setSum] = useState<number | null>();
    const [rahulspent, setRahulspent] = useState<number>(0);
    const [rameshspent, setRameshspent] = useState<number>(0);

    var rahulspent1: number = 0;
    var rameshspent1: number = 0;
    useEffect(() => {
        console.log(" itemsin useEffect recon :" + items.length);
        setSum(
            items.reduce(
              (result, currentObject) => (result = result + currentObject.price),
              0
            )
          );
        Shares(items);
    }
    ,[items]);

    const Shares = (data: IItem[]) => {
        data.map((sams) =>
          sams.payeeName === "Rahul"
            ? (rahulspent1 = rahulspent1 + sams.price)
            : (rameshspent1 = rameshspent1 + sams.price)
        );
        setRahulspent(rahulspent1);
        setRameshspent(rameshspent1);
      };

    return(
        <>
        <Table style={{ width: '50%', margin:'auto' }}  bordered hover size="sm">

      <tbody>
        <tr>
          <th>Total:</th>
          <td style={{backgroundColor:'lightblue', textAlign:'right'}} >{sum}</td>
        </tr>
        <tr>
          <th>Rahul paid:</th>
          <td style={{backgroundColor:'lightblue', textAlign:'right'}}>{rahulspent}</td>
        </tr>
        <tr>
          <th>Ramesh paid:</th>
          <td style={{backgroundColor:'lightblue', textAlign:'right'}}>{rameshspent}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th>{rahulspent > rameshspent ? "Pay Rahul " : "Pay Ramesh"}</th>
          <th 
            style={{backgroundColor:'lightgray', textAlign:'center',fontSize:'1.5rem', fontWeight:'bold'}}
            className={`${rahulspent > rameshspent ? "Rahul" : "Ramesh"}`}>
                {Math.abs((rahulspent - rameshspent) / 2)}
          </th>
        </tr>
      </tbody>
    </Table>

        </>
    );
};

export default ExpenseRecon;
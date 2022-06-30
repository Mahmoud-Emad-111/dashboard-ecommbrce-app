import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./List.css";
const List=(props)=>{
    

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    
    const rows = [
        {
            id:14494,
            product:"ASUS ROG",
            img:"https://m.media-amazon.com/images/I/61zmEv4AZFS._AC_SX569_.jpg",
            customer:"Nour Ahmed",
            date:"1 March",
            amount:2000,
            method:"Online",
            status:"Pending"
        },
        {
            id:15878,
            product:"iPhone 13 Pro Max",
            img:"https://m.media-amazon.com/images/I/61i8Vjb17SL._AC_SX569_.jpg",
            customer:"Mahmoud Reda",
            date:"15 February",
            amount:70,
            method:"Cash on Delivery",
            status:"Approved"
        },
        {
            id:1974,
            product:"PlayStation 5",
            img:"https://images-na.ssl-images-amazon.com/images/I/51BE1AnhydS.__AC_SX300_SY300_QL70_ML2_.jpg",
            customer:"Rami Adel",
            date:"6 Abril",
            amount:190,
            method:"Online",
            status:"Approved"
        },
        {
            id:15871,
            product:"Samsung Galaxy S22 Ultra",
            img:"https://images-na.ssl-images-amazon.com/images/I/71Y06Do6hxL.__AC_SX300_SY300_QL70_ML2_.jpg",
            customer:"Eslam Ali",
            date:"18 June",
            amount:10,
            method:"Cash on Delivery",
            status:"Pending"
        },
        {
            id:16571,
            product:"Apple MacBook Pro ",
            img:"https://m.media-amazon.com/images/I/71rqP3sMUXL._AC_SL1500_.jpg",
            customer:"Ahmed moaz",
            date:"18 June",
            amount:10,
            method:"Cash on Delivery",
            status:"Pending"
        },
          
    ];
        return(
        <div className={`list_main ${props.color==false ? 'dark' : ''}`}>
        <span>latest transacions</span>
        <TableContainer component={Paper}>
            
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tracking ID</TableCell>
            <TableCell>Product</TableCell>
            <TableCell >Customer</TableCell>
            <TableCell >Date</TableCell>
            <TableCell >Amount</TableCell>
            <TableCell >Payment Method</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell ><img src={row.img} alt="" /> {row.product}</TableCell>
              <TableCell >{row.customer}</TableCell>
              <TableCell >{row.date}</TableCell>
              <TableCell >{row.amount}</TableCell>
              <TableCell >{row.method}</TableCell>
              <TableCell ><sapn className={`status ${row.status}`}>{row.status}</sapn></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}
export default List;
import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { useState } from "react";
import BaseCard from "../baseCard/BaseCard";

const AllOrdersTable = ({ orders }) => {
  const [isEditable, setisEditable] = useState(false)
  const handleClick=() =>{
    setisEditable(true)
  }
  const handleSubmit=() =>{
    setisEditable(false)
  }
  return (
    <BaseCard title="All Orders">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          // whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                OrderID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Products
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Delivery Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderID}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {order.orderID}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>{order.email}</Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {Object.keys(order.products).map((key) => (
                    <span key={key}>
                      {order.products[key].name}({order.products[key].size}/
                      {order.products[key].variant})
                    </span>
                  ))}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  ₹{order.amount}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {order.status}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="h6"><input type="text" defaultValue={order.deliveryStatus} readOnly={!isEditable} /></Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6"><button onClick={handleClick} className="text-white bg-[#87CEEB] py-2 px-3 cursor-pointer text-center">Edit</button></Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6"><button disabled={!isEditable} onClick={handleSubmit} className="text-white disabled:bg-indigo-400 bg-indigo-600 py-2 px-3 cursor-pointer text-center">Submit</button></Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default AllOrdersTable;

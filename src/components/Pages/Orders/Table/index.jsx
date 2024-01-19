import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { orderList } from "./mockData";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { orderService } from "../../../../services/orderService";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OrderTable() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    orderService.get().then((res) => {
      setItems(res);
    });
  };

  const handleDelete = (id) => {
    orderService.delete(id).then((res) => {
      getItems();
    });
  };

  const navigate = useNavigate();
  const columns = [
    {
      key: "title",
      title: "title",
    },
    {
      key: "price",
      title: "price",
    },
    {
      key: "description",
      title: "description",
    },

    {
      key: "actions",
      title: "Actions",
      render: (item) => {
        return (
          <div className="flex gap-3">
            <button
              onClick={() => {
                navigate(`/orders/${item.id}`);
              }}
              className="bg-[yellow] p-2 rounded"
            >
              <EditIcon />
            </button>
            <button
              onClick={() => {
                handleDelete(item.id);
              }}
              className="bg-[red] p-2 rounded"
            >
              <DeleteIcon />
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="flex justify-end">
        <Button
          variant="contained"
          onClick={() => {
            navigate("/orders/create");
          }}
        >
          Add order
        </Button>
      </div>

      <div className="border border-gray-500 mt-5">
        <Table size="medium" sx={{ minWidth: 1200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => {
                <TableCell key={index}>{column.title}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row, i) => {
              return (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {columns.map((column, index) => {
                    return (
                      <TableCell key={index} align="right">
                        {" "}
                        {column.render ? column.render(row) : row[column.key]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

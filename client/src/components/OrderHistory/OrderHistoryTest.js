import "./OrderHistoryComponent.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OrderHistoryTest() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [allShow, setAllShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [updateActivate, setUpdateActivate] = useState(false);
  const [updateAllShow, setUpdateAllShow] = useState(false);
  //   const [userId, setUserId] = useState("");
  const [userId, setUserId] = useState("");
  const [deleteTrigger, setDeleteTrigger] = useState("");
  const [cartId, setCartId] = useState("");

  const user = useSelector((state) => state.user.currentUser._id);
  const URL = `http://192.168.8.187:5000/api/v1/carts`;
  // const URL = `http://192.168.8.187:5000/api/v1/carts/find/${user}`;
  // const [data, setData] = useState(userRows);

  // IP address of local machine - 192.168.8.187
  useEffect(() => {
    setUserId(user.toString());
    console.log(userId);
    // let URL = "http://192.168.8.187:5000/api/v1/carts/find/"+userId;
    const userData = async () => {
      try {
        let response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // token: token,
          },
        });
        let json = await response.json();
        setData(json);
        console.log(json);
        // setLoading(false);
      } catch (error) {
        alert(error);
      }
    };
    userData();
  }, [deleteTrigger]);

  // const URL = `http://localhost:5000/api/v1/carts/${cartId}`;

  const URl_Update = `http://localhost:5000/api/v1/carts/${cartId}`;

  const updateConfirm = async () => {
    try {
      let response = await fetch(URl_Update, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
        body: JSON.stringify({
          isCancel: true,
        }),
      });
      let json = await response.json();
      setDeleteTrigger("updated");
      console.log(json);
      setUpdateShow(false);
      // setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  // const deleteConfirm = async () => {
  //   setShow(false);
  //   try {
  //     let response = await fetch(URL, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // token: token,
  //       },
  //     });
  //     let json = await response.json();
  //     setDeleteTrigger(json);
  //     console.log(json);
  //     setAllShow(true);
  //     // handleDelete();
  //     // setLoading(false);
  //   } catch (error) {
  //     alert(error);
  //   }
  // };
  const deleteCancel = () => {
    setShow(false);
    setUpdateShow(false);
  };

  // const handleDelete = (id) => {
  //   setCategoryId(id);
  //   // setData(data.filter((item) => item.id !== id));
  // };

  // const statusChanged = (id) => {
  //   setUpdateShow(true);
  //   setUserId(id);
  // };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    // { field: "userId", headerName: "userId", width: 220 },
    // {
    //   field: 'products',
    //   headerName: 'Products',
    //   width: 220,
    //   renderCell: (params) => (
    //     <ul className="userListUser">
    //       {params.value.map((product, index) => (
    //         <li key={index}>{product.productId}</li>
    //       ))}
    //     </ul>
    //   ),
    //   type: 'string',
    // },
    {
      field: "title",
      headerName: "Product Name",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={params.row.img}
              alt="category Icon"
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "quantity", headerName: "Quantity", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    // // {
    // //   field: "isAdmin",
    // //   headerName: "Admin or Not",
    // //   width: 130,
    // // },
    // {
    //   field: "products.quantity",
    //   headerName: "Quantity",
    //   width: 220,
    // },
    // {
    //   field: "isPay",
    //   headerName: "Is pay",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         {!params.row.isPay ? (
    //           <Link to={"/cart"}>
    //             <button className="userListEdit">Pay</button>
    //           </Link>
    //         ) : (
    //           <div>Done</div>
    //         )}
    //       </>
    //     );
    //   },
    // },
    {
      field: "staus",
      headerName: "Order Status",
      width: 220,
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "Pending" ? (
              <button
                className="userListEdit"
                style={{ backgroundColor: "#bdba2c" }}
              >
                {params.row.status}
              </button>
            ) : params.row.status === "Confirm" ? (
              <button className="userListEdit">{params.row.status}</button>
            ) : (
              <button
                className="userListEdit"
                style={{ backgroundColor: "red" }}
              >
                {params.row.status}
              </button>
            )}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link> */}
            {!params.row.isCancel ? (
              <button
                className="userListEdit"
                onClick={() => {
                  setUpdateShow(true);
                  setCartId(params.row._id);
                }}
                style={{ backgroundColor: "red" }}
              >
                Cancel
              </button>
            ) : (
              <button
                className="userListEdit"
                style={{ backgroundColor: "red" }}
              >
                Request Send
              </button>
            )}
            {/* <DeleteOutline
              className="userListDelete"
              onClick={() => {
                handleDelete(params.row._id);
                setShow(true);
              }}
            /> */}
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
        autoHeight
      />
      {/* <SweetAlert
        show={show}
        warning
        showCancel
        confirmBtnText="Yes, Delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={deleteConfirm}
        onCancel={deleteCancel}
        focusCancelBtn
      >
        You will not be able to recover this imaginary file!
      </SweetAlert> */}

      <SweetAlert
        show={updateShow}
        warning
        showCancel
        confirmBtnText="Yes, Cancel Order!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={updateConfirm}
        onCancel={deleteCancel}
        focusCancelBtn
      >
        You will not be able to recover this imaginary file!
      </SweetAlert>

      {/* <SweetAlert
        show={allShow}
        success
        title="Successfully delete!"
        // text="SweetAlert in React"
        onConfirm={() => setAllShow(false)}
      ></SweetAlert> */}

      <SweetAlert
        show={updateAllShow}
        success
        title="Request Send!"
        // text="SweetAlert in React"
        onConfirm={() => setUpdateAllShow(false)}
      ></SweetAlert>
    </div>
  );
}

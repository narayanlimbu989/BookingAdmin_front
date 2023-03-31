import React, { useMemo, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";
import Hotelupdate from "../components/Hotelupdate";
import { api } from "../Http_service/Httpservice";

const HotelsList = () => {
  const [loading, setloading] = useState(false);
  const [hotelList, setList] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [open, setopen] = useState(false);

  const calldata = async () => {
    const { data } = await api.get("/hotels/api/onlyuserhotels");
    setList(data);
  };
  useMemo(() => {
    setloading(true);
    try {
      calldata();
    } catch (error) {
    } finally {
      setloading(false);
    }
  }, []);

  const updatehotel = (hotel) => {
    setHotel(hotel);
    setopen(true);
  };
  const deletehotel = async (id) => {
    const { data } = await api.delete(`/hotels/api/${id}`);
    if (data.message == "Hotel remove") {
      calldata();
      toast.success(data.message);
    }
  };
  return (
    <div className="container-xxl p-4">
      <h2>Stays Lists</h2>
      {loading ? (
        <p className="mb-0">please wait!</p>
      ) : (
        <table>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Total rooms</th>
            <th>Address</th>
            <th>price</th>
            <th>Distance</th>
            <th>Type</th>
            <th>Feature</th>
          </tr>
          {hotelList?.length > 0 ? (
            hotelList?.map((i, j) => {
              return (
                <tr key={j}>
                  <td>{i.name}</td>
                  <td>{i.title}</td>
                  <td>{i.rooms?.length}</td>
                  <td>
                    {i.address},{i.city}
                  </td>
                  <td>Rs {i.cheapestprice}</td>
                  <td>{i.distance}</td>
                  <td>{i.type}</td>
                  <td>{`${i.featured}`}</td>
                  <td className="d-flex gap-2 text-danger">
                    <BiEdit
                      className="fs-5"
                      style={{ cursor: "pointer" }}
                      onClick={() => updatehotel(i)}
                    />
                    <AiFillDelete
                      className="fs-5"
                      style={{ cursor: "pointer" }}
                      onClick={() => deletehotel(i._id)}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <p className="mb-0" style={{ fontStyle: "italic" }}>
              No Data Added
            </p>
          )}
        </table>
      )}
      {open && <Hotelupdate setopen={setopen} hotel={hotel} calldata={calldata}/>}
    </div>
  );
};

export default HotelsList;

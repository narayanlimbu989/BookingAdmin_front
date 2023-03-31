import React, { useState } from "react";
import { toast } from "react-toastify";
import Costominput from "../components/costominput";
import { useFatch } from "../costumHook/useFatch";
import { api } from "../Http_service/Httpservice";

const AddRooms = () => {
  const [hotelid, sethotelid] = useState("");
  const [roominfo, setroominfo] = useState({});
  const { data } = useFatch("/hotels/api/onlyuserhotels");

  const saveroom = (e) => {
    setroominfo((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };

  const postrooms = async (e) => {
    e.preventDefault();
    const { data } = await api.post(`rooms/api/admin/${hotelid}`, roominfo);
    if (data.message == "success") {
      sethotelid("");
      toast.success("Room added");
    }
  };
  return (
    <div className="container-xxl d-flex  justify-content-around py-2">
      <div className="inputformaddroom col-12">
        <h2>Room Information</h2>
        <br />
        <Costominput
          type="text"
          id="title"
          value={roominfo.title}
          onChange={saveroom}
          title="Room title"
        />
        <Costominput
          type="text"
          id="features"
          value={roominfo.features}
          onChange={saveroom}
          title="Room Feature"
        />
        <Costominput
          type="Number"
          id="price"
          value={roominfo.price}
          onChange={saveroom}
          title="price per/night"
          placeholder="Rs"
        />
        <Costominput
          type="Number"
          id="maxpeople"
          value={roominfo.maxpeople}
          onChange={saveroom}
          title="Max people"
        />
        <Costominput
          type="Number"
          id="roomNumber"
          value={roominfo.roomNumber}
          onChange={saveroom}
          title="Room Number"
        />

        <div>
          <label htmlFor="hotelid" className="d-flex fs-5 text-success">
            Choose Hotels
          </label>

          <select
            id="hotelid"
            value={hotelid}
            onChange={(e) => sethotelid(e.target.value)}
            className="selectionroom fs-5 w-100 p-2"
          >
            <option value="" style={{ color: "red" }}>
              =======select Stays to add room=======
            </option>
            {data?.map((i, j) => {
              return (
                <option key={j} value={i._id}>
                  {i.name}
                </option>
              );
            })}
          </select>
        </div>
        <br />

        <button className="addbtn" type="button" onClick={postrooms}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default AddRooms;

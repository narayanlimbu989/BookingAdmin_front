import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { api } from "../Http_service/Httpservice";
import Costominput from "./costominput";

const Roomupdate = ({ setopen, id, calldata }) => {
  const [roominfo, setroominfo] = useState({});
  const saveroom = (e) => {
    setroominfo((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };
  const onupdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.put(`/rooms/api/${id}`, roominfo);
      if (data) {
        calldata();
        toast.success(data.message);
      }
    } catch (error) {
    } finally {
      setopen(false);
    }
  };
  return (
    <div className="updatewholebg">
      <div className="updateitems">
        <AiFillCloseCircle
          className="close fs-5"
          onClick={() => setopen(false)}
        />
        <div className="p-2 col-12">
          <h2>Room Information</h2>
          <br />
          <Costominput
            type="text"
            id="title"
            value={roominfo.title}
            onChange={saveroom}
            title="Room title"
            placeholder="Ex: ...room"
          />
          <Costominput
            type="text"
            id="features"
            value={roominfo.features}
            onChange={saveroom}
            title="Room Feature"
            placeholder="Ex: free wifi & breakfast"
          />
          <Costominput
            type="Number"
            id="price"
            value={roominfo.price}
            onChange={saveroom}
            title="price per/night"
            placeholder="Ex: 1000"
          />
          <Costominput
            type="Number"
            id="maxpeople"
            value={roominfo.maxpeople}
            onChange={saveroom}
            title="Max people"
            placeholder="Ex: 2"
          />
          <Costominput
            type="Number"
            id="roomNumber"
            value={roominfo.roomNumber}
            onChange={saveroom}
            title="Room Number"
            placeholder="Ex: 101"
          />

          <br />

          <button className="addbtn" type="button" onClick={onupdate}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Roomupdate;

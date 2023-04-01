import React, { useEffect, useState, useMemo } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";
import Roomupdate from "../components/Roomupdate";
import { api } from "../Http_service/Httpservice";
import PageInation from "../components/PageInation";

const Roomlist = () => {
  const [currentpage, setCurrentpage] = useState(1);
  const itemperpage = 10;

  const [id, setId] = useState("");
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);
  const [Rooms, setroom] = useState([]);

  const lastpost = currentpage * itemperpage;
  const firstpost = lastpost - itemperpage;

  const itemInpage = Rooms.slice(firstpost, lastpost);

  const calldata = async () => {
    const { data } = await api.get("/rooms/api/find/getuserrooms");
    setroom(data);
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
  const deleteroom = async (id, hotelid) => {
    const { data } = await api.delete(`rooms/api/${id}/${hotelid}`);
    if (data.message == "deleted") {
      calldata();
      toast.success("room delete");
    }
  };

  const updateroom = async (id) => {
    setopen(true);
    setId(id);
  };
  return (
    <div className="container-xxl position-relative p-4">
      <h2>Room Lists</h2>
      {loading ? (
        <p>please wait!!</p>
      ) : (
        <table>
          <tr>
            <th>Title</th>
            <th>price</th>
            <th>Room feature</th>
            <th>Max people</th>
            <th>Hotel name</th>
          </tr>
          {itemInpage?.length > 0 ? (
            itemInpage?.map((i, j) => {
              return (
                <tr key={j}>
                  <td>{i.title}</td>
                  <td>{i.price}</td>
                  <td>{i.features}</td>
                  <td>{i.maxpeople}</td>
                  <td>{i.Hoteldetail?.name}</td>
                  <td className="d-flex gap-2 text-danger">
                    <BiEdit
                      className="fs-5"
                      style={{ cursor: "pointer" }}
                      onClick={() => updateroom(i._id)}
                    />
                    <AiFillDelete
                      className="fs-5"
                      onClick={() => deleteroom(i._id, i.Hoteldetail._id)}
                      style={{ cursor: "pointer" }}
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
      {itemInpage.length > 0 && (
        <PageInation
          totalpost={Rooms.length}
          itemperpage={itemperpage}
          currentpage={currentpage}
          setCurrentpage={setCurrentpage}
        />
      )}

      {open && <Roomupdate setopen={setopen} id={id} calldata={calldata} />}
    </div>
  );
};

export default Roomlist;

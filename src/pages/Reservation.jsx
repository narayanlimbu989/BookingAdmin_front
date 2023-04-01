import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { api } from "../Http_service/Httpservice";
import PageInation from "../components/PageInation";

const Reservation = () => {
  const [currentpage, setCurrentpage] = useState(1);
  const itemperpage = 10;
  const [loading, setLoading] = useState(false);
  const [reserve, setReserve] = useState([]);

  const lastpost = currentpage * itemperpage;
  const firstpost = lastpost - itemperpage;

  const itemInpage = reserve.slice(firstpost, lastpost);

  const calldata = async () => {
    const { data } = await api.get("/reserve/api/find/reservehotels");
    setReserve(data);
  };

  useEffect(() => {
    setLoading(true);
    try {
      calldata();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  const deleterserve = async (id) => {
    const { data } = await api.delete(`reserve/api/deletereserve/${id}`);
    if (data.cancel == true) {
      calldata();
      toast.success("Reservation Deleted");
    }
  };
  return (
    <div className="container-xxl p-4">
      <h2>Total Reservation</h2>
      <table>
        <tr>
          <th>Reservation By</th>
          <th>Reservation Hotel name</th>
          <th>Reservation room</th>
          <th>Total Reservation days</th>
          <th>Total Reservation For</th>
        </tr>
        {loading ? (
          "please wait!"
        ) : itemInpage.length > 0 ? (
          itemInpage.map((i, j) => {
            return (
              <tr key={j}>
                <td>
                  {i.reserveby.fullname} ({i.reserveby.phone})
                </td>
                <td>{i.reserveHotel.name}</td>
                <td>
                  {i.reserveRooms.map((i, j) => {
                    return (
                      <>
                        <span key={j}>
                          {i.title} - {i.roomNumber}
                        </span>
                        <br />
                      </>
                    );
                  })}
                </td>
                <td>
                  {i.reserveDate.map((i, j) => {
                    return (
                      <>
                        <span key={j}>{moment(i).format("MMM Do YY")}</span>
                        <br />
                      </>
                    );
                  })}
                </td>
                <td>
                  <span>Adults - {i.adult}</span>
                  <br />
                  <span>Children - {i.child}</span>
                </td>

                <td className="d-flex gap-2 text-danger">
                  <AiFillDelete
                    onClick={() => deleterserve(i._id)}
                    className="fs-5"
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            );
          })
        ) : (
          <p>No reservation made</p>
        )}
      </table>
      {itemInpage.length > 0 && (
        <PageInation
          totalpost={reserve.length}
          itemperpage={itemperpage}
          currentpage={currentpage}
          setCurrentpage={setCurrentpage}
        />
      )}
    </div>
  );
};

export default Reservation;

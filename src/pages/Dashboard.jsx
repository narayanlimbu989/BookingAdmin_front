import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import {useFatch} from "../costumHook/useFatch"

const Dashboard = () => {
  const { data: hotel } = useFatch("/hotels/api/onlyuserhotels");
  const { data: room } = useFatch("/rooms/api/find/getuserrooms");
  const { data: reserve } = useFatch("/reserve/api/find/reservehotels");

  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "June",
      sales: 18,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sep",
      sales: 58,
    },
    {
      type: "Oct",
      sales: 28,
    },
    {
      type: "Nov",
      sales: 88,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#fe831e";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    <>
      <div className="dashboard p-4">
        <h3 className="mb-0" style={{ color: "#fe831e" }}>
          Dashboard
        </h3>
        <div className="information py-2 d-flex gap-3">
          <div className="col-3 bg-white flex-grow-1 d-flex flex-column gap-3 p-2">
            <div className="top d-flex align-items-center justify-content-between">
              <p className="mb-0">Total Stays</p>
              <BiDotsVerticalRounded />
            </div>
            <div className="bottom d-flex align-items-center justify-content-between">
              <h5 className="mb-0">{hotel?.length} properties</h5>
              <div className="bar d-flex flex-column align-items-end">
                <span className="red mb-0 d-flex align-items-center">
                  <BsArrowDownLeft />
                  34.5%
                </span>
                <p className="mb-0">Compared to April 2022</p>
              </div>
            </div>
          </div>
          <div className="col-3 bg-white flex-grow-1 d-flex flex-column gap-3 p-2">
            <div className="top d-flex align-items-center justify-content-between">
              <p className="mb-0">Total Rooms</p>
              <BiDotsVerticalRounded />
            </div>
            <div className="bottom d-flex align-items-center justify-content-between">
              <h5 className="mb-0">{room?.length} Rooms</h5>
              <div className="bar d-flex flex-column align-items-end">
                <span className="green mb-0 d-flex align-items-center">
                  <BsArrowUpRight />
                  34.5%
                </span>
                <p className="mb-0">Compared to April 2022</p>
              </div>
            </div>
          </div>
          <div className="col-3 bg-white flex-grow-1 d-flex flex-column gap-3 p-2">
            <div className="top d-flex align-items-center justify-content-between">
              <p className="mb-0">Total Reservations</p>
              <BiDotsVerticalRounded />
            </div>
            <div className="bottom d-flex align-items-center justify-content-between">
              <h5 className="mb-0">{reserve?.length} reserve</h5>
              <div className="bar d-flex flex-column align-items-end">
                <span className="red mb-0 d-flex align-items-center">
                  <BsArrowDownLeft />
                  34.5%
                </span>
                <p className="mb-0">Compared to April 2022</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-4" style={{ color: "#fe831e" }}>
            Income Statistics
          </h3>
          <div>
            <Column {...config} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

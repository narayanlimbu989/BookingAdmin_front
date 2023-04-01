import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

import { api, apiimage } from "../Http_service/Httpservice";
import Costominput from "./costominput";
import { base_url } from "../Http_service/Httpservice";

const Hotelupdate = ({ setopen, hotel, calldata }) => {
  const hotelid = hotel._id;
  const [oldimages, setOldImages] = useState(hotel.photos);

  const [images, setImages] = useState([]);
  const [hotelinfo, setHotelinfo] = useState({});

  const gethotelinfo = (e) => {
    setHotelinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const acceptedFiles = async (Img) => {
    const formData = new FormData();
    Img.map((file) => {
      formData.append("images", file);
    });
    const { data } = await apiimage.post("/hotels/api/images", formData);
    setImages(data.map((f) => f.filename));
  };

  const deleteoldhotelimage = async (id, index) => {
    const { data } = await api.delete(
      `/hotels/api/deleteimage/${hotelid}/${id}`
    );

    if (data.message == "success") {
      const val = hotel.photos.splice(index, 1);
      const fil = hotel.photos.filter((i) => i != val);
      setOldImages(fil);
    }
  };

  const deleteimage = async (id, index) => {
    const { data } = await api.delete(`/hotels/api/deleteimage/${id}`);

    if (data.message == "success") {
      const val = images.splice(index, 1);
      const fil = images.filter((i) => i != val);
      setImages(fil);
    }
  };

  const onupdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.put(`/hotels/api/update/hotel/${hotelid}`, {
        hotelinfo,
        photos: images,
      });
      if (data) {
        calldata();
        toast.success(data.message);
        setopen(false);
      }
    } catch (error) {}
  };
  return (
    <div className="updatewholebg">
      <div className="updateitems w-75">
        <AiFillCloseCircle
          className=" fs-5"
          onClick={() => setopen(false)}
          style={{ cursor: "pointer" }}
        />
        <div className="updatehotel">
          <div className=" position-relative d-flex flex-column align-items-center justify-content-cnter">
            <Dropzone onDrop={acceptedFiles}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
                    className="bg-success text-white fs-3 p-3 m-4"
                    style={{ cursor: "pointer" }}
                  >
                    <input {...getInputProps()} />
                    <p style={{ textAlign: "center" }}>
                      Drag Or click to select images.
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            {oldimages.length > 0 && (
              <div className="updateimagediv d-flex  gap-5">
                {oldimages?.map((i, j) => {
                  return (
                    <div key={j} className="eachupdateimage">
                      <MdClose
                        className="deleteupdateimg position-absolute fs-3 text-white"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteoldhotelimage(i, j)}
                      />
                      <img src={`${base_url}/${i}`} alt="imagess" />
                    </div>
                  );
                })}
              </div>
            )}
            {images.length > 0 && (
              <div className="updateimagediv mt-3 d-flex  gap-5">
                {images?.map((i, j) => {
                  return (
                    <div key={j} className="eachupdateimage">
                      <MdClose
                        className="deleteupdateimg position-absolute fs-3 text-white"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteimage(i, j)}
                      />
                      <img src={`${base_url}/${i}`} alt="imagess" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="hotelinput">
            <Costominput
              type="text"
              title="Name"
              id="name"
              value={hotelinfo.name}
              onChange={gethotelinfo}
              placeholder="Ex: silicon valley resort"
            />
            <Costominput
              type="text"
              title="Title"
              id="title"
              value={hotelinfo.title}
              onChange={gethotelinfo}
              placeholder="Ex: Best service provider"
            />
            <Costominput
              type="text"
              title="Address"
              id="address"
              value={hotelinfo.address}
              onChange={gethotelinfo}
              placeholder="Ex: 8215 Eagle Lake Dr"
            />
            <div>
              <label htmlFor="city" className="d-flex fs-5 text-success">
                Select your city
              </label>

              <select
                id="city"
                value={hotelinfo.city}
                onChange={gethotelinfo}
                className="inputarea fs-5"
              >
                <option>Select city</option>
                <option value="kathmandu">kathmandu</option>
                <option value="chitwan">chitwan</option>
                <option value="pokhara">pokhara</option>
              </select>
            </div>
            <Costominput
              type="Number"
              title="Cheapest price"
              id="cheapestprice"
              value={hotelinfo.cheapestprice}
              onChange={gethotelinfo}
              placeholder="Ex: 1000"
            />
            <Costominput
              type="text"
              title="Distance from center"
              id="distance"
              value={hotelinfo.distance}
              onChange={gethotelinfo}
              placeholder="Ex: 500m from the center"
            />

            <div>
              <label htmlFor="type" className="d-flex fs-5 text-success">
                Select stays type
              </label>

              <select
                id="type"
                value={hotelinfo.type}
                onChange={gethotelinfo}
                className="inputarea fs-5"
              >
                <option>Select type</option>
                <option value="Hotels">Hotels</option>
                <option value="Apartments">Apartments</option>
                <option value="Resorts">Resorts</option>
                <option value="Villas">Villas</option>
              </select>
            </div>

            <div>
              <label htmlFor="featured" className="d-flex fs-5 text-success">
                Featured
              </label>

              <select
                id="featured"
                value={hotelinfo.featured}
                onChange={gethotelinfo}
                className="inputarea fs-5"
              >
                <option>Select feature</option>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>

            <br />
            <button className="addbtn" type="button" onClick={onupdate}>
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotelupdate;

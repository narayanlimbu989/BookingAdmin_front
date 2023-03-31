import React, { useState } from "react";
import Costominput from "../components/costominput";
import Dropzone from "react-dropzone";
import { MdClose } from "react-icons/md";
import { api, apiimage } from "../Http_service/Httpservice";
import { base_url } from "../Http_service/Httpservice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddHotels = () => {
  const [images, setImages] = useState([]);
  const [hotelinfo, setHotelinfo] = useState({});

  const link = useNavigate();

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

  const deleteimage = async (id, index) => {
    const { data } = await api.delete(`/hotels/api/deleteimage/${id}`);

    if (data.message == "success") {
      const val = images.splice(index, 1);
      const fil = images.filter((i) => i != val);
      setImages(fil);
    }
  };

  const posthotel = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/hotels/api", {
      photos: images,
      hotelinfo,
    });

    if (data.message == "Successfully added") {
      link("/admin/hotelslist");
      toast.success(data.message);
    }
  };

  return (
    <div className="container-xxl d-flex  justify-content-around py-2">
      <div className="col-4 position-relative d-flex flex-column align-items-center justify-content-cnter">
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
        {images.length > 0 && (
          <div className="uploadimages">
            {images?.map((i, j) => {
              return (
                <div key={j} className="eachuploadimage">
                  <MdClose
                    className="imagedelete"
                    onClick={() => deleteimage(i, j)}
                  />
                  <img src={`${base_url}/${i}`} alt="imagess" />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="inputform col-8">
        <h2>Stays Information</h2>
        <br />
        <Costominput
          type="text"
          title="Name"
          id="name"
          value={hotelinfo.name}
          onChange={gethotelinfo}
        />
        <Costominput
          type="text"
          title="Title"
          id="title"
          value={hotelinfo.title}
          onChange={gethotelinfo}
        />
        <Costominput
          type="text"
          title="Address"
          id="address"
          value={hotelinfo.address}
          onChange={gethotelinfo}
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
        />
        <Costominput
          type="text"
          title="Distance from center"
          id="distance"
          value={hotelinfo.distance}
          onChange={gethotelinfo}
          placeholder="500m from the center"
        />

        <div>
          <label htmlFor="type" className="d-flex fs-5 text-success">
            Select Stays Type
          </label>

          <select
            id="type"
            value={hotelinfo.type}
            onChange={gethotelinfo}
            className="inputarea fs-5"
          >
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
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>

        <div>
          <label htmlFor="Descreption" className="d-flex fs-5 text-success">
            Descreption
          </label>
          <textarea
            id="description"
            value={hotelinfo.description}
            onChange={gethotelinfo}
            placeholder="Descreption"
            className="Descreption mt-2 p-3 fs-6"
            rows="10"
          ></textarea>
        </div>
        <br />
        <button className="addbtn" type="button" onClick={posthotel}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default AddHotels;

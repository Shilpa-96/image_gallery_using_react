import React, { useEffect, useState } from "react";
import "./gallery.css";
import logo from "./logo.png";
import header_img from "./header_img.jpg";
import axios from "axios";

import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import Spinner from "./Spinner";

export default function Gallery() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = (p) => {
    axios
      .get(`https://picsum.photos/v2/list?page=${p}&limit=20`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  };

  const handleprev = () => {
    fetchData(page - 1);
    setPage(page - 1);
  };

  const handlenext = () => {
    fetchData(page + 1);
    setPage(page + 1);
  };

  return (
    <div className="gallery-conatainer">
      <div className="header">
        <img src={logo} alt="logo" />
        <h1 className="title">Image Gallery</h1>
      </div>
      <div className="header_img">
        <img src={header_img} alt="header" />
      </div>
      {loading && <Spinner />}
      <div className="image-gallery">
        {data.map((item) => {
          return (
            <div className="gallery-item" key={item.id}>
              <a href={item.url} target="_blank">
                <img
                  src={item.download_url}
                  alt={item.author}
                  style={{ width: "100%" }}
                />
              </a>
            </div>
          );
        })}
      </div>
      <div className="footer">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-secondary"
          onClick={handleprev}
        >
          <MdOutlineArrowBackIosNew />
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handlenext}
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </div>
  );
}

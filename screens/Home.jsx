import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { baseUrl } from "../Urls";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true); // Start loading
    let response = await fetch(`${baseUrl}/api/foodData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    setLoading(false); // End loading
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousal"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousal">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                // src="https://source.unsplash.com/random/300×300/?burger"
                src="https://www.adenpizza.net/wp-content/uploads/2015/08/slider-2.jpg"
                alt="First slide"
                style={{ filter: "brightness(80%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                // src="https://source.unsplash.com/random/300×300/?pizza"
                src="https://static.vecteezy.com/system/resources/previews/026/794/680/non_2x/double-hamburger-isolated-on-white-background-fresh-burger-fast-food-with-beef-and-cream-cheese-realistic-image-ultra-hd-high-design-very-detailed-free-photo.jpg"
                alt="Second slide"
                style={{ filter: "brightness(100%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                // src="https://source.unsplash.com/random/300×300/?rice"
                src="https://wallpapers.com/images/hd/chinese-food-pictures-283a542wre04dt2j.jpg"
                alt="Third slide"
                style={{ filter: "brightness(80%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {loading && (
          <div className="d-flex justify-content-center mt-5">
            <div
              className="spinner-border"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!loading && foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div className="row mb-3" key={data._id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItem.length > 0 ? (
                foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase())
                  )
                  .map((filterItems) => {
                    return (
                      <div
                        key={filterItems._id}
                        className="col-12 col-md-6 col-lg-3"
                      >
                        <Card
                          foodItem={filterItems}
                          options={filterItems.options[0]}
                        />
                      </div>
                    );
                  })
              ) : (
                <div>No Such Data Found</div>
              )}
            </div>
          ))
        ) : (
          <div>Food Categories Are Loading..!! Please Wait</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

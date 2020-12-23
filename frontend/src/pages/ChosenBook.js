import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../App.css";
import { Image } from "semantic-ui-react";
import { AuthyContext } from "../contexts/AuthyContext";
import { BookContext } from "../contexts/BookContext";
import { Link } from "react-router-dom";

var parseString = require("xml2js").parseString;

const ChosenBook = () => {
  const [book, setBook] = useContext(BookContext);
  const [authy, setAuthy] = useContext(AuthyContext);
  useEffect(() => {
    let apiKey = "ALVzK8NwSNC6KG0i7LIMgg";
    let authorId = authy;
    const fetchData2 = async () => {
      const result = await axios(
        `https://www.goodreads.com/author/show/${authorId}?format=xml&key=${apiKey}`
      );
      let data2 = [];
      let books2 = "";
      let books3 = "";
      let authorName = "";

      const xml = result.data;
      parseString(xml, function (err, result) {
        books2 = result.GoodreadsResponse.author[0].about[0];
        books3 = result.GoodreadsResponse.author[0].books[0].book;
        authorName = result.GoodreadsResponse.author[0].name[0];

        for (let i = 0; i < books3.length; i++) {
          data2.push({
            about_book: books3[i].description[0]
              .replace(/<[^>]*>?/gm, "")
              .replace(/(?:https?|ftp):\/\/[\n\S]+/g, ""),
            averageRating: books3[i].average_rating[0],
            bookImage: books3[i].image_url[0],
            link: books3[i].link[0],
            num_pages: books3[i].num_pages[0],
            publication_year: books3[i].publication_year[0],
            title: books3[i].title[0],
            uri: books3[i].uri[0],
            authors: result.GoodreadsResponse.author[0].name[0],
            ratings_count: books3[i].ratings_count[0],
          });
        }
        setData3(data2.filter((x) => x.title === book)[0]);
      });

      console.log(
        books2
          .replace(/<[^>]*>?/gm, "")
          .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
      );

      setAuthorName(authorName);
      setData2(
        books2
          .replace(/<[^>]*>?/gm, "")
          .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
      );
    };

    fetchData2();
  }, [authy]);

  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const [authorName, setAuthorName] = useState([]);

  return (
    <div className="home">
      <br></br>
      <Link as={Link} to={`/`}>
        Home
      </Link>
      <div>
        <br></br>
        <Image src={data3.bookImage} />
        <div>
          <br></br>
          {data3.title} by {authorName}
        </div>
        <br></br>

        <div className="authorDescription">
          {data3.about_book
            ? data3.about_book
            : "Sorry, there is no description for this book :("}
        </div>

        <br></br>
        <div className="authorDescription">
          <b>Author(s):</b> {data3.authors}
        </div>
        <br></br>
        <div className="authorDescription">
          <b>Publication Year:</b> {data3.publication_year}
        </div>
        <br></br>
        <div className="authorDescription">
          <b>Page Count:</b> {data3.num_pages}
        </div>
        <br></br>
        <div className="authorDescription">
          <b>Ratings Count</b> {data3.ratings_count}
        </div>
        <br></br>
        <div className="authorDescription">
          <b>Average Rating:</b> {data3.averageRating}
        </div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};
export default ChosenBook;

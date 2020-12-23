import React, { useContext } from "react";
import { Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { BookContext } from "../contexts/BookContext";

function BookCard({ publication_year, averageRating, bookImage, title }) {
  const [book, setBook] = useContext(BookContext);

  return (
    <div className="bookCard">
      <Image
        floated="right"
        size="mini"
        className="bookImage"
        src={bookImage}
      />
      <div className="boldy">
        <b>Title </b>
      </div>
      <div className="boldy2">{title}</div>
      <div className="boldy">
        <b>Publication year </b>
      </div>
      <div className="boldy2">{publication_year}</div>
      <div className="boldy">
        <b>Average Rating </b>
      </div>
      <div className="boldy2">{averageRating}</div>

      <Button className="button" as={Link} to={`/${title}`}>
        <Button
          color="blue"
          basic
          key={title.id}
          value={title}
          onClick={(e) => setBook(e.currentTarget.value)}
        >
          View
        </Button>
      </Button>
    </div>
  );
}
export default BookCard;

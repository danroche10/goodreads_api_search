import React, { useState, useContext } from "react";
import { Grid } from "semantic-ui-react";
import AuthorCard from "../components/AuthorCard";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Controller, useForm } from "react-hook-form";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
const request = require("request-promise");
const xml2js = require("xml2js");

function Author() {
  const [data, setData] = useState("Martin Amis");

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(e.target.value);
  };

  const temp = "Martin Amis";

  let options = {
    method: "GET",
    uri: `https://www.goodreads.com/search/index.xml  `,
    qs: {
      key: "ALVzK8NwSNC6KG0i7LIMgg",
      q: temp,
    },
  };

  request(options)
    .then((shelf) => {
      xml2js.parseString(shelf, function (err, result) {
        let books = result["GoodreadsResponse"];
        let best_book = books.search[0].results[0].work[0].best_book[0].title.toString();
        setData(best_book);
        console.log(books.search[0].results[0].work);
      });
    })
    .catch((err) => console.error(err));

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Authors</h1>
        <div style={{ width: 300 }} className="search">
          <form onSubmit={handleSubmit(onSubmit2)}>
            <Controller
              name="autocomplete"
              control={control}
              onChange={([e, data, reason]) => handleChange(e, data, reason)}
              onInputChange={(e, data) => handleInputChange(e, data)}
              //defaultValue=""
              as={
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={options}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      //label="e.g. Paul Graham"
                      helperText="Choose an Author"
                      margin="normal"
                      variant="outlined"
                    />
                  )}
                />
              }
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </Grid.Row>
      <Button labelPosition="left">clear filters</Button>
      <Grid.Row stretched>
        <h1>Loading authors..</h1>
        {authors.data &&
          filteredAuthors.map((author) => (
            <Grid.Column key={author.id} style={{ marginBottom: 20 }}>
              <AuthorCard author={author} />
            </Grid.Column>
          ))}
      </Grid.Row>
    </Grid>
  );
}
export default Author;

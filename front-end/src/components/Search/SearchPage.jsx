import React from "react";
import "./search.css";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import {
  Button,
  Classes,
  Checkbox,
  H2,
  InputGroup,
  Label,
  NonIdealState,
  TextArea
} from "@blueprintjs/core";
import { searchService } from "../../services/searchService";
import Loading from "../Common/Loading";

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      loading: true,
      error: "",
      outputClubs: [],
      outputEvents: []
    };
  }

  componentDidMount() {
    this.query("");
  }

  query(query) {
    this.setState({
      loading: true
    });
    searchService.searchClub(query).then(result => {
      if (result.data) {
        searchService.searchEvents(query).then(result2 => {
          if (result2.data) {
            this.setState({
              loading: false,
              outputClubs: result.data,
              outputEvents: result2.data,
              error: ""
            });
          } else {
            this.setState({
              loading: false,
              error: result.error,
              outputClubs: [],
              outputEvents: []
            });
          }
        });
      } else {
        this.setState({
          loading: false,
          error: result.error,
          outputClubs: [],
          outputEvents: []
        });
      }
    });
  }

  handleEnabledChange = (clubs = Object.assign({}, this.emptyClubs)) => {
    this.setState({
      my_clubs: this.emptyClubs
    });
  };

  queryChange = query => {
    this.setState({
      searchQuery: query
    });
  };

  render() {
    const {
      searchQuery,
      loading,
      error,
      outputClubs,
      outputEvents
    } = this.state;
    if (loading) {
      return <Loading />;
    } else if (error) {
      return <NonIdealState icon={"cross"} title={error} />;
    }
    return (
      <div className="event-management">
        <InputGroup
          className={Classes.ROUND + " search-query"}
          leftIcon="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={event => this.queryChange(event.target.value)}
          rightElement={
            <Button
              icon="arrow-right"
              onClick={() => this.query(searchQuery)}
            />
          }
        />
        {outputClubs.length === 0 && outputEvents.length === 0 ? (
          <NonIdealState icon={"search"} title="No search results" />
        ) : (
          <div>
            <H2>Clubs</H2>
            <div className="image-gallery">
              {outputClubs.map(club => {
                return (
                  <div className="gallery-item" key={club.name}>
                    <Link to={routes.ORG + "/" + club.id}>
                      <img
                        src={
                          club.image
                            ? club.image
                            : "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png"
                        }
                        alt={club.name}
                      />
                    </Link>
                    <div className="description truncate">{club.name}</div>
                  </div>
                );
              })}
            </div>
            <H2>Events</H2>
            <div className="image-gallery">
              {outputEvents.map(event => {
                return (
                  <div className="gallery-item" key={event.name}>
                    <Link to={routes.EVENT + "/" + event.id}>
                      <img
                        src={
                          event.image
                            ? event.image
                            : "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png"
                        }
                        alt={event.name}
                      />
                    </Link>
                    <div className="description truncate">{event.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* {my_clubs.managed_clubs.map(club => (
            
          ))} */}
      </div>
    );
  }
}

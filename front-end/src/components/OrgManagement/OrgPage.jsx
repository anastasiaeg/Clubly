import React from "react";
import { Link } from "react-router-dom";
import {
  AnchorButton,
  Button,
  Classes,
  Dialog,
  H2,
  H3,
  H5,
  Intent,
  InputGroup
} from "@blueprintjs/core";
import { DateRangePicker, TimePrecision } from "@blueprintjs/datetime";
import "./orgmanagement.css";
import * as routes from "../../constants/routes";
import { clubsService } from "../../services/clubsService";
import { eventsService } from "../../services/eventsService";
import Loading from "../Common/Loading";

import EventCard from "./EventCard";

export default class OrgPage extends React.Component {
  emptyEvent = {
    name: "",
    description: "",
    location: "",
    startTime: undefined,
    endTime: undefined
  };
  constructor(props) {
    super(props);
    this.state = {
      newEventDialogOpened: false,
      eventForm: this.emptyEvent,
      loading: true,
      editing: false,
      formError: "",
      clubError: "",
      club: {}
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const { club_id } = this.props.route.match.params;
    clubsService.getClub(club_id).then(result => {
      if (result.data) {
        this.club = result.data;
        this.setState({
          loading: false,
          club: result.data,
          clubError: ""
        });
      } else {
        this.setState({
          loading: false,
          clubError: result.error
        });
      }
    });
  };

  onChangeDateTime = selectedDates => {
    if (!selectedDates[0] || !selectedDates[1]) {
      this.setState({
        formError: "Date Form can't be null"
      });
    } else {
      let eventForm = Object.assign({}, this.state.eventForm);
      eventForm.startTime = selectedDates[0];
      eventForm.endTime = selectedDates[1];
      this.setState({
        eventForm
      });
    }
  };

  newEventDialog = event => {
    this.setState({
      newEventDialogOpened: true,
      eventForm: event !== null ? event : this.state.eventForm,
      editing: event !== null,
      formError: ""
    });
  };

  handleCloseDialog = () => {
    this.setState({
      newEventDialogOpened: false,
      editing: false,
      eventForm: this.emptyEvent,
      formError: ""
    });
  };

  submit = () => {
    const { editing, eventForm, club } = this.state;
    if (!eventForm.name || eventForm.name === "") {
      this.setState({
        formError: "Name is missing"
      });
    } else if (!eventForm.location || !eventForm.location === "") {
      this.setState({
        formError: "Location is missing"
      });
    } else {
      if (editing) {
        eventsService.editEvent(eventForm).then(result => {
          if (result.error) {
            this.setState({
              formError: result.error
            });
          } else {
            this.loadData();
          }
        });
      } else {
        eventsService.addEvent(eventForm, club.id).then(result => {
          if (result.error) {
            this.setState({
              formError: result.error
            });
          } else {
            this.loadData();
          }
        });
      }
      this.handleCloseDialog();
    }
  };

  formChange = (attribute, value) => {
    let eventForm = Object.assign({}, this.state.eventForm);
    eventForm[attribute] = value;
    this.setState({ eventForm });
  };

  render() {
    const { width } = this.props;
    const {
      newEventDialogOpened,
      loading,
      club,
      editing,
      eventForm,
      formError
    } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <div className="row">
          <div className="org-image-container">
            <img
              className="org-image"
              src={
                club.image ||
                "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png"
              }
              alt={club.name + " Logo"}
            />
          </div>
          <div>
            <H2>{club.name}</H2>
            <div
              className="org-description"
              style={{ width: width - 538 + "px" }}
            >
              {club.description}
            </div>
            <br />
            <div className="org-tags">
              Tags:
              {club.tags.map(tag => (
                <span key={"tag" + tag.id}>
                  <Link to={routes.SEARCH}>
                    <span className="bp3-tag .modifier">{tag.name}</span>
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="full-row">
            <H3>UPCOMING EVENTS</H3>
            {club.events.map(event => (
              <EventCard
                key={"event" + event.id}
                event={event}
                onEdit={this.newEventDialog}
              />
            ))}
            <Button
              icon="plus"
              className="right-align"
              onClick={() => this.newEventDialog(null)}
            />

            <br />
            <br />
            {/* <H3>PAST EVENTS</H3>
            {club.past.map(event => (
              <EventCard key={"event" + event.id} event={event} />
            ))} */}
          </div>
        </div>
        <Dialog
          autoFocus={true}
          isOpen={newEventDialogOpened}
          onClose={this.handleCloseDialog}
          title={editing ? "Edit the Event" : "Create New Events"}
          canEscapeKeyClose={true}
        >
          <div className={Classes.DIALOG_BODY}>
            <H5>Name</H5>
            <InputGroup
              large={true}
              round={true}
              fill={true}
              value={eventForm.name}
              onChange={event => this.formChange("name", event.target.value)}
              placeholder="Enter name..."
            />
            <br />
            <H5>Description</H5>
            <textarea
              className="bp3-input bp3-round .modifier"
              dir="auto"
              rows="10"
              cols="1000"
              value={eventForm.description}
              onChange={event =>
                this.formChange("description", event.target.value)
              }
              placeholder="Enter description..."
            />
            <br />
            <br />
            <H5>Location</H5>
            <InputGroup
              large={true}
              round={true}
              fill={true}
              required={true}
              value={eventForm.location}
              onChange={event =>
                this.formChange("location", event.target.value)
              }
              placeholder="Enter location..."
            />
            <br />
            <H5>Secret Code</H5>
            <InputGroup
              large={true}
              round={true}
              fill={true}
              required={true}
              value={eventForm.attendanceCode ? eventForm.attendanceCode : ""}
              onChange={event =>
                this.formChange("attendanceCode", event.target.value)
              }
              placeholder="Enter location..."
            />
            <br />
            <H5>Start Time - End Time</H5>
            <DateRangePicker
              shortcuts={false}
              className={Classes.ELEVATION_1}
              allowSingleDayRange={true}
              timePrecision={TimePrecision.MINUTE}
              onChange={this.onChangeDateTime}
              timePickerProps={{
                useAmPm: true
              }}
              value={[eventForm.startTime, eventForm.endTime]}
            />
          </div>
          <div className={Classes.DIALOG_FOOTER + " row"}>
            {formError}
            <div>
              {editing && (
                <AnchorButton
                  intent={Intent.DANGER}
                  onClick={this.handleCloseDialog}
                >
                  Remove Event
                </AnchorButton>
              )}
            </div>
            <div className="push">
              <Button onClick={this.handleCloseDialog}>Cancel</Button>
            </div>
            <div>
              <AnchorButton intent={Intent.SUCCESS} onClick={this.submit}>
                Save
              </AnchorButton>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

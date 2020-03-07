import React from "react";
import { Link } from "react-router-dom";
import {
  AnchorButton,
  Button,
  Classes,
  Dialog,
  H2,
  H5,
  Intent,
  InputGroup
} from "@blueprintjs/core";
import { DateRangePicker, TimePrecision } from "@blueprintjs/datetime";
import "./orgmanagement.css";
import * as routes from "../../constants/routes";
import { eventsService } from "../../services/eventsService";
import Loading from "../Common/Loading";

export default class EventPage extends React.Component {
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
      editDialogOpened: false,
      eventForm: this.emptyEvent,
      loading: true,
      editing: false,
      eventError: "",
      formError: "",
      event: {}
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const { event_id } = this.props.route.match.params;
    eventsService.getEvent(event_id).then(result => {
      if (result.data) {
        this.event = result.data;
        this.setState({
          loading: false,
          event: result.data,
          eventError: ""
        });
      } else {
        this.setState({
          loading: false,
          eventError: result.error
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

  toggleEventDialog = event => {
    this.setState({
      editDialogOpened: true,
      eventForm: event !== null ? event : this.state.eventForm,
      editing: event !== null,
      formError: ""
    });
  };

  handleCloseDialog = () => {
    this.setState({
      editDialogOpened: false,
      editing: false,
      eventForm: this.emptyEvent,
      formError: ""
    });
  };

  submit = () => {
    console.log("submit");
  };

  formChange = (attribute, value) => {
    let eventForm = Object.assign({}, this.state.eventForm);
    eventForm[attribute] = value;
    this.setState({ eventForm });
  };

  render() {
    const { width } = this.props;
    const {
      editDialogOpened,
      loading,
      event,
      editing,
      eventForm,
      formError,
      eventError
    } = this.state;
    if (loading) {
      return <Loading />;
    } else if (eventError) {
      return <div>Error with loading Event</div>;
    }
    return (
      <div>
        <div className="row">
          {/* {event.image && ( */}
          <div className="org-image-container">
            <img
              className="org-image"
              src={
                event.image ||
                "https://www.belfercenter.org/themes/belfer/images/event-default-img-med.png"
              }
              alt={event.name + " Logo"}
            />
          </div>
          {/* )} */}
          <div>
            <H2>
              {event.name}
              <Button icon="cog" onClick={() => this.toggleEventDialog(null)} />
            </H2>
            <div
              className="org-description"
              style={{ width: width - 538 + "px" }}
            >
              {event.description}
            </div>
            <br />
            <div className="org-tags">
              Tags:
              {event.tags.map(tag => (
                <span key={"tag" + tag.id}>
                  <Link to={routes.SEARCH}>
                    <span className="bp3-tag .modifier">{tag.name}</span>
                  </Link>
                </span>
              ))}
            </div>
            {new Date(event.startTime).getTime() < new Date().getTime() && (
              <AnchorButton text={"RSVP"} />
            )}
          </div>
        </div>
        <br />
        <Dialog
          autoFocus={true}
          isOpen={editDialogOpened}
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

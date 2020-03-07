import React from "react";
//import './orgmanagement.css';
import {
  Dialog,
  H5,
  InputGroup,
  Button,
  AnchorButton,
  Classes,
  Intent
} from "@blueprintjs/core";

export default class AdminManagementPage extends React.Component {
  emptyOrg = {
    club_name: "",
    description: "",
    tags: [],
    members: [],
    events: [],
    organizers: []
  };

  constructor(props) {
    super(props);
    this.state = {
      orgDialogOpened: false,
      org: this.emptyOrg
    };
  }

  toggleDialog = (club = Object.assign({}, this.emptyOrg)) => {
    this.setState({
      orgDialogOpened: !this.state.orgDialogOpened,
      org: club
    });
  };

  handleCloseDialog = () => {
    this.setState({
      orgDialogOpened: false
    });
  };

  render() {
    const { orgDialogOpened, org } = this.state;
    const wicsData = {
      club_name: "Women in Computer Science",
      description: "Stuff",
      tags: ["Technology", "Science", "Women"],
      members: [200000001, 200000002, 200000003, 200000004],
      events: [100001, 100002, 100003, 100004],
      organizers: [200000001]
    };

    const beekeepingData = {
      club_name: "Beekeeping Club",
      description: "Stuff",
      tags: ["Science", "Environment"],
      members: [200000001, 200000002, 200000003, 200000004],
      events: [100001, 100002, 100003, 100004],
      organizers: [200000001]
    };

    const userData = {
      managed_clubs: [wicsData, beekeepingData],
      first_name: "Anastasia",
      last_name: "Egorova",
      last_active: Date.now(),
      tags: ["Technology", "Women"]
    };

    return (
      <div className="event-management">
        <h1>Organizations</h1>
        <Button icon="plus" onClick={this.toggleDialog}>
          {" "}
          Add New Organization{" "}
        </Button>
        {userData.managed_clubs.map((club, index) => (
          <div className="image-gallery" key={club.club_name}>
            <div className="gallery-item">
              <img
                src={
                  index === 0
                    ? "https://static1.squarespace.com/static/58ed6670197aea8dbb07ec4e/t/5acac8faaa4a998f3f5dc351/1523239170320/"
                    : "https://pestworldforkids.org/media/12856/Small_bee-honeycomb.jpg?preset=fullWidth360"
                }
                alt={club.club_name}
                onClick={() => this.toggleDialog(club)}
              />
              <div className="description">{club.club_name}</div>
            </div>
          </div>
        ))}
        <Dialog
          autoFocus={true}
          isOpen={orgDialogOpened}
          onClose={this.handleCloseDialog}
          title="Organization Details"
          canEscapeKeyClose={true}
        >
          <div className={Classes.DIALOG_BODY}>
            <H5>Club Name</H5>
            <InputGroup
              large={true}
              round={true}
              fill={true}
              placeholder="Enter club name..."
              defaultValue={org.club_name}
            />
            <br />
            <H5>Description</H5>
            <textarea
              className="bp3-input bp3-round .modifier"
              dir="auto"
              rows="10"
              cols="1000"
              placeholder="Enter description..."
              defaultValue={org.description}
            />
            <br />
            <br />
            <H5>Tags</H5>
            <InputGroup
              large={true}
              round={true}
              fill={true}
              placeholder="Enter tags..."
              defaultValue={org.tags}
            />
            <br />
            <H5>Members</H5>
            <textarea
              className="bp3-input bp3-round .modifier"
              dir="auto"
              rows="10"
              cols="1000"
              placeholder="Enter members..."
              defaultValue={org.members}
            />
            <br />
            <br />
            <H5>Events</H5>
            <textarea
              className="bp3-input bp3-round .modifier"
              dir="auto"
              rows="10"
              cols="1000"
              placeholder="Enter events..."
              defaultValue={org.events}
            />
            <br />
            <br />
            <H5>Organizers</H5>
            <InputGroup
              large={true}
              round={true}
              fill={true}
              placeholder="Enter club organizers..."
              defaultValue={org.organizers}
            />
            <br />
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={this.handleCloseDialog}>Delete</Button>
              <AnchorButton
                intent={Intent.SUCCESS}
                href="https://www.palantir.com/palantir-foundry/"
                target="_blank"
              >
                Save
              </AnchorButton>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

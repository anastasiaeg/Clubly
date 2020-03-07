import React from "react";
import "./orgmanagement.css";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";

export default class OrgManagementPage extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <div className="event-management">
        <h1>Managed organizations</h1>
        <div className="image-gallery">
          {user &&
            user.organizerOf.map(club => (
              <div className="gallery-item" key={club.id}>
                <Link to={routes.ORG + "/" + encodeURI(club.id)}>
                  <img src={club.image} alt={club.name} />
                </Link>
                <div className="description">{club.name}</div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

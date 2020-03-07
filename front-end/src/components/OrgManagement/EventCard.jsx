import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, H4, Icon, Text } from "@blueprintjs/core";
import "./orgmanagement.css";
import eventCardDate from "../../utils/dateTime";
import * as routes from "../../constants/routes";

export default class EventCard extends React.Component {
  render() {
    const { event, width, onEdit } = this.props;
    if (!event) {
      return null;
    }
    event.startTime = new Date(event.startTime);
    event.endTime = new Date(event.endTime);
    return (
      <div className="event-short" style={{ width: width }}>
        <Card className="event-card" interactive={true}>
          <div className="row">
            <Link to={routes.EVENT + "/" + event.id} className="half-row">
              <H4>{event.name}</H4>
            </Link>
            {onEdit && (
              <Button
                style={{ textAlign: "right" }}
                icon="cog"
                onClick={() => onEdit(event)}
              />
            )}
          </div>
          <Text tagName="p" ellipsize={true}>
            {event.description}
          </Text>
          <div>{eventCardDate(event.startTime)}</div>
          <div className="event-location">
            <a
              href={
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURI(event.location)
              }
              target="_blank"
            >
              <Icon icon="locate" /> {event.location}
            </a>
          </div>
          {event.tags.map(tag => (
            <span key={event.id + "_tag" + tag.id} className="org-tags">
              <Link to={routes.SEARCH}>
                <span className="bp3-tag .modifier">{tag.name}</span>
              </Link>
            </span>
          ))}
        </Card>
        <br />
      </div>
    );
  }
}

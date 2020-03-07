import React, { Component } from "react";
import {
  AnchorButton,
  Button,
  Card,
  Classes,
  ControlGroup,
  Dialog,
  H5,
  HTMLSelect,
  Intent
} from "@blueprintjs/core";
import { DatePicker } from "@blueprintjs/datetime";
import EventCard from "../OrgManagement/EventCard";
import { weeksMonths } from "../../constants/weeksMonths";
import { calendarService } from "../../services/calendarService";
import Loading from "../Common/Loading";
import "./calendar.css";

class Calendar extends Component {
  array1 = Array.apply(null, Array(1));
  array3 = Array.apply(null, Array(3));

  rangeFrom = undefined;
  rangeTo = undefined;

  constructor(props) {
    super(props);

    const today = new Date();
    //Store dates to save time
    this.rangeFrom = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 9
    );
    this.rangeTo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 9
    );
    var from = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.state = {
      loading: false,
      numberOfDates: 3,
      from: from,
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
      dateBuckets: {},
      error: "",
      selectedDate: from,
      selectDateDialogOpen: false
    };
  }

  componentDidMount() {
    this.getRSVP(this.rangeFrom, this.rangeTo);
  }
  /**
   * Reset from and to
   */
  backToToday = () => {
    const today = new Date();
    this.setState({
      from: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      to: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + this.state.numberOfDates
      )
    });
  };

  toggleDateDialog = () => {
    this.setState({
      selectedDate: this.state.from,
      selectDateDialogOpen: !this.state.selectDateDialogOpen
    });
  };

  getRSVP = (rangeFrom, rangeTo) => {
    this.setState({
      loading: true
    });
    calendarService
      .getCalendarRSVP(this.props.user.id, rangeFrom, rangeTo)
      .then(result => {
        if (result.data) {
          this.setState({
            dateBuckets: this.mapToBuckets(result.data),
            loading: false
          });
        } else {
          this.setState({
            error: result.error,
            loading: false
          });
        }
      });
  };

  mapToBuckets = events => {
    let { dateBuckets } = this.state;
    while (events.length > 0) {
      const event = events.pop();
      event.startTime = new Date(event.startTime);
      const date = new Date(
        event.startTime.getFullYear(),
        event.startTime.getMonth(),
        event.startTime.getDate()
      );
      if (dateBuckets[date]) {
        dateBuckets[date].push(event);
      } else {
        dateBuckets[date] = [event];
      }
    }
    return dateBuckets;
  };

  updateFromTo = (numberOfDates, from, to) => {
    const rFrom = this.rangeFrom;
    const rTo = this.rangeTo;
    if (from.getTime() < rFrom.getTime()) {
      this.rangeFrom = new Date(
        rFrom.getFullYear(),
        rFrom.getMonth(),
        rFrom.getDate() - 18 < from.getDate()
          ? rFrom.getDate() - 18
          : from.getDate()
      );
      this.getRSVP(this.rangeFrom, rFrom);
    } else if (to.getTime() > rTo.getTime()) {
      this.rangeTo = new Date(
        rTo.getFullYear(),
        rTo.getMonth(),
        rTo.getDate() + 18 > to.getDate() ? rTo.getDate() + 18 : to.getDate()
      );
      this.getRSVP(rTo, this.rangeTo);
    }
    this.setState({
      numberOfDates,
      from,
      to
    });
  };

  onChangeDate = date => {
    this.setState({
      selectedDate: date
    });
  };

  submitDate = () => {
    const { numberOfDates, selectedDate } = this.state;
    this.updateFromTo(numberOfDates, selectedDate, this.rangeTo);
    this.toggleDateDialog();
  };

  renderDay = date => {
    const { numberOfDates, dateBuckets } = this.state;
    const { width } = this.props;

    return (
      <Card className="calendar-card">
        <p>
          {`${weeksMonths.daysOfWeek[date.getDay()]}, ${
            weeksMonths.months[date.getMonth()]
          } ${date.getDate()}`}
        </p>
        {dateBuckets[date] &&
          dateBuckets[date].map((event, key) => {
            return (
              <EventCard
                key={key}
                event={event}
                width={
                  (width - 160.02 + 34 * (3 - numberOfDates)) / numberOfDates
                }
              />
            );
          })}
      </Card>
    );
  };

  render() {
    const {
      numberOfDates,
      from,
      to,
      loading,
      selectedDate,
      selectDateDialogOpen
    } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="column calendar">
        <div className="row">
          <div className="left">
            <ControlGroup vertical={false}>
              <HTMLSelect
                options={["One-Day", "Three-Day"]}
                value={numberOfDates === 3 ? "Three-Day" : "One-Day"}
                onChange={event => {
                  var num = event.currentTarget.value === "One-Day" ? 1 : 3;
                  this.updateFromTo(
                    num,
                    from,
                    new Date(
                      from.getFullYear(),
                      from.getMonth(),
                      from.getDate() + num - 1
                    )
                  );
                }}
              />
            </ControlGroup>
          </div>
          <div className="center">
            <H5>
              <Button
                icon="arrow-left"
                minimal={true}
                large={true}
                onClick={() => {
                  this.updateFromTo(
                    numberOfDates,
                    new Date(
                      from.getFullYear(),
                      from.getMonth(),
                      from.getDate() - numberOfDates
                    ),
                    new Date(
                      to.getFullYear(),
                      to.getMonth(),
                      to.getDate() - numberOfDates
                    )
                  );
                }}
              />
              <span className="calendar-range" onClick={this.toggleDateDialog}>
                {numberOfDates === 3
                  ? `${
                      weeksMonths.months[from.getMonth()]
                    } ${from.getDate()} -  ${
                      from.getMonth() !== to.getMonth()
                        ? weeksMonths.months[to.getMonth()]
                        : ""
                    } ${to.getDate()}`
                  : `${weeksMonths.months[from.getMonth()]} ${from.getDate()}`}
              </span>
              <Button
                icon="arrow-right"
                minimal={true}
                large={true}
                onClick={() => {
                  this.updateFromTo(
                    numberOfDates,
                    new Date(
                      from.getFullYear(),
                      from.getMonth(),
                      from.getDate() + numberOfDates
                    ),
                    new Date(
                      to.getFullYear(),
                      to.getMonth(),
                      to.getDate() + numberOfDates
                    )
                  );
                }}
              />
            </H5>
          </div>
          <div className="right" />
        </div>
        <div className="row calendar">
          {(numberOfDates === 3 ? this.array3 : this.array1).map(
            (item, index) => (
              <div className="calendar-child" key={"column_" + index}>
                {this.renderDay(
                  new Date(
                    from.getFullYear(),
                    from.getMonth(),
                    from.getDate() + index
                  )
                )}
              </div>
            )
          )}
        </div>

        <Dialog
          autoFocus={true}
          isOpen={selectDateDialogOpen}
          onClose={this.toggleDateDialog}
          title={"Pick a date"}
          canEscapeKeyClose={true}
          className="calendar-date-dialog"
        >
          <DatePicker
            value={selectedDate}
            reverseMonthAndYearMenus={false}
            onChange={this.onChangeDate}
            className="calendar-date-picker"
          />
          <div className={Classes.DIALOG_FOOTER + " row"}>
            <div className="push">
              <Button onClick={this.toggleDateDialog}>Cancel</Button>
            </div>
            <div>
              <AnchorButton intent={Intent.SUCCESS} onClick={this.submitDate}>
                Save
              </AnchorButton>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Calendar;

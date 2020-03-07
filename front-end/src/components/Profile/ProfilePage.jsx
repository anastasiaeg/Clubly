import React from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import {
  AnchorButton,
  Button,
  Classes,
  Dialog,
  H5,
  HTMLSelect,
  Intent,
  InputGroup,
  MenuItem,
  UL
} from "@blueprintjs/core";
import { MultiSelect } from "@blueprintjs/select";
import { usersService } from "../../services/usersService";
import { tagsService } from "../../services/tagsService";
import { intermediateService } from "../../services/intermediateService";
import * as routes from "../../constants/routes";
import Loading from "../Common/Loading";
// import TagsSelect from  "../Common/TagsSelect";

export default class ProfilePage extends React.Component {
  YEAR_OPTIONS = ["FR", "SO", "JR", "SR"];

  allTags = [];
  constructor(props) {
    super(props);
    let user = Object.assign({}, props.user);
    this.allTags = [];
    this.state = {
      userForm: user,
      loading: true,
      error: "",
      user: user,
      editing: false,
      tags: []
    };
    this.loadData();
  }

  loadData = async () => {
    const { user_id } = this.props.route.match.params;
    usersService.getUser(user_id || this.state.user.id).then(result => {
      if (result.data) {
        this.club = result.data;
        tagsService.getAllTags().then(tags => {
          if (tags.data) {
            this.allTags = tags.data;
            this.setState({
              loading: false,
              user: result.data,
              userForm: result.data,
              editing: false,
              tags: result.data.tags,
              error: ""
            });
          } else {
            this.setState({
              loading: false,
              error: tags.error
            });
          }
        });
      } else {
        this.setState({
          loading: false,
          error: result.error
        });
      }
    });
  };

  submitEdit = () => {
    const { userForm } = this.state;
    this.setState({
      loading: true
    });
    try {
      intermediateService
        .editTagsUsers(userForm.id, userForm.tags)
        .then(intermediateResult => {
          if (intermediateResult.error) {
            this.setState({
              loading: false,
              error: intermediateResult.error
            });
          } else {
            usersService.editUser(userForm).then(result => {
              if (result.data) {
                this.setState({
                  loading: false,
                  user: result.data,
                  userForm: result.data,
                  editing: false,
                  error: ""
                });
              } else {
                this.setState({
                  loading: false,
                  error: result.error
                });
              }
            });
          }
        });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };

  toggleEditing = () => {
    const { editing, user } = this.state;
    this.setState({
      editing: !editing,
      userForm: user,
      tags: user.tags
    });
  };

  formChange = (attribute, value) => {
    let userForm = Object.assign({}, this.state.userForm);
    userForm[attribute] = value;
    this.setState({ userForm });
  };

  escapeRegExpChars = text => {
    return text.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
  };

  highlightText = (text, query) => {
    let lastIndex = 0;
    const words = query
      .split(/\s+/)
      .filter(word => word.length > 0)
      .map(this.escapeRegExpChars);
    if (words.length === 0) {
      return [text];
    }
    const regexp = new RegExp(words.join("|"), "gi");
    const tokens = [];
    while (true) {
      const match = regexp.exec(text);
      if (!match) {
        break;
      }
      const length = match[0].length;
      const before = text.slice(lastIndex, regexp.lastIndex - length);
      if (before.length > 0) {
        tokens.push(before);
      }
      lastIndex = regexp.lastIndex;
      tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
    }
    const rest = text.slice(lastIndex);
    if (rest.length > 0) {
      tokens.push(rest);
    }
    return tokens;
  };

  filterTag = (query, tag) => {
    return tag.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
  };

  findIndexTag = tag => {
    const { userForm } = this.state;
    for (let i = 0; i < userForm.tags.length; i++) {
      if (userForm.tags[i].id === tag.id) {
        return i;
      }
    }
    return -1;
  };

  renderTag = (tag, { modifiers, handleClick, query }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={this.isTagSelected(tag) ? "tick" : "blank"}
        key={tag.id}
        onClick={handleClick}
        text={this.highlightText(tag.name, query)}
        shouldDismissPopover={false}
      />
    );
  };

  handleTagRemove = (_tag, index) => {
    this.deselectTag(index);
  };

  getSelectedTagsIndex(tag) {
    return this.findIndexTag(tag);
  }

  isTagSelected(tag) {
    return this.getSelectedTagsIndex(tag) !== -1;
  }

  selectTag(tag) {
    let userForm = Object.assign({}, this.state.userForm);
    userForm.tags = [...userForm.tags, tag];
    this.setState({ userForm: userForm });
  }

  deselectTag(index) {
    let userForm = Object.assign({}, this.state.userForm);
    userForm.tags = userForm.tags.filter((_tags, i) => i !== index);
    this.setState({ userForm: userForm });
  }

  handleClear = () => this.setState({ tags: [] });

  render() {
    const { editing, userForm, user, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    const clearButton =
      userForm.tags.length > 0 ? (
        <Button icon="cross" minimal={true} onClick={this.handleClear} />
      ) : null;

    return (
      <div className="profile">
        <div className="row">
          <img
            className="profile-image"
            src={
              user.image ||
              "https://i.pinimg.com/originals/9f/81/2d/9f812d4cf313e887ef99d8722229eee1.jpg"
            }
            alt="Avatar"
          />
          <div className="profile-info">
            <h2>
              {user.firstName + " " + user.lastName} | {user.email}{" "}
              <Button icon="cog" onClick={this.toggleEditing} />
            </h2>
            <p>
              {user.major} | {user.year}
            </p>
            <div className="org-tags">
              Tags:
              {user.tags &&
                user.tags.map(tag => (
                  <span key={tag.id}>
                    <Link to={routes.SEARCH}>
                      <span className="bp3-tag .modifier">{tag.name}</span>
                    </Link>
                  </span>
                ))}
            </div>
          </div>
        </div>
        <div className="row">
          {user.organizerOf.length > 0 ? (
            <div className="half-row">
              <div>
                <h2>Organizer Of:</h2>
                <UL>
                  {user.organizerOf.map(club => (
                    <li key={club.id}>
                      <Link
                        to={routes.ORG + "/" + encodeURI(club.id)}
                        textarea="henlo"
                      >
                        {club.name}
                      </Link>
                    </li>
                  ))}
                </UL>
              </div>
            </div>
          ) : null}
          {user.memberOf.length > 0 ? (
            <div>
              <div>
                <h2>Member Of:</h2>
                <UL>
                  {user.memberOf.map(club => (
                    <li key={club.id}>
                      <Link to={routes.ORG + "/" + encodeURI(club.id)}>
                        {club.name}
                      </Link>
                    </li>
                  ))}
                </UL>
              </div>
            </div>
          ) : null}
        </div>
        <Dialog
          autoFocus={true}
          isOpen={editing}
          onClose={this.toggleEditing}
          title="Edit profile"
          canEscapeKeyClose={true}
        >
          <div className={Classes.DIALOG_BODY}>
            <H5>First Name</H5>
            <InputGroup
              large={true}
              round={true}
              fill={true}
              placeholder="Enter first name..."
              onChange={event =>
                this.formChange("firstName", event.target.value)
              }
              value={userForm.firstName}
            />
            <br />
            <H5>Last Name</H5>
            <InputGroup
              large={true}
              round={true}
              fill={true}
              placeholder="Enter last name..."
              onChange={event =>
                this.formChange("lastName", event.target.value)
              }
              value={userForm.lastName}
            />
            <br />
            <H5>Email</H5>
            <InputGroup
              large={true}
              round={true}
              fill={true}
              placeholder="Enter email..."
              onChange={event => this.formChange("email", event.target.value)}
              value={userForm.email}
            />
            <br />
            <H5>Year</H5>
            <HTMLSelect
              options={this.YEAR_OPTIONS}
              value={userForm.year}
              onChange={event => this.formChange("year", event.target.value)}
            />
            <br />
            <br />
            <H5>Major</H5>
            <InputGroup
              large={true}
              round={true}
              fill={true}
              placeholder="Enter major..."
              onChange={event => this.formChange("major", event.target.value)}
              value={userForm.major}
            />
            <br />
            <H5>Student Id</H5>
            <InputGroup
              large={true}
              round={true}
              fill={true}
              placeholder="Enter student id..."
              onChange={event =>
                this.formChange("studentId", event.target.value)
              }
              value={userForm.studentId}
            />
            <br />
            <H5>Tags</H5>
            <MultiSelect
              items={this.allTags}
              resetOnSelect={true}
              tagRenderer={tag => tag.name}
              onItemSelect={tag => {
                if (!this.isTagSelected(tag)) {
                  this.selectTag(tag);
                } else {
                  this.deselectTag(this.getSelectedTagsIndex(tag));
                }
              }}
              noResults={<MenuItem disabled={true} text="No results." />}
              selectedItems={userForm.tags}
              popoverProps={{
                inheritDarkTheme: true,
                position: "top",
                className: "tags-popover",
                defaultIsOpen: true
              }}
              tagInputProps={{
                onRemove: this.handleTagRemove,
                rightElement: clearButton
              }}
              itemRenderer={this.renderTag}
              itemPredicate={this.filterTag}
              tagMinimal={false}
            />
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={this.toggleEditing}>Cancel</Button>
              <AnchorButton intent={Intent.SUCCESS} onClick={this.submitEdit}>
                Save
              </AnchorButton>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

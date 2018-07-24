import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';
import "./moviecredits.module.css";
import _ from "lodash";

const POSTER_PATH = "http://image.tmdb.org/t/p/w342";

class MovieCredits extends Component {
  renderCast = cast => {
    return cast.map(member => {
      return (
        <Card key={member.name}>
          {this.renderImg(member.profile_path, member.name)}
          <CardBody>
            <CardTitle>{member.name}</CardTitle>
            <CardText>
            {member.character}
            </CardText>
          </CardBody>
        </Card>
      );
    });
  };

  renderDepartments = crew => {
    // we need to group the crew by department
    const crewByDept = _.groupBy(crew, "department");

    return _.map(crewByDept, (members, department) => {
      return (
        <div className="deptContainer" key={department}>
          <h4>{department}</h4>
          <div className="crewCardContainer">
          {this.renderCrewMembers(members)}
          </div>
        </div>
      );
    });
  };

  renderCrewMembers(members) {
    return members.map(member => {
      return (
        <Card key={member.name}>
          {this.renderImg(member.profile_path, member.name)}
          <CardBody>
            <CardTitle>{member.name}</CardTitle>
          <CardText>
            {member.job}
          </CardText>
          </CardBody>
        </Card>
      );
    });
  }
  renderImg = (path, name) => {
    let src = path
      ? `${POSTER_PATH}${path}`
      : `https://fakeimg.pl/154x231/?font_size=16&text=${name}`;
    return <CardImg  src={src} alt={name} />;
  };

  render() {
    const { cast, crew } = this.props;
    return (
      <div className="castAndCrewContainer">
        <div >
          <h3>Cast</h3>
          <div className="castCardContainer">
          {cast && this.renderCast(cast)}
          </div>
        </div>
        <div>
          <h3>Crew</h3>
          {this.renderDepartments(crew)}
        </div>
      </div>
    );
  }
}

MovieCredits.propTypes = {
  cast: PropTypes.array,
  crew: PropTypes.array
};

export default MovieCredits;

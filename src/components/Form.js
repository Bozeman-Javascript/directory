import React, { Component } from "react";
import Firebase from "firebase";
import ReactFireMixin from "reactfire";
import reactMixin from "react-mixin";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import ReactFitText from "react-fittext";
import classNames from "classnames";
import "../css/button.css";
import "../css/form.css";
import "../css/icon.css";

class Form extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false
    };
  }

  render() {
    var inBZNJS = this.props.inBZNJS,
      classes = null,
      classesIcon = null,
      classesFormMask = null,
      user = this.props.user,
      name = user && user.name ? user.name.split(" ")[0] : ["Coder"],
      stackoverflow = user && user.stackoverflow ? user.stackoverflow : "",
      linkedin = user && user.linkedin ? user.linkedin : "",
      twitter = user && user.twitter ? user.twitter : "",
      website = user && user.website ? user.website : "",
      joinMsg = null,
      formMask = null;

    if (!user) {
      return null;
    }

    classes = classNames("form", { "form--show": this.state.show });

    classesIcon = classNames("icon-down-open", { "icon--rotate": this.state.show });

    classesFormMask = classNames("form-mask", { "form-mask--show": this.state.show });

    if (!inBZNJS) {
      joinMsg = (
        <div className="form-welcome--center">
          <a href="https://github.com/Bozeman-Javascript" target="_blank">
            Join our <i className="icon-github" /> Team
          </a>
        </div>
      );
    }

    if (this.state.show) {
      formMask = <div className={classesFormMask} />;
    }

    return (
      <div className={classes}>
        <div className="form-wrapper">
          <ReactFitText compressor={3} minFontSize={26}>
            <h1 className="form-header">Edit your Profile</h1>
          </ReactFitText>
          <div className="form-field">
            <label>
              stackoverflow.com/users/<span>#######</span>
            </label>
            <input
              className="form-input"
              ref="stackoverflow"
              type="text"
              placeholder="Stackoverflow ID#"
              defaultValue={stackoverflow}
            />
            <i className="form-icon icon-stackoverflow" />
          </div>
          <div className="form-field">
            <label>
              linkedin.com/in/<span>username</span>
            </label>
            <input
              className="form-input"
              ref="linkedin"
              type="text"
              defaultValue={linkedin}
              placeholder="LinkedIn ID"
            />
            <i className="form-icon icon-linkedin" />
          </div>
          <div className="form-field">
            <label>
              twitter.com/<span>username</span>
            </label>
            <input
              className="form-input"
              ref="twitter"
              type="text"
              defaultValue={twitter}
              placeholder="Twitter handle"
            />
            <i className="form-icon icon-twitter" />
          </div>
          <div className="form-field">
            <label>Any URL</label>
            <input
              className="form-input"
              ref="website"
              type="text"
              defaultValue={website}
              placeholder="Website URL"
            />
            <i className="form-icon icon-globe" />
          </div>
          <div className="form-field form-field--expand">
            <label>&nbsp;</label>
            <button className="button button--update" onClick={this._handleUpdate}>
              Update
            </button>
          </div>
          <div className="form-welcome">
            <div className="form-welcome--left">Hi {name}</div>
            {joinMsg}
            <div className="form-welcome--right" onClick={this._handleToggle}>
              Edit
              <a className={classesIcon} />
            </div>
          </div>
        </div>
        <ReactCSSTransitionGroup
          key="form-mask"
          transitionName="mask"
          component="div"
          transitionLeave={true}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {formMask}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  _handleUpdate = () => {
    var user = this.props.user;
    var inputs = this.refs;

    Firebase.database()
      .ref("users/" + user.id)
      .update({
        stackoverflow: inputs.stackoverflow.value,
        linkedin: inputs.linkedin.value,
        twitter: inputs.twitter.value,
        website: inputs.website.value
      });
  };

  _handleToggle = () => {
    this.setState({
      show: !this.state.show
    });
  };
}

Form.propTypes = {
  inBZNJS: React.PropTypes.bool,
  user: React.PropTypes.object
};

Form.defaultProps = {
  inBZNJS: false,
  user: null
};

reactMixin(Form.prototype, ReactFireMixin);

export default Form;

import React from "react";
import Button from "../Button";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const CustomForm = ({ status, message, onValidated, light, type }) => {
  let email;
  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value
    });

  return (
    <React.Fragment>
      <div className='signup-form'>
        <input ref={node => (email = node)} type='email' placeholder={type} />
        <div>
          {status === "sending" && <span>sending...</span>}
          {status === "error" && (
            <span dangerouslySetInnerHTML={{ __html: message }} />
          )}
          {status === "success" && (
            <span dangerouslySetInnerHTML={{ __html: message }} />
          )}
        </div>
      </div>
      <div className='btn-container'>
        <Button
          clickFunc={submit}
          theme={light && "dark"}
          text='Submit'
        ></Button>
      </div>
    </React.Fragment>
  );
};

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      isDeleting: false,
      loopNum: 0,
      typingSpeed: 150
    };
  }

  componentDidMount() {
    this.handleType();
  }

  handleType = () => {
    const { isDeleting, loopNum, text, typingSpeed } = this.state;
    const fullText = "Enter your email address here";

    this.setState({
      text: isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1),
      typingSpeed: isDeleting ? 30 : 150
    });

    if (!isDeleting && text === fullText) {
      setTimeout(
        () =>
          this.setState({
            isDeleting: true
          }),
        500
      );
    } else if (isDeleting && text === "") {
      this.setState({
        isDeleting: false,
        loopNum: loopNum + 1
      });
    }

    setTimeout(this.handleType, typingSpeed);
  };

  render() {
    const classes = this.props.light ? "light signup" : "signup";
    const url =
      "https://gmail.us20.list-manage.com/subscribe/post?u=c628c648d6564223ae86c85b9&amp;id=d626b4e39f";
    return (
      <span className={classes}>
        <p className='title'>Join the experience</p>
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <CustomForm
              status={status}
              message={message}
              light={this.props.light}
              onValidated={formData => subscribe(formData)}
              type={this.state.text}
            />
          )}
        />
      </span>
    );
  }
}

export default Signup;

import Array "mo:core/Array";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
  };

  var submissions : [ContactSubmission] = [];

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      message;
    };
    submissions := submissions.concat([submission]);
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    submissions;
  };
};

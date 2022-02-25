class InterViewQuestions {
  final String questionId;
  final String statement;
  final int timeToThink;
  final int timeToAnswer;
  InterViewQuestions({
    required this.questionId,
    required this.statement,
    required this.timeToAnswer,
    required this.timeToThink,
  });
}

class Session {
  String interviewId;
  String jobListingId;
  String positionName;
  String email;
  String name;
  String phoneCode;
  String phoneNumber;
  List<InterViewQuestions> questions;

  Session({
    required this.interviewId,
    required this.jobListingId,
    required this.positionName,
    required this.email,
    required this.name,
    required this.phoneCode,
    required this.phoneNumber,
    required this.questions,
  });
}

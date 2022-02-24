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
  final String interviewId;
  final String jobListingId;
  final String positionName;
  final String email;
  final String name;
  final String phoneCode;
  final String phoneNumber;
  final List<InterViewQuestions> questions;

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

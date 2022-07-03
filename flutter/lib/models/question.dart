class Question {
  final String titleQuestion;
  final int answerTime;
  final int thinkingTime;
  final String keywords;
  List<String> keywordsList = [];

  Question({
    required this.titleQuestion,
    required this.answerTime,
    required this.thinkingTime,
    required this.keywords,
  });
}

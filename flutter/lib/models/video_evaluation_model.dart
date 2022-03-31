class VideoEvaluation {
  final String question;
  final String videoUrl;
  final double score;
  final double manualEvaluation;
  final double openPose;
  final double happy;
  final double sad;
  final double angry;
  final double surprise;
  final double neutral;
  //Emotions emotions;
  VideoEvaluation({
    required this.question,
    required this.videoUrl,
    required this.manualEvaluation,
    required this.openPose,
    required this.score,
    required this.happy,
    required this.sad,
    required this.angry,
    required this.surprise,
    required this.neutral,
    //required this.emotions,
  });
}

class Emotion {
  final String emotionType;
  final double emotionPr;

  Emotion({
    required this.emotionType,
    required this.emotionPr,
  });
}

class Candidate {
  String name;
  String email;
  String phoneCode;
  String phoneNumber;
  String id;
  String submitedAt;
  double avgManualEvaluation;
  double avgRecommendation;

  Candidate(
      {required this.name,
      required this.email,
      required this.phoneCode,
      required this.phoneNumber,
      required this.id,
      required this.submitedAt,
      required this.avgManualEvaluation,
      required this.avgRecommendation});
}

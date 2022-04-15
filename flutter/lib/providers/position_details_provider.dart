import 'dart:convert';
import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:test/local/urls.dart';
import 'package:test/widgets/candidate_info_item.dart';

import '../local/http_exception.dart';
import '../models/question.dart';
import 'package:http/http.dart' as http;
import '../models/candidate.dart';
import '../models/video_evaluation_model.dart';

class PostionDetails with ChangeNotifier {
  final String? _authToken;
  List<Question> _items = [];
  List<Candidate> _candidates = [];
  List<VideoEvaluation> _videoEvaluation = [];
  List evaluates = [];
  Candidate _candidate = Candidate(
      name: "",
      email: "",
      phoneCode: "",
      phoneNumber: '',
      id: '',
      submitedAt: '',
      avgManualEvaluation: 0,
      avgRecommendation: 0);

  PostionDetails(
    this._authToken,
    this._items,
  );

  Candidate get candidateInfo {
    inspect(_candidate);
    return _candidate;
  }

  List<Question> get items {
    return [..._items];
  }

  List<Candidate> get cacandidates {
    return [..._candidates];
  }

  List<VideoEvaluation> get videoEvaluation {
    return [..._videoEvaluation];
  }

  DateTime? expiry;
  DateTime? get expiryDate {
    return expiry;
  }

  Future<void> getDetails(String id) async {
    final response = await http.get(
      Uri.parse('$hrURL/job-listing/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': _authToken.toString(),
      },
    );
    final responseData = json.decode(response.body);
    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      final extractedData = responseData['questions'] as List<dynamic>;
      expiry = DateTime.parse(responseData['expiryDate']);
      final List<Question> _finalList = [];
      extractedData
          .map((positionvalue) => _finalList.add(Question(
                titleQuestion: positionvalue['statement'],
                answerTime: positionvalue['timeToAnswer'],
                thinkingTime: positionvalue['timeToThink'],
                keywords: positionvalue['keywords'].toString(),
                id: positionvalue['questionId'],
              )))
          .toList();
      _items = _finalList.toList();
      final candidateData = responseData['interviews'] as List<dynamic>;
      final List<Candidate> _finalcandidateList = [];
      candidateData
          .map(
            (candidatevalue) => _finalcandidateList.add(
              Candidate(
                email: candidatevalue['email'],
                id: candidatevalue['interviewId'],
                name: candidatevalue['name'],
                phoneCode: candidatevalue['phoneCode'],
                phoneNumber: candidatevalue['phoneNumber'],
                submitedAt: candidatevalue['submitedAt'],
                avgManualEvaluation:
                    candidatevalue['avgManualEvaluation'].toDouble(),
                avgRecommendation:
                    candidatevalue['avgRecommendation'].toDouble(),
              ),
            ),
          )
          .toList();
      _candidates = _finalcandidateList.toList();

      notifyListeners();
    } else {
      throw HttpException(responseData['message']);
    }
  }

  Future<void> getEvaluationDetails(String interviewid) async {
    final response = await http.get(
      Uri.parse('$hrURL/job-listing/answers/$interviewid'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': _authToken.toString(),
      },
    );
    final responseData = json.decode(response.body);

    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      final extractedData = responseData['questions'] as List<dynamic>;
      final List<VideoEvaluation> _finalVideoList = [];

      // final m = Candidate(
      //   email: responseData['email'],
      //   id: responseData['interviewId'],
      //   name: responseData['name'],
      //   phoneCode: responseData['phoneCode'],
      //   phoneNumber: responseData['phoneNumber'],
      //   submitedAt: responseData['submitedAt'],
      //   avgManualEvaluation: responseData['avgManualEvaluation'].toDouble(),
      //   avgRecommendation: responseData['avgScore'].toDouble(),
      // );
      // inspect(m);
      // _candidate = m;
      _candidate.name = responseData['name'];
      _candidate.email = responseData['email'];
      _candidate.phoneCode = responseData['phoneCode'];
      _candidate.phoneNumber = responseData['phoneNumber'];
      _candidate.submitedAt = responseData['submitedAt'];
      _candidate.id = interviewid;
      _candidate.avgManualEvaluation =
          responseData['avgManualEvaluation'].toDouble();
      _candidate.avgRecommendation = responseData['avgScore'].toDouble();
      extractedData
          .map(
            (vedioev) => _finalVideoList.add(
              VideoEvaluation(
                questionId: vedioev['questionId'],
                question: vedioev['statement'],
                videoUrl: vedioev['link'],
                manualEvaluation: vedioev['manualEvaluation'].toDouble(),
                openPose: vedioev['openPose'].toDouble(),
                score: vedioev['score'].toDouble(),
                angry: vedioev['emotions']['angry'].toDouble(),
                happy: vedioev['emotions']['happy'].toDouble(),
                neutral: vedioev['emotions']['neutral'].toDouble(),
                sad: vedioev['emotions']['sad'].toDouble(),
                surprise: vedioev['emotions']['surprise'].toDouble(),
              ),
            ),
          )
          .toList();
      _videoEvaluation = _finalVideoList.toList();
      // _candidate.avgManualEvaluation = _videoEvaluation[0]['manualEvaluation'];
      inspect(_videoEvaluation);
      notifyListeners();
    } else {
      throw HttpException(responseData['message']);
    }
  }

  Future<void> manualEvalation(
      List<String> questionsIds, List<String> rate, String interviewid) async {
    for (var i = 0; i < questionsIds.length; i++) {
      evaluates.add(
          {'questionId': questionsIds[i], 'evaluation': double.parse(rate[i])});
    }
    final response = await http.post(
      Uri.parse('$hrURL/job-listing/evaluate/$interviewid'),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': _authToken.toString(),
      },
      body: json.encode({
        'evaluations': evaluates,
      }),
    );
    final responseData = json.decode(response.body);

    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      notifyListeners();
    } else {
      throw HttpException(responseData['message']);
    }
    evaluates = [];
  }
}

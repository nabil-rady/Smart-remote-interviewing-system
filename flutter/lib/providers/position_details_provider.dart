import 'dart:convert';
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
  Candidate _candidate = Candidate(
      name: "",
      email: "",
      phoneCode: "",
      phoneNumber: '',
      id: '',
      submitedAt: '');

  PostionDetails(
    this._authToken,
    this._items,
  );

  Candidate get candidateInfo {
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
      //Uri.parse('http://10.0.2.2:8001/job-listing/$id'),
      Uri.parse('$jobListing/$id'),
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
      _items = _finalList.reversed.toList();
      print(responseData['interviews']);
      final candidateData = responseData['interviews'] as List<dynamic>;
      final List<Candidate> _finalcandidateList = [];
      candidateData
          .map((candidatevalue) => _finalcandidateList.add(Candidate(
                email: candidatevalue['email'],
                id: candidatevalue['interviewId'],
                name: candidatevalue['name'],
                phoneCode: candidatevalue['phoneCode'],
                phoneNumber: candidatevalue['phoneNumber'],
                submitedAt: candidatevalue['submitedAt'],
              )))
          .toList();
      _candidates = _finalcandidateList.reversed.toList();

      notifyListeners();
    } else {
      throw HttpException(responseData['message']);
    }
  }

  Future<void> getEvaluationDetails(String interviewid) async {
    final response = await http.get(
      // Uri.parse('http://10.0.2.2:8001/job-listing/answers/$interviewid'),
      Uri.parse('$jobListing/answers/$interviewid'),
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
      _candidate.name = responseData['name'];
      _candidate.email = responseData['email'];
      _candidate.phoneCode = responseData['phoneCode'];
      _candidate.phoneNumber = responseData['phoneNumber'];
      _candidate.submitedAt = responseData['submitedAt'];
      _candidate.id = interviewid;
      extractedData
          .map(
            (vedioev) => _finalVideoList.add(
              VideoEvaluation(
                question: vedioev['statement'],
                videoUrl: vedioev['link'],
              ),
            ),
          )
          .toList();
      _videoEvaluation = _finalVideoList.reversed.toList();
      notifyListeners();
    } else {
      throw HttpException(responseData['message']);
    }
  }
}

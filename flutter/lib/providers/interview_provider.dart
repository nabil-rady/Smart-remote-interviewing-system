import 'package:flutter/material.dart';
import '../models/interview_model.dart';

class Interviews with ChangeNotifier {
  List<Interview> _items = [
    Interview(
        positionName: 'software engineer',
        id: '176',
        name: 'mohamed',
        email: 'm@m.com',
        phone: '01024051775',
        date: DateTime.now(),
        videoAnswers: [
          'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
          'https://images.all-free-download.com/footage_preview/mp4/airplane_water_plane_aeroboat_893.mp4',
          'https://images.all-free-download.com/footage_preview/mp4/architecture_skyscrapers_high_rises_606.mp4',
        ],
        rate: 3.5,
        isRated: true),
    Interview(
        positionName: 'call center',
        id: '345',
        name: 'reda',
        email: 'reda@m.com',
        phone: '01024056445',
        date: DateTime.now(),
        videoAnswers: [
          'https://images.all-free-download.com/footage_preview/mp4/architecture_skyscrapers_high_rises_606.mp4',
          'https://images.all-free-download.com/footage_preview/mp4/city_nights_party_view_lights_403.mp4',
          'https://images.all-free-download.com/footage_preview/mp4/mont_royal_montreal_canada_city_park_596.mp4'
        ],
        rate: 1,
        isRated: true),
    Interview(
      positionName: 'call center',
      id: '123',
      name: 'mariam',
      email: 'mariam@m.com',
      phone: '01023051445',
      date: DateTime.now(),
      videoAnswers: [
        'https://images.all-free-download.com/footage_preview/mp4/fireworks_sparkles_night_pyrotechnics_850.mp4',
        'https://images.all-free-download.com/footage_preview/mp4/airplane_water_plane_aeroboat_893.mp4',
        'https://images.all-free-download.com/footage_preview/mp4/city_nights_party_view_lights_403.mp4',
        // 'https://images.all-free-download.com/footage_preview/mp4/mont_royal_montreal_canada_city_park_596.mp4'
      ],
      rate: 0,
      isRated: false,
    ),
  ];
  List<Interview> get items {
    return [..._items];
  }

  void addAplicant(Interview member) {
    _items.add(member);
    notifyListeners();
  }

  Interview findById(String id) {
    return _items.firstWhere((element) => element.id == id);
  }

  void rateApplicant(String id, var rate) {
    Interview applicant = findById(id);
    applicant.rate = rate;
    applicant.isRated = true;
    notifyListeners();
  }

  int toBeEvaluate() {
    return _items.where((element) => element.isRated == false).toList().length;
  }
}

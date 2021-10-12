import 'package:provider/provider.dart';
import 'package:flutter/material.dart';
import '../models/applicant_model.dart';

class Applicants with ChangeNotifier {
  List<Applicant> _items = [
    Applicant(
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
    Applicant(
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
    Applicant(
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
  List<Applicant> get items {
    return [..._items];
  }

  void addAplicant(Applicant member) {
    _items.add(member);
    notifyListeners();
  }

  Applicant findById(String id) {
    return _items.firstWhere((element) => element.id == id);
  }

  void rateApplicant(String id, var rate) {
    Applicant applicant = findById(id);
    applicant.rate = rate;
    applicant.isRated = true;
    notifyListeners();
  }

  int toBeEvaluate() {
    return _items.where((element) => element.isRated == false).toList().length;
  }
}

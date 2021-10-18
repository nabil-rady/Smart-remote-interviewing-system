import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/interview_provider.dart';
import '../widgets/applicant_info_card.dart';
//لازم هتتغير بالبروفايدر بتاع مونيكا
import '../providers/position_provider.dart';

class ApplicantDetailScreen extends StatefulWidget {
  static const routeName = '/applicant_details';

  const ApplicantDetailScreen({Key? key}) : super(key: key);

  @override
  _ApplicantDetailScreenState createState() => _ApplicantDetailScreenState();
}

class _ApplicantDetailScreenState extends State<ApplicantDetailScreen> {
  @override
  Widget build(BuildContext context) {
    double _ratingValue;

    final interviewId = ModalRoute.of(context)!.settings.arguments as String;
    final loadedApplicant =
        Provider.of<Interviews>(context).findById(interviewId);
    // هيتغير برضو
    final _questions = Provider.of<Positions>(context)
        .findBypositionName(loadedApplicant.positionName);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Applicant Details'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Column(
        children: [
          ApplicanInfornationCard(loadedApplicant: loadedApplicant),
          RaisedButton(
            child: const Text('See Answers',
                style: TextStyle(color: Colors.white)),
            onPressed: () {
              Navigator.of(context)
                  .pushNamed('/video_evaluation', arguments: interviewId);
            },
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(30),
            ),
            color: Theme.of(context).primaryColor,
          ),
        ],
      ),
    );
  }
}

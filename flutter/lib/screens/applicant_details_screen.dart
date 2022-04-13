import 'package:flutter/material.dart';

import '../widgets/applicant_info_card.dart';
import '../local/http_exception.dart';
import '../local/sharedpreferences.dart';
import '../models/candidate.dart';

class ApplicantDetailScreen extends StatefulWidget {
  static const routeName = '/applicant_details';

  const ApplicantDetailScreen({Key? key}) : super(key: key);

  @override
  _ApplicantDetailScreenState createState() => _ApplicantDetailScreenState();
}

class _ApplicantDetailScreenState extends State<ApplicantDetailScreen> {
  var _isLoading = false;
  late Candidate candidate;
  Future<void> _submit() async {
    setState(() {
      _isLoading = true;
    });
    try {
      print('*********************************************');
      print(candidate.id);
      await getAnswerDetails(context, candidate.id).then((value) {
        Navigator.of(context)
            .pushReplacementNamed("/video_evaluation", arguments: candidate.id);
      });
    } on HttpException catch (error) {
      showErrorDialog(
          context, "Could not loead answers, Please try again later.", true);

      setState(() {
        _isLoading = false;
      });
    } catch (error) {
      print(error);
      const errorMessage = 'Could not loead answers, Please try again later';
      showErrorDialog(context, errorMessage, true);

      setState(() {
        _isLoading = false;
      });
    }
    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    candidate = ModalRoute.of(context)!.settings.arguments as Candidate;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Applicant Details'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Column(
        children: [
          ApplicanInfornationCard(loadedApplicant: candidate),
          _isLoading
              ? CircularProgressIndicator(
                  color: Theme.of(context).primaryColor,
                )
              : RaisedButton(
                  child: const Text('See Answers',
                      style: TextStyle(color: Colors.white)),
                  onPressed: _submit,
                  //() {
                  //   // getAnswerDetails(context, applicantId)
                  //   // Navigator.of(context)
                  //   //     .pushNamed('/video_evaluation', arguments: interviewId);
                  // },
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

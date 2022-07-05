import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:test/local/http_exception.dart';
import 'package:test/local/sharedpreferences.dart';
import 'package:test/providers/position_details_provider.dart';
import '../models/candidate.dart';
import 'package:intl/intl.dart';

class ApplicantCard extends StatelessWidget {
  // final String applicantId;
  // final String applicantName;
  // final DateTime date;
  Candidate candidate;
  String positionId;
  ApplicantCard(this.candidate, this.positionId);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () async {
        try {
          ///////////////////////////////////////////////////////////////////////////////

          showDialog(
              // The user CANNOT close this dialog  by pressing outsite it
              barrierDismissible: false,
              context: context,
              builder: (_) {
                return Dialog(
                  // The background color
                  backgroundColor: Colors.white,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 20),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: const [
                        // The loading indicator
                        CircularProgressIndicator(color: Color(0xFF165DC0)),
                        SizedBox(
                          height: 15,
                        ),
                        // Some text
                        Text('Loading...')
                      ],
                    ),
                  ),
                );
              });
          await Provider.of<PostionDetails>(context, listen: false)
              .getEvaluationDetails(candidate.id)
              .then((value) {
            candidate = Provider.of<PostionDetails>(context, listen: false)
                .candidateInfo;
            Navigator.of(context).pop();
            Navigator.of(context)
                .pushNamed('/applicant_details', arguments: candidate);
            // inspect(candidate);
          });
        } on HttpException catch (error) {
          showErrorDialog(context,
              "Could not loead results, Please try again later.", true);
        } catch (error) {
          const errorMessage =
              'Could not loead results, Please try again later';
          showErrorDialog(context, errorMessage, true);
        }
      },
      child: Padding(
        padding: const EdgeInsets.only(top: 8.0),
        child: Card(
          margin: const EdgeInsets.symmetric(
            horizontal: 15,
            vertical: 4,
          ),
          child: Row(
            children: [
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: ListTile(
                    title: Text(candidate.name),
                    subtitle: Text(
                      'Interview Date: ' +
                          DateFormat.yMd()
                              .add_jm()
                              .format(DateTime.parse(candidate.submitedAt)) +
                          '\n'
                              'Score: ' +
                          candidate.avgRecommendation.toStringAsFixed(3),
                      style: const TextStyle(fontSize: 16),
                    ),

                    // leading: Text(candidate.avgRecommendation.toString()),
                  ),
                ),
              ),
              const Padding(
                padding: EdgeInsets.all(8),
                child: Icon(
                  Icons.open_in_new,
                  color: Colors.green,
                  size: 30.0,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}

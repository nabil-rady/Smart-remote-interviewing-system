import 'package:flutter/material.dart';
import '../models/candidate.dart';
import 'package:intl/intl.dart';

class ApplicantCard extends StatelessWidget {
  // final String applicantId;
  // final String applicantName;
  // final DateTime date;
  Candidate candidate;
  ApplicantCard(this.candidate);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.of(context)
            .pushNamed('/applicant_details', arguments: candidate);
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
                      'Interview date :' +
                          DateFormat.yMd()
                              .add_jm()
                              .format(DateTime.parse(candidate.submitedAt)),
                      style: const TextStyle(fontSize: 16),
                    ),
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

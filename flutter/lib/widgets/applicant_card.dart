import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class ApplicantCard extends StatelessWidget {
  final String applicantId;
  final String applicantName;
  final DateTime date;
  ApplicantCard(this.applicantId, this.applicantName, this.date);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.of(context)
            .pushNamed('/applicant_details', arguments: applicantId);
      },
      child: Card(
        margin: const EdgeInsets.symmetric(
          horizontal: 15,
          vertical: 4,
        ),
        child: Padding(
          padding: const EdgeInsets.all(8),
          child: ListTile(
            title: Text(applicantName),
            subtitle: Text(
              'Interview date :' + DateFormat.yMd().add_jm().format(date),
              style: const TextStyle(fontSize: 16),
            ),
          ),
        ),
      ),
    );
  }
}

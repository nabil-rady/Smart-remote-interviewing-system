import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../models/interview_model.dart';

class ApplicanInfornationCard extends StatelessWidget {
  const ApplicanInfornationCard({
    Key? key,
    required this.loadedApplicant,
  }) : super(key: key);

  final Interview loadedApplicant;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(15),
      height: 240,
      width: double.infinity,
      child: Card(
        elevation: 5,
        child: Padding(
          padding: const EdgeInsets.only(left: 10, bottom: 10, right: 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.only(top: 9),
                child: Text(
                  'Applicant Information',
                  style: Theme.of(context).textTheme.bodyText2,
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                'Name: ${loadedApplicant.name}',
                style: Theme.of(context).textTheme.bodyText1,
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                'position Name: ${loadedApplicant.positionName}',
                style: Theme.of(context).textTheme.bodyText1,
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                'Email: ${loadedApplicant.email}',
                style: Theme.of(context).textTheme.bodyText1,
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                'Phone: ${loadedApplicant.phone}',
                style: Theme.of(context).textTheme.bodyText1,
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                'Date: ${DateFormat.yMd().add_jm().format(loadedApplicant.date)}',
                style: Theme.of(context).textTheme.bodyText1,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

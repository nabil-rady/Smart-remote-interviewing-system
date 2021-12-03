import 'package:flutter/material.dart';

class DashboardItem extends StatelessWidget {
  final String positionName;
  final String expieryDate;
  // final double noOfCandidates;
  // final double noOfInterviews;
  DashboardItem({
    required this.positionName,
    required this.expieryDate,
    // required this.noOfCandidates,
    // required this.noOfInterviews
  });
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: <Widget>[
          Text(positionName),
          Row(
            children: <Widget>[Text('Expiery day : '), Text(expieryDate)],
          ),
          // Row(
          //   children: <Widget>[
          //     Text('Candidates : '),
          //     Text(noOfCandidates.toString())
          //   ],
          // ),
          // Row(
          //   children: <Widget>[
          //     Text('Interviews : '),
          //     Text(noOfInterviews.toString())
          //   ],
          // ),
        ],
      ),
    );
  }
}

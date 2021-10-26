import 'package:flutter/material.dart';

class CandidateInfoItem extends StatelessWidget {
  final String name;
  final String email;
  final String phoneNumber;
  CandidateInfoItem(
      {required this.email, required this.name, required this.phoneNumber});
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: <Widget>[Text(name), Text(email), Text(phoneNumber)],
      ),
    );
  }
}

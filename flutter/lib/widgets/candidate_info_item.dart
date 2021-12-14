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
      margin: const EdgeInsets.symmetric(
        horizontal: 15,
        vertical: 4,
      ),
      child: Padding(
        padding: const EdgeInsets.all(8),
        child: ListTile(
          title: Text(name),
          // trailing: Text(
          //   'email : ' + email,
          //   style: const TextStyle(fontSize: 16, color: Colors.grey),
          // ),
          subtitle: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Text(
                  'email : ' + email,
                  style: const TextStyle(fontSize: 16, color: Colors.grey),
                ),
                Text(
                  'Number : ' + phoneNumber,
                  style: const TextStyle(fontSize: 16, color: Colors.grey),
                ),
              ]),
        ),
      ),
    );
  }
}

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
          title: Text(
            name,
            style: TextStyle(fontSize: 20),
          ),
          // trailing: Text(
          //   'email : ' + email,
          //   style: const TextStyle(fontSize: 16, color: Colors.grey),
          // ),
          subtitle: Column(children: <Widget>[
            SizedBox(
              height: 15,
            ),
            Row(
              children: <Widget>[
                Text(
                  'email : ' + email,
                  style: const TextStyle(fontSize: 16, color: Colors.grey),
                ),
              ],
              mainAxisAlignment: MainAxisAlignment.start,
            ),
            SizedBox(
              height: 10,
            ),
            Row(
              children: <Widget>[
                Text(
                  'Number : ' + phoneNumber,
                  style: const TextStyle(
                    fontSize: 16,
                    color: Colors.grey,
                  ),
                ),
              ],
              mainAxisAlignment: MainAxisAlignment.end,
            ),
          ]),
        ),
      ),
    );
  }
}

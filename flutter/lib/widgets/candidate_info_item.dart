import 'package:flutter/material.dart';

class CandidateInfoItem extends StatelessWidget {
  final String name;
  final String email;
  final String phoneNumber;
  final String phoneCode;
  CandidateInfoItem(
      {required this.email,
      required this.name,
      required this.phoneCode,
      required this.phoneNumber});
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
            style:
                TextStyle(fontSize: 20, color: Theme.of(context).primaryColor),
            // style: TextStyle(fontSize: 20),
          ),
          // trailing: Text(
          //   'email : ' + email,
          //   style: const TextStyle(fontSize: 16, color: Colors.grey),
          // ),
          subtitle: Column(children: <Widget>[
            const SizedBox(
              height: 10,
            ),
            Row(
              children: <Widget>[
                Expanded(
                  child: Text(
                    'email : ' + email,
                    style: const TextStyle(fontSize: 16, color: Colors.grey),
                  ),
                ),
              ],
              mainAxisAlignment: MainAxisAlignment.start,
            ),
            const SizedBox(
              height: 10,
            ),
            Row(
              children: <Widget>[
                Text(
                  'Number : ' + phoneCode + " " + phoneNumber,
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

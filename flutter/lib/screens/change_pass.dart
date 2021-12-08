import 'package:flutter/material.dart';

class ChangePassScreen extends StatelessWidget {
  static const routeName = '/changePassScreen';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Change Password'),
        ),
        body: SingleChildScrollView(
          child: Card(
            elevation: 5,
            margin: EdgeInsets.all(40),
            child: Padding(
              padding: const EdgeInsets.all(15),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  TextField(
                    decoration: InputDecoration(hintText: 'Enter Old Password'),
                  ),
                  TextField(
                    decoration: InputDecoration(hintText: 'Enter Old Password'),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        RaisedButton(
                          child: const Text(
                            'Confirm',
                            style: const TextStyle(color: Colors.white),
                          ),
                          onPressed: () {
                            /// lsa al saving process ll password
                            Navigator.of(context).pop();
                          },
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                          color: Theme.of(context).primaryColor,
                        ),
                      ]),
                ],
              ),
            ),
          ),
        ));
  }
}

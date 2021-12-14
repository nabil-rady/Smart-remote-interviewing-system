import 'package:flutter/material.dart';

class ChangePassScreen extends StatefulWidget {
  static const routeName = '/changePassScreen';

  @override
  State<ChangePassScreen> createState() => _ChangePassScreenState();
}

class _ChangePassScreenState extends State<ChangePassScreen> {
  bool posFlag = false;

  bool validateTextField(String userInput) {
    if (userInput.isEmpty) {
      setState(() {
        posFlag = true;
      });
      return false;
    }
    setState(() {
      posFlag = false;
    });
    return true;
  }

  final _oldPasswordController = TextEditingController();

  final _newPasswordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Change Password'),
          backgroundColor: Color(0xFF165DC0),
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
                    controller: _oldPasswordController,
                    decoration: InputDecoration(
                      hintText: 'Enter Old Password',
                      errorText: posFlag ? 'Please enter Old Password' : null,
                      border: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.teal)),
                    ),
                  ),
                  TextField(
                    controller: _newPasswordController,
                    decoration: InputDecoration(
                      hintText: 'Enter New Password',
                      errorText: posFlag ? 'Please enter New Password' : null,
                      border: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.teal)),
                    ),
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

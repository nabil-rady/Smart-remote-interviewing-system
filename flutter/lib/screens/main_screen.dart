import 'package:flutter/material.dart';
import '../widgets/circle.dart';
import '../widgets/start_interview.dart';
import '../widgets/employer_auth.dart';

class CompanySignupScreen extends StatefulWidget {
  static const routeName = '/company_signup';
  @override
  _CompanySignupScreenState createState() => _CompanySignupScreenState();
}

class _CompanySignupScreenState extends State<CompanySignupScreen> {
  bool _isemployer = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const CirculeWidget(),
              if (!_isemployer) const StartIntrview(),
              if (_isemployer) EmployerAuth(),
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton.extended(
          label: Text(_isemployer ? 'Interview' : 'Register as employer'),
          onPressed: () {
            setState(() {
              if (_isemployer) {
                _isemployer = false;
              } else {
                _isemployer = true;
              }
            });
          },
          backgroundColor: Theme.of(context).primaryColor,
        ));
  }
}

import 'package:flutter/material.dart';
import 'package:graduation_project/screens/main_screen.dart';

class TokenExpiry extends StatelessWidget {
  //static const routename = '/token_expiry';
  const TokenExpiry({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Center(
            child: Text(
              "your session has expired please try to login again",
              textAlign: TextAlign.center,
            ),
          ),
          RaisedButton(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(30),
            ),
            color: Theme.of(context).primaryColor,
            onPressed: () =>
                Navigator.of(context).pushNamed(CompanySignupScreen.routeName),
            child: const Text(
              'Try to login',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}

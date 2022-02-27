import 'dart:developer';
import 'dart:ui';
import 'package:lottie/lottie.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../local/constants.dart';
import '../../providers/session_provider.dart';

class WelcomeScreen extends StatelessWidget {
  static const routeName = '/welcome_screen';

  const WelcomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final sessionData =
        Provider.of<SessionDetails>(context, listen: false).sessionData;
    // inspect(sessionData);
    return Scaffold(
      // body: Text(sessionData.email),
      body: Column(
        children: <Widget>[
          // Padding(
          //   padding: const EdgeInsets.only(top: 30.0),
          //   child: Lottie.asset('assets/lottie/welcome.json'),
          // ),
          const SizedBox(
            height: 30,
          ),
          Padding(
            padding: const EdgeInsets.all(40.0),
            child: Card(
              elevation: 10,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              child: Padding(
                padding: const EdgeInsets.all(15.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    RichText(
                      textAlign: TextAlign.center,
                      text: TextSpan(
                        text: 'Welcome ${sessionData.name} In ',
                        style:
                            const TextStyle(color: Colors.black, fontSize: 20),
                        children: const <TextSpan>[
                          TextSpan(
                              text: 'Vividly',
                              style: TextStyle(
                                  color: kPrimaryColor,
                                  fontWeight: FontWeight.bold)
                              //recognizer: _longPressRecognizer,
                              ),
                        ],
                      ),
                    ),
                    const Text('Let’s start interview!'),
                    RaisedButton(
                      child: const Text(
                        "Start Interview",
                        style: TextStyle(color: Colors.white),
                      ),
                      onPressed: () => Navigator.of(context)
                          .pushReplacementNamed("/intro_screen"),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30),
                      ),
                      color: Theme.of(context).primaryColor,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

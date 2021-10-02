import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

import './main_screen.dart';

class SplashScreen extends StatefulWidget {
  static const routeName = '/splash_screen';
  // const SplashScreen({Key key}) : super(key: key);

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: (5)),
      vsync: this,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Lottie.asset(
            'assets/lottie/73810-business-idea-animation.json',
            controller: _controller,
            height: MediaQuery.of(context).size.height * 2.5 / 3,
            animate: true,
            onLoaded: (composition) {
              _controller
                ..duration = composition.duration
                ..forward().whenComplete(() => Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                          builder: (context) => CompanySignupScreen()),
                    ));
            },
          ),
          Text(
            "LOL",
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Theme.of(context).primaryColor,
              fontWeight: FontWeight.bold,
              fontSize: 25.0,
            ),
          ),
        ],
      ),
    );
  }
}

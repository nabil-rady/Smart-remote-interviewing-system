import 'dart:async';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:provider/provider.dart';
import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';
import 'package:test/screens/notifications_screen.dart';

import '../local/sharedpreferences.dart';
import '../providers/auth_provider.dart';
import '../screens/home_screen.dart';
import '../screens/main_screen.dart';

class SplashScreen extends StatefulWidget {
  SplashScreen({
    Key? key,
  }) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    // noticication();
    super.initState();
    navigator();
  }

  noticication() {
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) async {
      print("onMessageOpenedApp: $message");
      Navigator.pushNamed(
        context,
        NotificationScreen.routeName,
      );
    });
  }

  navigator() async {
    if (getUserToken() != null) {
      Timer(const Duration(seconds: 3), () {
        Provider.of<Auth>(context, listen: false).autoLogin().then((value) =>
            Navigator.pushAndRemoveUntil(
                context,
                MaterialPageRoute(builder: (context) => HomeScreen()),
                (Route<dynamic> route) => false));
      });
    } else {
      Timer(const Duration(seconds: 3), () {
        Navigator.push(
          context,
          PageTransition(
            type: PageTransitionType.scale,
            duration: const Duration(seconds: 3),
            alignment: Alignment.topCenter,
            child: CompanySignupScreen(),
          ),
        );
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Hero(
            tag: 'assets/images/1.png',
            child: Center(
              child: Image.asset('assets/images/2.png'),
            ),
          ),
          Positioned(
            bottom: 70,
            left: 30,
            right: 30,
            child: Text(
              "Vividly",
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Theme.of(context).primaryColor,
                fontWeight: FontWeight.bold,
                fontSize: 29.0,
              ),
            ),
          )
        ],
      ),
    );
  }
}

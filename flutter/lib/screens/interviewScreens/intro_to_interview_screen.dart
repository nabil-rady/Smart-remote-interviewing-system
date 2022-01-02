import 'package:flutter/material.dart';
import 'package:graduation_project/screens/interviewScreens/intro_cam_screen.dart';
import '../../size_config.dart';
import '../../widgets/body.dart';

class IntroScreen extends StatelessWidget {
  static String routeName = "/intro_screen";
  @override
  Widget build(BuildContext context) {
    // You have to call it on your starting screen
    SizeConfig().init(context);
    return Scaffold(
      body: Body(),
      // body: (Center(
      //   child: RaisedButton(
      //     onPressed: () {
      //       Navigator.of(context)
      //           .pushReplacementNamed(IntroCamScreen.routeName);
      //     },
      //     child: Text('tap'),
      /// ),
      //  )),
    );
  }
}

import 'package:flutter/material.dart';
import '../size_config.dart';
import '../widgets/body.dart';

class IntroScreen extends StatelessWidget {
  static String routeName = "/intro_screen";
  @override
  Widget build(BuildContext context) {
    // You have to call it on your starting screen
    SizeConfig().init(context);
    return Scaffold(
      body: Body(),
    );
  }
}

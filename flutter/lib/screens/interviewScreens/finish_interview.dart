import 'package:flutter/material.dart';
import '/screens/main_screen.dart';
import 'package:lottie/lottie.dart';

class FinishInterview extends StatefulWidget {
  static const routeName = '/finish_screen';

  @override
  State<FinishInterview> createState() => _FinishInterviewState();
}

class _FinishInterviewState extends State<FinishInterview>
    with TickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: (5)),
      vsync: this,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
      children: [
        Lottie.asset(
          'assets/lottie/lf30_editor_t2cofpvp.json',
          controller: _controller,
          height: MediaQuery.of(context).size.height * 2.5 / 3,
          animate: true,
          onLoaded: (composition) {
            _controller
              ..duration = composition.duration
              ..forward().whenComplete(
                () => Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                      builder: (context) => CompanySignupScreen()),
                ),
              );
          },
        ),
        Text(
          "All Done",
          textAlign: TextAlign.center,
          style: TextStyle(
            color: Theme.of(context).primaryColor,
            fontWeight: FontWeight.bold,
            fontSize: 25.0,
          ),
        ),
      ],
    ));
  }
}

import 'package:flutter/material.dart';

class StartIntrview extends StatefulWidget {
  const StartIntrview({Key? key}) : super(key: key);

  @override
  _StartIntrviewState createState() => _StartIntrviewState();
}

class _StartIntrviewState extends State<StartIntrview> {
  final myController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.only(top: 150, left: 35, right: 35),
        child: Column(
          children: [
            TextField(
              controller: myController,
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Interview link',
              ),
              onSubmitted: (value) {
                Navigator.of(context).pushNamed("/intro_screen");
              },
            ),
            const SizedBox(
              height: 20,
            ),
            const Text(
              'Enter the intrview link that the company sent you or click the interview link to start',
              style: TextStyle(
                fontSize: 22,
                fontStyle: FontStyle.normal,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}

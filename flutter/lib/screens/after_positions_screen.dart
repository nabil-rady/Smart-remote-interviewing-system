import 'package:flutter/material.dart';

class AfterPositionsScreen extends StatelessWidget {
  static const routeName = '/after_positions_screen';
  const AfterPositionsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final positioName = ModalRoute.of(context)!.settings.arguments as String;
    return Scaffold(
      appBar: AppBar(
        title: Text(positioName),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Padding(
        padding: EdgeInsets.all(10),
        child: Column(
          children: [
            eachCard2('Position Details', 'assets/images/research.png', context,
                '/position_details_screen'),
            const SizedBox(
              height: 9,
            ),
            eachCard2('Evaluate applicants', 'assets/images/check.png', context,
                '/to_evaluate_screen'),
            const SizedBox(
              height: 9,
            ),
            eachCard2('Invate Applicant', 'assets/images/invitation.png',
                context, '/invitation_screen'),
          ],
        ),
      ),
    );
  }
}

Widget eachCard2(
  String title,
  String image,
  BuildContext context,
  String route,
) {
  return InkWell(
    onTap: () {
      Navigator.of(context).pushNamed(route);
    },
    child: Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15.0),
      ),
      elevation: 9,
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              width: 60,
              height: 60,
              child: Image.asset(image),
            ),
            Expanded(
              child: Text(
                title,
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    ),
  );
}

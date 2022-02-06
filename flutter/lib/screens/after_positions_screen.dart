import 'package:flutter/material.dart';
import 'package:graduation_project/screens/position_details_screen.dart';

class AfterPositionsScreen extends StatelessWidget {
  static const routeName = '/after_positions_screen';
  const AfterPositionsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final _position =
        ModalRoute.of(context)!.settings.arguments as List<String>;
    final _positioName = _position[0];
    //print(positioName);
    final _positionId = _position[1];
    //print(positionId);

    return Scaffold(
      appBar: AppBar(
        title: Text(_positioName),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Padding(
        padding: const EdgeInsets.all(10),
        child: Column(
          children: [
            // eachCard2('Position Details', 'assets/images/research.png', context,
            //     '/position_details_screen', _positionId, _positioName),
            InkWell(
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) =>
                        (PositionDetailScreen(positionId: _positionId))));
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
                        child: Image.asset('assets/images/research.png'),
                      ),
                      Expanded(
                        child: Text(
                          'Position Details',
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(
              height: 9,
            ),
            eachCard2('Evaluate applicants', 'assets/images/check.png', context,
                '/to_evaluate_screen', _positionId, _positioName),
            const SizedBox(
              height: 9,
            ),
            eachCard2('Invate Applicant', 'assets/images/invitation.png',
                context, '/invitation_screen', _positionId, _positioName),
          ],
        ),
      ),
    );
  }
}

Widget eachCard2(String title, String image, BuildContext context, String route,
    String postionId, String positionName) {
  return InkWell(
    onTap: () {
      Navigator.of(context)
          .pushNamed(route, arguments: [positionName, postionId]);
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

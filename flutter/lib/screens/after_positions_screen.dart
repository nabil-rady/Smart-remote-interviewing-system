import 'dart:developer';

import 'package:flutter/material.dart';
import '../screens/to_evaluate_screen.dart';
import '../screens/position_details_screen.dart';
import 'invitation_screen.dart';
import 'package:http/http.dart' as http;

class AfterPositionsScreen extends StatelessWidget {
  static const routeName = '/after_positions_screen';
  const AfterPositionsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final _position = ModalRoute.of(context)!.settings.arguments as List;
    final _positioName = _position[0];
    final _positionId = _position[1];
    final _positionDetails = _position[2];
    final _expieryDate = _position[3];
    return Scaffold(
      appBar: AppBar(
        title: Text(_positioName),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Padding(
        padding: const EdgeInsets.all(10),
        child: Column(
          children: [
            InkWell(
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => (PositionDetailScreen(
                      positionId: _positionId,
                      detailsFuture: _positionDetails,
                    )),
                  ),
                );
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
                      const Expanded(
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
            InkWell(
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => (ToEvaluateScreen(
                      positionId: _positionId,
                      detailsFuture: _positionDetails,
                    )),
                  ),
                );
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
                        child: Image.asset('assets/images/check.png'),
                      ),
                      const Expanded(
                        child: Text(
                          'Evaluate Applicants',
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            // eachCard2('Evaluate Applicants', 'assets/images/check.png', context,
            //     '/to_evaluate_screen', _positionId, _positioName),
            const SizedBox(
              height: 9,
            ),
            InkWell(
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => (InvitationScreen(
                        positionId: _positionId,
                        positionName: _positioName,
                        expieryDate: _expieryDate)),
                  ),
                );
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
                        child: Image.asset('assets/images/invitation.png'),
                      ),
                      const Expanded(
                        child: Text(
                          'Invite Applicant',
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            // eachCard2('Invite Applicant', 'assets/images/invitation.png',
            //     context, '/invitation_screen', _positionId, _positioName),
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

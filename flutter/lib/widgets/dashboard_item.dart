import 'dart:html';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:graduation_project/screens/after_positions_screen.dart';
import 'package:intl/intl.dart';

var list = [
  'assets/images/rand1.jpg',
  'assets/images/rand2.jpg',
  'assets/images/rand3.jpg',
  'assets/images/rand4.jpg',
  'assets/images/rand5.jpg',
  'assets/images/rand6.jpg',
  'assets/images/rand7.jpg',
  'assets/images/rand8.jpg',
  'assets/images/rand9.jpg',
  'assets/images/rand10.jpg',
];

T getRandomElement<T>(List<T> list) {
  final random = new Random();
  var i = random.nextInt(list.length);
  return list[i];
}

class DashboardItem extends StatelessWidget {
  final String positionName;
  final DateTime expieryDate;
  // final double noOfCandidates;
  // final double noOfInterviews;
  DashboardItem({
    required this.positionName,
    required this.expieryDate,
    // required this.noOfCandidates,
    // required this.noOfInterviews
  });
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        // Navigator.of(context)
        //     .pushNamed(InvitationScreen.routeName, arguments: position);
        Navigator.of(context).pushNamed('/after_positions_screen');
      },
      child: SizedBox(
        width: double.infinity,
        //height: double.minPositive,
        child: Padding(
          padding: const EdgeInsets.only(top: 50, right: 50, left: 50),
          child: Card(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(15.0),
            ),
            elevation: 5,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                SizedBox(
                  child: Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: ClipRRect(
                      borderRadius: BorderRadius.only(
                          bottomLeft: Radius.zero,
                          bottomRight: Radius.zero,
                          topLeft: Radius.circular(15),
                          topRight: Radius.circular(15)),
                      child: Image(
                          fit: BoxFit.cover,
                          width: double.infinity,
                          height: 100,
                          image: AssetImage(getRandomElement(list))),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      // Row(
                      //    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      //  children: [
                      ListTile(
                        leading:
                            // Padding(
                            //   padding: const EdgeInsets.only(
                            //       bottom: 4, top: 0, left: 2, right: 2),
                            //   child:
                            RichText(
                          overflow: TextOverflow.ellipsis,
                          maxLines: 1,
                          text: TextSpan(
                            text: positionName,
                            style: TextStyle(
                                color: Theme.of(context).primaryColor,
                                fontWeight: Theme.of(context)
                                    .textTheme
                                    .headline1!
                                    .fontWeight,
                                fontSize: Theme.of(context)
                                    .textTheme
                                    .bodyText2!
                                    .fontSize,
                                fontFamily: Theme.of(context)
                                    .textTheme
                                    .headline1!
                                    .fontFamily),
                          ),
                        ),
                        trailing: Card(
                          elevation: 20,
                          color: expieryDate.isBefore(DateTime.now())
                              ? Colors.red
                              : Colors.green,
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(50)),
                          child: Padding(
                              padding: const EdgeInsets.all(2),
                              child: expieryDate.isBefore(DateTime.now())
                                  ? Text("Expired",
                                      style: const TextStyle(
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold))
                                  : Text("Available",
                                      style: const TextStyle(
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold))),
                        ),
                      ),
                      // ],
                      //),
                      Padding(
                        padding: const EdgeInsets.all(6),
                        child: Row(
                          children: <Widget>[
                            Text(
                              'Expiery day : ',
                              style: TextStyle(
                                  color: Theme.of(context).primaryColor,
                                  fontWeight: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontWeight,
                                  fontSize: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontSize,
                                  fontFamily: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontFamily),
                            ),
                            Text(
                              DateFormat.yMMMd().format(expieryDate).toString(),
                              style: TextStyle(
                                  fontWeight: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontWeight,
                                  fontSize: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontSize,
                                  fontFamily: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontFamily),
                            )
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(3),
                        child: Row(
                          children: <Widget>[
                            Text(
                              'Candidates : ',
                              style: TextStyle(
                                  color: Theme.of(context).primaryColor,
                                  fontWeight: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontWeight,
                                  fontSize: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontSize,
                                  fontFamily: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontFamily),
                            ),
                            Text(
                              "Dummy",
                              style: TextStyle(
                                  fontWeight: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontWeight,
                                  fontSize: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontSize,
                                  fontFamily: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontFamily),
                            )
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(3),
                        child: Row(
                          children: <Widget>[
                            Text(
                              'Interviews : ',
                              style: TextStyle(
                                  color: Theme.of(context).primaryColor,
                                  fontWeight: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontWeight,
                                  fontSize: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontSize,
                                  fontFamily: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontFamily),
                            ),
                            Text(
                              'Dummy',
                              style: TextStyle(
                                  fontWeight: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontWeight,
                                  fontSize: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontSize,
                                  fontFamily: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .fontFamily),
                            )
                          ],
                        ),
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}

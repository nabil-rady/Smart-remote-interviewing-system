import 'dart:math';

import 'package:flutter/material.dart';

var list = [
  'assets/images/rand.jpg',
  'assets/images/rand1.jpg',
  'assets/images/rand2.jpg',
  'assets/images/rand3.jpg',
  'assets/images/rand4.jpg',
  'assets/images/rand5.jpg',
  'assets/images/rand6.jpg',
  'assets/images/rand7.jpg',
  'assets/images/rand8.jpg',
  'assets/images/rand9.jpg',
  'assets/images/rand10.jpg'
];

T getRandomElement<T>(List<T> list) {
  final random = new Random();
  var i = random.nextInt(list.length);
  return list[i];
}

class DashboardItem extends StatelessWidget {
  final String positionName;
  final String expieryDate;
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
    return SizedBox(
      width: double.infinity,
      height: 440,
      child: Padding(
        padding: const EdgeInsets.all(50),
        child: Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
          ),
          elevation: 5,
          child: Padding(
            padding: const EdgeInsets.all(15),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                SizedBox(
                  child: Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(15),
                      child: Image(
                        fit: BoxFit.cover,
                        width: double.infinity,
                        height: 175,
                        image: AssetImage(getRandomElement(list)),
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    positionName,
                    style: TextStyle(
                        color: Theme.of(context).primaryColor,
                        fontWeight:
                            Theme.of(context).textTheme.headline1!.fontWeight,
                        fontSize:
                            Theme.of(context).textTheme.bodyText2!.fontSize,
                        fontFamily:
                            Theme.of(context).textTheme.headline1!.fontFamily),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(3),
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
                            fontSize:
                                Theme.of(context).textTheme.bodyText1!.fontSize,
                            fontFamily: Theme.of(context)
                                .textTheme
                                .bodyText1!
                                .fontFamily),
                      ),
                      Text(
                        expieryDate,
                        style: TextStyle(
                            fontWeight: Theme.of(context)
                                .textTheme
                                .bodyText1!
                                .fontWeight,
                            fontSize:
                                Theme.of(context).textTheme.bodyText1!.fontSize,
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
                            fontSize:
                                Theme.of(context).textTheme.bodyText1!.fontSize,
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
                            fontSize:
                                Theme.of(context).textTheme.bodyText1!.fontSize,
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
                            fontSize:
                                Theme.of(context).textTheme.bodyText1!.fontSize,
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
                            fontSize:
                                Theme.of(context).textTheme.bodyText1!.fontSize,
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
          ),
        ),
      ),
    );
  }
}

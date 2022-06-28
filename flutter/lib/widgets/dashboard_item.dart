import 'dart:math';

import 'package:flutter/material.dart';
import '../local/sharedpreferences.dart';
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
  final random = Random();
  var i = random.nextInt(list.length);
  return list[i];
}

class DashboardItem extends StatelessWidget {
  final String positionName;
  final DateTime expieryDate;
  final int candidates;
  final int interviews;
  final String positionId;

  DashboardItem({
    required this.positionName,
    required this.expieryDate,
    required this.candidates,
    required this.interviews,
    required this.positionId,
  });
  @override
  Widget build(BuildContext context) {
    late Future detailsFuture;
    return InkWell(
      onTap: () {
        detailsFuture = getPositionDetails(context, positionId);
        Navigator.of(context).pushNamed('/after_positions_screen',
            arguments: [positionName, positionId, detailsFuture, expieryDate]);
      },
      child: Padding(
        padding: const EdgeInsets.only(top: 20, right: 20, left: 20),
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
                    borderRadius: const BorderRadius.only(
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
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Container(
                            constraints: const BoxConstraints(
                              maxHeight: double.infinity,
                            ),
                            width: double.infinity,
                            child: Padding(
                              padding: const EdgeInsets.only(right: 8, left: 8),
                              child: Text(
                                positionName,
                                style: TextStyle(
                                    color: Theme.of(context).primaryColor,
                                    fontWeight: FontWeight.bold),
                              ),
                            ),
                          ),
                        ),
                        Card(
                          color: expieryDate.isBefore(DateTime.now())
                              ? Colors.red
                              : Colors.green,
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(50)),
                          child: Padding(
                              padding: const EdgeInsets.all(9),
                              child: expieryDate.isBefore(DateTime.now())
                                  ? const Text("Expired",
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 18))
                                  : const Text("Available",
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 18))),
                        ),
                      ],
                    ),
                    Padding(
                      padding:
                          const EdgeInsets.only(right: 8, left: 8, bottom: 5),
                      child: Row(
                        children: <Widget>[
                          Text(
                            'Expiery day: ',
                            style: TextStyle(
                              fontSize: 17,
                              color: Theme.of(context).primaryColor,
                            ),
                          ),
                          Text(
                            DateFormat.yMMMd().format(expieryDate).toString(),
                            style: const TextStyle(
                              fontSize: 17,
                            ),
                          )
                        ],
                      ),
                    ),
                    Padding(
                      padding:
                          const EdgeInsets.only(right: 8, left: 8, bottom: 5),
                      child: Row(
                        children: <Widget>[
                          Text(
                            'Candidates: ',
                            style: TextStyle(
                              fontSize: 17,
                              color: Theme.of(context).primaryColor,
                            ),
                          ),
                          Text(
                            candidates.toString(),
                            style: const TextStyle(
                              fontSize: 17,
                            ),
                          )
                        ],
                      ),
                    ),
                    Padding(
                      padding:
                          const EdgeInsets.only(right: 8, left: 8, bottom: 8),
                      child: Row(
                        children: <Widget>[
                          Text('Interviews: ',
                              style: TextStyle(
                                fontSize: 17,
                                color: Theme.of(context).primaryColor,
                              )),
                          Text(
                            interviews.toString(),
                            style: const TextStyle(
                              fontSize: 17,
                            ),
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
    );
  }
}

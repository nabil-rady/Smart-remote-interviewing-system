import 'dart:html';

import 'package:flutter/material.dart';

import '../providers/auth_provider.dart';
import 'package:provider/provider.dart';

class ProfileScreen extends StatelessWidget {
  static const routeName = '/profile_screen';

  @override
  Widget build(BuildContext context) {
    final employerData = Provider.of<Auth>(context).employer;
    return Scaffold(
        appBar: AppBar(
          title: Text('name of employer'),
        ),
        body: Card(
            child: Column(children: <Widget>[
          Text(
            'Profile Info',
            style: TextStyle(
              color: Theme.of(context).primaryColor,
              fontSize: Theme.of(context).textTheme.bodyText2!.fontSize,
              fontFamily: Theme.of(context).textTheme.headline1!.fontFamily,
              fontWeight: Theme.of(context).textTheme.headline1!.fontWeight,
            ),
            //  textAlign: TextAlign.center,
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                'FirstName',
                style: TextStyle(
                  color: Theme.of(context).primaryColor,
                  fontSize: Theme.of(context).textTheme.headline1!.fontSize,
                  fontFamily: Theme.of(context).textTheme.headline1!.fontFamily,
                  // fontWeight: Theme.of(context).textTheme.headline1!.fontWeight,
                ),
              ),
              Text(
                employerData.firstName,
              ),
              Divider(),
              Text(
                'Last Name',
                style: TextStyle(
                  color: Theme.of(context).primaryColor,
                  fontSize: Theme.of(context).textTheme.headline1!.fontSize,
                  fontFamily: Theme.of(context).textTheme.headline1!.fontFamily,
                  // fontWeight: Theme.of(context).textTheme.headline1!.fontWeight,
                ),
              ),
              Text(employerData.lastName),
              Divider(),
              Text(
                'Company Name',
                style: TextStyle(
                  color: Theme.of(context).primaryColor,
                  fontSize: Theme.of(context).textTheme.headline1!.fontSize,
                  fontFamily: Theme.of(context).textTheme.headline1!.fontFamily,
                  // fontWeight: Theme.of(context).textTheme.headline1!.fontWeight,
                ),
              ),
              Text(employerData.companyName),
              Divider(),
              Text(
                'Email',
                style: TextStyle(
                  color: Theme.of(context).primaryColor,
                  fontSize: Theme.of(context).textTheme.headline1!.fontSize,
                  fontFamily: Theme.of(context).textTheme.headline1!.fontFamily,
                  // fontWeight: Theme.of(context).textTheme.headline1!.fontWeight,
                ),
              ),
              Text(employerData.email),
              Divider(),
              Text(
                'Phone Number',
                style: TextStyle(
                  color: Theme.of(context).primaryColor,
                  fontSize: Theme.of(context).textTheme.headline1!.fontSize,
                  fontFamily: Theme.of(context).textTheme.headline1!.fontFamily,
                  // fontWeight: Theme.of(context).textTheme.headline1!.fontWeight,
                ),
              ),
              Text(employerData.phone),
              Divider(),
            ],
          ),
        ])));
  }
}

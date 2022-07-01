import 'dart:async';
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import '../local/sharedpreferences.dart';
import '../providers/auth_provider.dart';
import '../screens/main_screen.dart';

import '../screens/position_screen.dart';
import '../screens/profile_screen.dart';
import '../screens/waiting_screen.dart';
import 'package:provider/provider.dart';

class AppDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final employerData = Provider.of<Auth>(context, listen: false).employer;
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          GestureDetector(
            onTap: () {
              employerData.emailConfirmed && employerData.loggedIn
                  ? Navigator.of(context).pushNamed(ProfileScreen.routeName)
                  : null;
            },
            child: UserAccountsDrawerHeader(
              accountName: Text(employerData.firstName),
              accountEmail: Text(employerData.email),
              currentAccountPicture: CircleAvatar(
                child: Text(
                  employerData.firstName[0].capitalized(),
                  style: const TextStyle(fontSize: 40),
                ),
                backgroundColor: Theme.of(context).canvasColor,
                foregroundColor: Theme.of(context).primaryColor,
              ),
              decoration: BoxDecoration(color: Theme.of(context).primaryColor),
            ),
          ),
          _buildListTile(Icons.notifications, 'Notifications', () {
            employerData.loggedIn && employerData.emailConfirmed
                ? Navigator.of(context).pushNamed('/notification_screen')
                : null;
          }, employerData.loggedIn, employerData.emailConfirmed),
          const Divider(),
          _buildListTile(
              Icons.dashboard,
              'Dashboard',
              () => Navigator.of(context).pushReplacementNamed('/home_screen'),
              employerData.loggedIn,
              employerData.emailConfirmed),
          const Divider(),
          _buildListTile(Icons.app_registration_sharp, 'Job positions', () {
            employerData.emailConfirmed
                ? Navigator.of(context)
                    .pushReplacementNamed(PositionScreen.routeName)
                : null;
          }, employerData.loggedIn, employerData.emailConfirmed),
          const Divider(),
          if (employerData.loggedIn)
            _buildListTile(Icons.exit_to_app, 'Log out', () async {
              Provider.of<Auth>(context, listen: false).logOut().then((value) {
                Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(
                        builder: (context) => CompanySignupScreen()),
                    (Route<dynamic> route) => false);
              });
            }, employerData.loggedIn, true),
        ],
      ),
    );
  }
}

Widget _buildListTile(IconData iconLeading, String title,
    GestureTapCallback ontap, bool loggedin, bool emailconfirmed) {
  return ListTile(
    leading: Icon(
      iconLeading,
      color: loggedin && emailconfirmed ? const Color(0xFF165DC0) : Colors.grey,
    ),
    title: Text(title),
    onTap: ontap,
  );
}

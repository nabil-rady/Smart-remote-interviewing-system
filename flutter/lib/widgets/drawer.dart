import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:graduation_project/providers/auth_provider.dart';

import 'package:graduation_project/screens/position_screen.dart';
import 'package:graduation_project/screens/profile_screen.dart';
import 'package:provider/provider.dart';

class AppDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          GestureDetector(
            onTap: () {
              Navigator.of(context).pushNamed(ProfileScreen.routeName);
            },
            child: UserAccountsDrawerHeader(
              accountName: Text('Mariam'),
              accountEmail: Text('mariammohammad390@gmail.com'),
              currentAccountPicture: CircleAvatar(
                child: Text(
                  'M',
                  style: TextStyle(fontSize: 40),
                ),
                backgroundColor: Theme.of(context).canvasColor,
                foregroundColor: Theme.of(context).primaryColor,
              ),
              decoration: BoxDecoration(color: Theme.of(context).primaryColor),
            ),
          ),
          _buildListTile(
              Icons.notifications,
              'Notifications',
              () => Navigator.of(context)
                  .pushReplacementNamed('/notification_screen')),
          const Divider(),
          _buildListTile(Icons.dashboard, 'Dashboard',
              () => Navigator.of(context).pushNamed('/home_screen')),
          const Divider(),
          _buildListTile(Icons.app_registration_sharp, 'Job positions', () {
            Navigator.of(context)
                .pushReplacementNamed(PositionScreen.routeName);
          }),
          const Divider(),
          _buildListTile(Icons.exit_to_app, 'Log out', () {
            Navigator.pop(context);
            Navigator.of(context).pushReplacementNamed('/company_signup');
            Provider.of<Auth>(context, listen: false).logOut();
          }),
        ],
      ),
    );
  }
}

Widget _buildListTile(
  IconData iconLeading,
  String title,
  GestureTapCallback ontap,
) {
  return ListTile(
    leading: Icon(
      iconLeading,
      color: const Color(0xFF165DC0),
    ),
    title: Text(title),
    onTap: ontap,
  );
}

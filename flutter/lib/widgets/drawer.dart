import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';

class AppDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          UserAccountsDrawerHeader(
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
          _buildListTile(
              Icons.dashboard,
              'Dashboard',
              () => Navigator.of(context)
                  .pushReplacementNamed('/employer-dashboard')),
          const Divider(),
          _buildListTile(
              Icons.app_registration_sharp,
              'Job positions',
              () => Navigator.of(context)
                  .pushReplacementNamed('/positions_screen')),
          const Divider(),
          _buildListTile(
              Icons.people_alt_outlined,
              'To evaluate',
              () => Navigator.of(context)
                  .pushReplacementNamed('/to_evaluate_screen')),
          const Divider(),
          _buildListTile(Icons.exit_to_app, 'Log out', () {
            Navigator.pop(context);
            Navigator.of(context).pushReplacementNamed('/company_signup');
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
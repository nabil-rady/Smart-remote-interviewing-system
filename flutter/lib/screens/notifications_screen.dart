import 'package:flutter/material.dart';
import '../widgets/drawer.dart';

class NotificationScreen extends StatelessWidget {
  const NotificationScreen({Key? key}) : super(key: key);
  static const routeName = '/notification_screen';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).primaryColor,
        title: const Text('Natifications'),
      ),
      drawer: AppDrawer(),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Center(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                'assets/images/notification-bell.png',
                height: 120,
                width: 120,
              ),
              const SizedBox(
                height: 20,
              ),
              const Text(
                'No notifications yet',
                style:
                    TextStyle(fontWeight: FontWeight.bold, color: Colors.grey),
              ),
              const Text(
                'When you get notifications, they\'ll show up here',
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.grey,
                ),
                textAlign: TextAlign.center,
              ),
              RaisedButton(
                child: const Text(
                  'Refresh',
                  style: TextStyle(color: Colors.white),
                ),
                onPressed: () {},
                // Navigator.of(context).pushNamed(EmployerScreen.routeName);

                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                color: Theme.of(context).primaryColor,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:test/local/sharedpreferences.dart';
import 'package:test/providers/notification_provider.dart';
import 'package:test/widgets/helper_widget.dart';
import '../widgets/drawer.dart';

class NotificationScreen extends StatefulWidget {
  const NotificationScreen({Key? key}) : super(key: key);
  static const routeName = '/notification_screen';

  @override
  State<NotificationScreen> createState() => _NotificationScreenState();
}

class _NotificationScreenState extends State<NotificationScreen> {
  late Future _notificationsFuture;

  @override
  void initState() {
    Future.delayed(const Duration(microseconds: 0));
    _notificationsFuture = getNotificationssFuture(context);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).primaryColor,
          title: const Text('Natifications'),
        ),
        // drawer: AppDrawer(),
        body: FutureBuilder(
            future: _notificationsFuture,
            builder: (ctx, dataSnapshot) {
              if (dataSnapshot.connectionState == ConnectionState.waiting) {
                return const Center(
                    child: CircularProgressIndicator(color: Color(0xFF165DC0)));
              } else {
                if (dataSnapshot.error != null) {
                  // ...
                  // Do error handling stuff
                  String error = dataSnapshot.error.toString();
                  if (error.contains('The json web token has expired')) {
                    return TokenExpiry();
                  }
                  return const Center(
                    child: Text('An error occurred!'),
                  );
                } else {
                  return Consumer<Notifications>(
                    builder: (ctx, notificationData, child) => notificationData
                            .notifications.isEmpty
                        ? Padding(
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
                                    style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        color: Colors.grey),
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
                                    onPressed: () {
                                      Navigator.pushReplacement(
                                          context,
                                          MaterialPageRoute(
                                              builder: (BuildContext context) =>
                                                  super.widget));
                                    },
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(30),
                                    ),
                                    color: Theme.of(context).primaryColor,
                                  ),
                                ],
                              ),
                            ),
                          )
                        : ListView.builder(
                            itemCount: notificationData.notifications.length,
                            itemBuilder: (ctx, i) => Card(
                              child:
                                  Text(notificationData.notifications[i].body),
                            ),
                          ),
                  );
                }
              }
            }));
  }
}

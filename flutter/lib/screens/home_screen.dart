import 'package:flutter/material.dart';
import 'package:graduation_project/widgets/drawer.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);
  static const routeName = '/home_screen';
  @override
  Widget build(BuildContext context) {
    final employerData = Provider.of<Auth>(context).employer;

    return Scaffold(
      appBar: AppBar(),
      drawer: AppDrawer(),
      body: Center(
        child: Text(employerData.firstName),
      ),
    );
  }
}

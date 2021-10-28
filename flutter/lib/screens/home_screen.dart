import 'dart:developer';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:graduation_project/models/http_exception.dart';
import 'package:graduation_project/widgets/drawer.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);
  static const routeName = '/home_screen';

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    final employerData = Provider.of<Auth>(context).employer;
    final GlobalKey<FormState> _confirmFormKey = GlobalKey();
    String confirmCode = '';
    var confirm = employerData.emailConfirmed;

    void _showErrorDialog(String message) {
      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(
            'An Error Occurred!',
            style: Theme.of(context).textTheme.headline1,
          ),
          content: Text(
            message,
            style: Theme.of(context).textTheme.bodyText1,
          ),
          actions: <Widget>[
            FlatButton(
              child: const Text('Okay'),
              onPressed: () {
                Navigator.of(ctx).pop();
              },
            )
          ],
        ),
      );
    }

    void _showConfirmDialog() {
      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(
            'Enter code!',
            style: Theme.of(context).textTheme.headline1,
          ),
          content: Form(
            key: _confirmFormKey,
            child: TextFormField(
              decoration:
                  const InputDecoration(labelText: 'enter 8 characters'),
              validator: (value) {
                if (value!.isEmpty) {
                  return 'Invalid code!';
                }
              },
              onSaved: (value) {
                confirmCode = value.toString();
              },
            ),
          ),
          actions: <Widget>[
            FlatButton(
              child: const Text('okay'),
              onPressed: () async {
                if (!_confirmFormKey.currentState!.validate()) {
                  // Invalid!
                  return;
                }
                _confirmFormKey.currentState!.save();
                /////////////////////////////////////
                try {
                  //print(confirmCode);
                  await Provider.of<Auth>(context, listen: false).confirmEmail(
                    Provider.of<Auth>(context, listen: false).employer.userId,
                    confirmCode,
                  );
                  setState(() {
                    confirm = employerData.emailConfirmed;
                  });
                  Navigator.of(ctx).pop();
                  //Navigator.of(context).pushReplacementNamed('/home_screen');
                } on HttpException catch (error) {
                  // print(error);
                  _showErrorDialog('Wrong verification code');
                } catch (error) {
                  _showErrorDialog('Wrong verification code');
                }
              },
            ),
            FlatButton(
              child: const Text('Resend'),
              onPressed: () async {
                try {
                  //  print(confirmCode);
                  await Provider.of<Auth>(context, listen: false).sendEmail(
                    Provider.of<Auth>(context, listen: false).employer.userId,
                  );
                } catch (error) {
                  _showErrorDialog(error.toString());
                }
              },
            ),
          ],
        ),
      );
    }

    inspect(employerData);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dashboard'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      drawer: !employerData.emailConfirmed ? null : AppDrawer(),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(20),
          child: Column(
            children: [
              if (!employerData.emailConfirmed)
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Container(
                          height: 150,
                          width: 150,
                          child: Image.asset('assets/images/invitation.png')),
                      const SizedBox(
                        height: 20,
                      ),
                      Text(
                        'Thanks for joining Vividly!',
                        style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Theme.of(context).primaryColor),
                      ),
                      const Text(
                        'please confirm your email address ',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      Divider(),
                      const Text(
                        'To finish signing up, please confirm your email address. This ensures we have the right email in case we need to contact you.',
                        style: TextStyle(fontSize: 20),
                        //textAlign: TextAlign.center,
                      ),
                      RaisedButton(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(30),
                        ),
                        color: Theme.of(context).primaryColor,
                        onPressed: _showConfirmDialog,
                        child: const Text(
                          'Confirm email',
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                    ],
                  ),
                ),
              // Center(
              //   child: Text(employerData.firstName),
              // ),
            ],
          ),
        ),
      ),
    );
  }
}

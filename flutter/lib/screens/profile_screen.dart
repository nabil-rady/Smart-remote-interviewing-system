import 'package:flutter/material.dart';
import 'package:graduation_project/screens/change_pass.dart';

import '../providers/auth_provider.dart';
import 'package:provider/provider.dart';

class ProfileScreen extends StatefulWidget {
  static const routeName = '/profile_screen';

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  bool isTextFild = false;
  final myController = TextEditingController();
  @override
  void dispose() {
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final employerData = Provider.of<Auth>(context).employer;
    return Scaffold(
        appBar: AppBar(
          title: Text('name of employer'),
        ),
        body: SingleChildScrollView(
          child: Card(
              margin: EdgeInsets.all(40),
              child: Padding(
                padding: const EdgeInsets.all(15),
                child: Column(children: <Widget>[
                  Text(
                    'Profile Info',
                    style: TextStyle(
                      color: Theme.of(context).primaryColor,
                      fontSize: Theme.of(context).textTheme.bodyText2!.fontSize,
                      fontFamily:
                          Theme.of(context).textTheme.headline1!.fontFamily,
                      fontWeight:
                          Theme.of(context).textTheme.headline1!.fontWeight,
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
                          fontSize:
                              Theme.of(context).textTheme.headline1!.fontSize,
                          fontFamily:
                              Theme.of(context).textTheme.headline1!.fontFamily,
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
                          fontSize:
                              Theme.of(context).textTheme.headline1!.fontSize,
                          fontFamily:
                              Theme.of(context).textTheme.headline1!.fontFamily,
                          // fontWeight: Theme.of(context).textTheme.headline1!.fontWeight,
                        ),
                      ),
                      Text(employerData.lastName),
                      Divider(),
                      Text(
                        'Company Name',
                        style: TextStyle(
                          color: Theme.of(context).primaryColor,
                          fontSize:
                              Theme.of(context).textTheme.headline1!.fontSize,
                          fontFamily:
                              Theme.of(context).textTheme.headline1!.fontFamily,
                          // fontWeight: Theme.of(context).textTheme.headline1!.fontWeight,
                        ),
                      ),
                      Text(employerData.companyName),
                      Divider(),
                      Text(
                        'Email',
                        style: TextStyle(
                          color: Theme.of(context).primaryColor,
                          fontSize:
                              Theme.of(context).textTheme.headline1!.fontSize,
                          fontFamily:
                              Theme.of(context).textTheme.headline1!.fontFamily,
                          // fontWeight: Theme.of(context).textTheme.headline1!.fontWeight,
                        ),
                      ),
                      Text(employerData.email),
                      Divider(),
                      Text(
                        'Phone Number',
                        style: TextStyle(
                          color: Theme.of(context).primaryColor,
                          fontSize:
                              Theme.of(context).textTheme.headline1!.fontSize,
                          fontFamily:
                              Theme.of(context).textTheme.headline1!.fontFamily,
                          // fontWeight: Theme.of(context).textTheme.headline1!.fontWeight,
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          isTextFild
                              ? SizedBox(
                                  height: 20,
                                  width: 250,
                                  child: TextField(
                                    controller: myController,
                                  ))
                              : Text(employerData.phone),
                          IconButton(
                            icon: Icon(Icons.edit),
                            onPressed: () {
                              setState(() {
                                isTextFild = !isTextFild;
                              });
                            },
                            color: Theme.of(context).primaryColor,
                          ),
                        ],
                      ),
                      Divider(),
                      SizedBox(
                        height: 20,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          RaisedButton(
                            child: Text(
                              'Change Password',
                              style: TextStyle(
                                color: Theme.of(context).primaryColor,
                              ),
                            ),
                            onPressed: () {
                              Navigator.of(context)
                                  .pushNamed(ChangePassScreen.routeName);
                            },
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(30),
                            ),
                            color: Colors.white,
                          ),
                          RaisedButton(
                            child: const Text(
                              'Save Changes',
                              style: const TextStyle(color: Colors.white),
                            ),
                            onPressed: () {
                              employerData.phone = myController.text;
                              //print(employerData.phone);
                              Navigator.of(context).pop();
                            },
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(30),
                            ),
                            color: Theme.of(context).primaryColor,
                          ),
                        ],
                      )
                    ],
                  ),
                ]),
              )),
        ));
  }
}

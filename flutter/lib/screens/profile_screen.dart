import 'package:flutter/material.dart';
import 'package:graduation_project/screens/change_pass.dart';
import 'package:intl_phone_field/intl_phone_field.dart';
import '../providers/auth_provider.dart';
import 'package:provider/provider.dart';
import 'package:country_pickers/country_pickers.dart';

class ProfileScreen extends StatefulWidget {
  static const routeName = '/profile_screen';

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  bool isTextFild = false;
  bool myflag = false;
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
            title: const Text('Your Profile'),
            backgroundColor: Theme.of(context).primaryColor),
        body: SingleChildScrollView(
          child: Card(
              elevation: 5,
              margin: const EdgeInsets.all(30),
              child: Padding(
                padding: const EdgeInsets.all(15),
                child: Column(children: <Widget>[
                  Text(
                    'Profile Information',
                    style: TextStyle(
                      color: Theme.of(context).primaryColor,
                      fontSize: Theme.of(context).textTheme.bodyText2!.fontSize,
                      fontWeight:
                          Theme.of(context).textTheme.headline1!.fontWeight,
                    ),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(
                        'First Name',
                        style: TextStyle(
                          color: Theme.of(context).primaryColor,
                          fontSize:
                              Theme.of(context).textTheme.headline1!.fontSize,
                        ),
                      ),
                      Text(
                        employerData.firstName,
                      ),
                      const Divider(),
                      Text(
                        'Last Name',
                        style: TextStyle(
                          color: Theme.of(context).primaryColor,
                          fontSize:
                              Theme.of(context).textTheme.headline1!.fontSize,
                        ),
                      ),
                      Text(employerData.lastName),
                      const Divider(),
                      Text(
                        'Company Name',
                        style: TextStyle(
                          color: Theme.of(context).primaryColor,
                          fontSize:
                              Theme.of(context).textTheme.headline1!.fontSize,
                        ),
                      ),
                      Text(employerData.companyName),
                      const Divider(),
                      Text(
                        'Email',
                        style: TextStyle(
                          color: Theme.of(context).primaryColor,
                          fontSize:
                              Theme.of(context).textTheme.headline1!.fontSize,
                        ),
                      ),
                      Text(employerData.email),
                      const Divider(),
                      Row(children: <Widget>[
                        Text(
                          'Phone Number',
                          style: TextStyle(
                            color: Theme.of(context).primaryColor,
                            fontSize:
                                Theme.of(context).textTheme.headline1!.fontSize,
                          ),
                        ),
                      ]),
                      myflag
                          ? Row(children: <Widget>[
                              CountryPickerDropdown(
                                initialValue: 'EG',
                                onValuePicked: (value) {
                                  employerData.countryCode =
                                      '+' + value.phoneCode.toString();
                                },
                              ),
                              SizedBox(
                                  height: 20,
                                  width: 100,
                                  child: TextField(
                                    controller: myController,
                                  ))
                            ])
                          : Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: <Widget>[
                                //  isTextFild
                                // ? SizedBox(
                                //     height: 20,
                                //     width: 250,
                                //     child: TextField(
                                //       controller: myController,
                                //     ))
                                //:
                                Text(employerData.countryCode +
                                    " " +
                                    employerData.phone),
                                IconButton(
                                  icon: const Icon(Icons.edit),
                                  onPressed: () {
                                    setState(() {
                                      isTextFild = !isTextFild;
                                      myflag = true;
                                      print(employerData.countryCode);
                                    });
                                  },
                                  color: Theme.of(context).primaryColor,
                                ),
                              ],
                            ),
                      const Divider(),
                      const SizedBox(
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
                          // RaisedButton(
                          //   child: Text(
                          //     'Change Phone Number',
                          //     style: TextStyle(
                          //       color: Theme.of(context).primaryColor,
                          //     ),
                          //   ),
                          //   onPressed: () {
                          //     Navigator.of(context)
                          //         .pushNamed(ChangePassScreen.routeName);
                          //   },
                          //   shape: RoundedRectangleBorder(
                          //     borderRadius: BorderRadius.circular(30),
                          //   ),
                          //   color: Colors.white,
                          // ),
                          RaisedButton(
                            child: const Text(
                              'Save Changes',
                              style: const TextStyle(color: Colors.white),
                            ),
                            onPressed: () {
                              employerData.phone = myController.text;
                              print(employerData.phone);
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

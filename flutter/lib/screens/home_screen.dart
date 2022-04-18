import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../widgets/helper_widget.dart';
import '../local/http_exception.dart';
import '../providers/dashboard_provider.dart';
import '../widgets/dashboard_item.dart';
import '../widgets/drawer.dart';
import '../providers/auth_provider.dart';
import '../local/sharedpreferences.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);
  static const routeName = '/home_screen';

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Future _positionsFuture;

  @override
  void initState() {
    Future.delayed(const Duration(microseconds: 0));
    _positionsFuture = getPositionsFuture(context);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final employerData = Provider.of<Auth>(context, listen: false).employer;
    final GlobalKey<FormState> _confirmFormKey = GlobalKey();
    String confirmCode = '';
    var confirm = employerData.emailConfirmed;

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
                try {
                  await Provider.of<Auth>(context, listen: false)
                      .confirmEmail(confirmCode);
                  setState(() {
                    confirm = employerData.emailConfirmed;
                  });
                  Navigator.of(ctx).pop();
                  _positionsFuture = getPositionsFuture(context);
                } on HttpException catch (error) {
                  showErrorDialog(context, 'Wrong verification code', true);
                } catch (error) {
                  showErrorDialog(context, 'Wrong verification code', true);
                }
              },
            ),
            FlatButton(
              child: const Text('Resend'),
              onPressed: () async {
                try {
                  await Provider.of<Auth>(context, listen: false).sendEmail();
                } catch (error) {
                  showErrorDialog(context, error.toString(), true);
                }
              },
            ),
          ],
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Dashboard'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      // drawer: employerData.emailConfirmed ? AppDrawer() : null,
      drawer: AppDrawer(),
      body: !employerData.emailConfirmed
          ? SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Container(
                              height: 150,
                              width: 150,
                              child:
                                  Image.asset('assets/images/invitation.png')),
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
                            textAlign: TextAlign.center,
                            style: TextStyle(fontSize: 20),
                          ),

                          // RaisedButton(
                          //   shape: RoundedRectangleBorder(
                          //     borderRadius: BorderRadius.circular(30),
                          //   ),
                          //   color: Theme.of(context).primaryColor,
                          //   onPressed: () async {
                          //     await Provider.of<Auth>(context,
                          //             listen: false)
                          //         .sendEmail();
                          //   },
                          //   child: const Text(
                          //     'Send Code',
                          //     style: TextStyle(color: Colors.white),
                          //   ),
                          // ),
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
                  ],
                ),
              ),
            )
          : FutureBuilder(
              future: _positionsFuture,
              builder: (ctx, dataSnapshot) {
                if (dataSnapshot.connectionState == ConnectionState.waiting) {
                  return const Center(
                      child:
                          CircularProgressIndicator(color: Color(0xFF165DC0)));
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
                    return Padding(
                      padding: const EdgeInsets
                          .only(), ///////////////////// shelt al padding
                      child: Consumer<DashboardPositions>(
                          builder: (ctx, positionData, child) => positionData
                                  .positionsItems.isNotEmpty
                              ? ListView.builder(
                                  itemBuilder: (ctx, i) => DashboardItem(
                                    positionName:
                                        positionData.positionsItems[i].position,
                                    expieryDate: positionData
                                        .positionsItems[i].expireyDate,
                                    candidates: positionData
                                        .positionsItems[i].candidates,
                                    interviews: positionData
                                        .positionsItems[i].interwievs,
                                    positionId:
                                        positionData.positionsItems[i].id,
                                  ),
                                  itemCount: positionData.positionsItems.length,
                                )
                              : Padding(
                                  padding: const EdgeInsets.all(20),
                                  child: Center(
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Image.asset(
                                          'assets/images/welcome.png',
                                          height: 120,
                                          width: 120,
                                        ),
                                        const SizedBox(
                                          height: 20,
                                        ),
                                        const Text(
                                          'Welcome to Vividly',
                                          style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                              color: Colors.grey),
                                        ),
                                        const Text(
                                          'No Positions yet, please add some positions',
                                          style: TextStyle(
                                            fontSize: 18,
                                            color: Colors.grey,
                                          ),
                                          textAlign: TextAlign.center,
                                        ),
                                        const SizedBox(
                                          height: 20,
                                        )
                                      ],
                                    ),
                                  ),
                                )
                          // const Center(
                          //     child:

                          //     // Text(
                          //     //   "welcome to Vividly please add some positions",
                          //     //   textAlign: TextAlign.center,
                          //     // ),
                          //   ),
                          ),
                    );
                  }
                }
              },
            ),
    );
  }
}

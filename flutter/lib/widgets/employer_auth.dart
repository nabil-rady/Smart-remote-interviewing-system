import 'package:country_pickers/country.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:country_pickers/country_pickers.dart';
import 'package:internet_connection_checker/internet_connection_checker.dart';
import '../screens/position_screen.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../models/http_exception.dart';

enum AuthMode { signup, login }

class EmployerAuth extends StatefulWidget {
  @override
  _EmployerAuthState createState() => _EmployerAuthState();
}

class _EmployerAuthState extends State<EmployerAuth> {
  bool hasIntrnet = false;
  String confirmCode = '';
  Map<String, String> authData = {
    'firstName': '',
    'lastName': '',
    'companyName': '',
    'email': '',
    'password': '',
    'confirmPassword': '',
    'phone': '',
    'countryCode': '+20',
  };

  final _passwordController = TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey();
  final GlobalKey<FormState> _confirmFormKey = GlobalKey();
  AuthMode _authMode = AuthMode.login;

  var _isLoading = false;
  @override
  void dispose() {
    _passwordController.dispose();
    super.dispose();
  }

  void _toggleFun() {
    if (_authMode == AuthMode.signup)
      setState(() {
        _authMode = AuthMode.login;
      });
    else {
      setState(() {
        _authMode = AuthMode.signup;
      });
    }
  }

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
            decoration: const InputDecoration(labelText: 'enter 8 characters'),
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
                print(confirmCode);
                await Provider.of<Auth>(context, listen: false).confirmEmail(
                  Provider.of<Auth>(context, listen: false).employer.userId,
                  confirmCode,
                );
                setState(() {
                  _authMode = AuthMode.login;
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
                print(confirmCode);
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

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) {
      // Invalid!
      return;
    }
    _formKey.currentState!.save();
    setState(() {
      _isLoading = true;
    });
    try {
      if (_authMode == AuthMode.login) {
        //  Log user in
        await Provider.of<Auth>(context, listen: false).login(
            // authData['email'].toString(),
            // authData['password'].toString(),
            'mariammohammad390@gmail.com',
            '123456789');
        // InternetConnectionChecker().onStatusChange.listen((status) {
        //   final hasIntrnet = status == InternetConnectionStatus.connected;
        //   setState(() {
        //     this.hasIntrnet = hasIntrnet;
        //     if (!hasIntrnet) _showErrorDialog('no conniction');
        //   });
        // });

        Navigator.of(context).pushReplacementNamed('/home_screen');
      } else {
        // Sign user up
        //print(authData['countryCode']);
        await Provider.of<Auth>(context, listen: false).signup(
          authData['firstName'].toString(),
          authData['lastName'].toString(),
          authData['companyName'].toString(),
          authData['email'].toString(),
          authData['password'].toString(),
          authData['confirmPassword'].toString(),
          authData['phone'].toString(),
          authData['countryCode'].toString(),
        );
        _formKey.currentState!.reset();
        _passwordController.clear();
        _showConfirmDialog();
        //_showErrorDialog('all done');
        //if(Provider.of<Auth>(context).)
        //  Navigator.of(context).pushReplacementNamed('/home_screen');
      }
    } on HttpException catch (error) {
      var errorMessage = 'Authentication failed';
      if (error.toString().contains('Email not found')) {
        errorMessage = 'This email address is not found.';
      } else if (error.toString().contains('Incorrect password')) {
        errorMessage = 'Invalid password.';
      }
      _showErrorDialog(errorMessage);
    } catch (error) {
      // print(authData['firstName'].toString() +
      //     authData['lastName'].toString() +
      //     authData['companyName'].toString() +
      //     authData['email'].toString() +
      //     authData['password'].toString() +
      //     authData['confirmPassword'].toString() +
      //     authData['phone'].toString() +
      //     authData['countyCode'].toString());
      print(error);
      const errorMessage =
          'Could not authenticate you. Please try again later.';
      _showErrorDialog(errorMessage);
    }

    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
        right: 20,
        left: 20,
      ),
      child: Form(
        key: _formKey,
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.only(right: 20, left: 20),
            child: Column(
              children: <Widget>[
                if (_authMode == AuthMode.signup)
                  TextFormField(
                    decoration:
                        const InputDecoration(labelText: 'Your first name'),
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Invalid name!';
                      }
                    },
                    onSaved: (value) {
                      authData['firstName'] = value.toString();
                    },
                  ),
                if (_authMode == AuthMode.signup)
                  TextFormField(
                    decoration:
                        const InputDecoration(labelText: 'Your last name'),
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Invalid name!';
                      }
                    },
                    onSaved: (value) {
                      authData['lastName'] = value.toString();
                    },
                  ),
                if (_authMode == AuthMode.signup)
                  TextFormField(
                    decoration:
                        const InputDecoration(labelText: 'Company name'),
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Invalid name!';
                      }
                    },
                    onSaved: (value) {
                      authData['companyName'] = value.toString();
                    },
                  ),
                TextFormField(
                  decoration: const InputDecoration(labelText: 'E-Mail'),
                  keyboardType: TextInputType.emailAddress,
                  validator: (value) {
                    if (value!.isEmpty || !value.contains('@')) {
                      return 'Invalid email!';
                    }
                  },
                  onSaved: (value) {
                    authData['email'] = value.toString();
                  },
                ),
                TextFormField(
                  decoration: const InputDecoration(labelText: 'Password'),
                  obscureText: true,
                  controller: _passwordController,
                  validator: (value) {
                    if (value!.isEmpty || value.length < 9) {
                      return 'Password is too short!';
                    }
                  },
                  onSaved: (value) {
                    authData['password'] = value.toString();
                  },
                ),
                if (_authMode == AuthMode.signup)
                  TextFormField(
                    decoration:
                        const InputDecoration(labelText: 'Confirm password'),
                    obscureText: true,
                    // controller: _passwordController,
                    validator: (value) {
                      if (value!.isEmpty || value != _passwordController.text) {
                        return 'Not matching!';
                      }
                    },
                    onSaved: (value) {
                      authData['confirmPassword'] = value.toString();
                    },
                  ),
                const SizedBox(
                  height: 10,
                ),
                if (_authMode == AuthMode.signup)
                  Row(
                    children: [
                      CountryPickerDropdown(
                        initialValue: 'EG',
                        //itemBuilder: _buildDropdownItem,

                        onValuePicked: (Country country) {
                          authData['countryCode'] =
                              '+' + country.phoneCode.toString();

                          //print("${country.phoneCode}");
                          //print(country.phoneCode);
                        },
                      ),
                      // Expanded(
                      //   child: TextFormField(
                      //     decoration:
                      //         const InputDecoration(labelText: 'country code'),
                      //     //keyboardType: TextInputType.phone,
                      //     // controller: _passwordController,

                      //     onSaved: (value) {
                      //       authData['countryCode'] = value.toString();
                      //     },
                      //   ),
                      // ),
                      Expanded(
                        child: TextFormField(
                          decoration:
                              const InputDecoration(labelText: 'Phone number'),
                          keyboardType: TextInputType.phone,
                          // controller: _passwordController,
                          validator: (value) {
                            if (value!.isEmpty || value.length != 11) {
                              return 'invalid phone number!';
                            }
                          },
                          onSaved: (value) {
                            authData['phone'] = value.toString();
                          },
                        ),
                      ),
                    ],
                  ),
                const SizedBox(
                  height: 20,
                ),
                if (_isLoading)
                  const CircularProgressIndicator()
                else
                  RaisedButton(
                    child: Text(
                      _authMode == AuthMode.signup ? 'Sign up' : 'LOGIN',
                      style: const TextStyle(color: Colors.white),
                    ),
                    onPressed: _submit,
                    // Navigator.of(context).pushNamed(EmployerScreen.routeName);

                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30),
                    ),
                    color: Theme.of(context).primaryColor,
                  ),
                RichText(
                  text: TextSpan(
                    text: _authMode == AuthMode.signup
                        ? 'have an account?'
                        : 'Don\'t have an account?',
                    style: const TextStyle(color: Colors.black, fontSize: 20),
                    children: <TextSpan>[
                      TextSpan(
                          text: _authMode == AuthMode.signup
                              ? ' Login'
                              : ' Sign up',
                          style: TextStyle(
                              color: Theme.of(context).primaryColor,
                              fontSize: 20),
                          recognizer: TapGestureRecognizer()
                            ..onTap = _toggleFun),
                    ],
                  ),
                ),
                FlatButton(
                    child: Text('position screen'),
                    onPressed: () {
                      Navigator.of(context).pushNamed(PositionScreen.routeName);
                    })
              ],
            ),
          ),
        ),
      ),
    );
  }
}

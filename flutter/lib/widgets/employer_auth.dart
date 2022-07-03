import 'package:country_pickers/country.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:country_pickers/country_pickers.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;
import '../providers/auth_provider.dart';
import '../local/http_exception.dart';
import '../local/sharedpreferences.dart';
import '../screens/home_screen.dart';

enum AuthMode { signup, login }

class EmployerAuth extends StatefulWidget {
  @override
  EmployerAuthState createState() => EmployerAuthState();
}

class EmployerAuthState extends State<EmployerAuth> {
  var ziko;
  @override
  void initState() {
    super.initState();

    Firebase.initializeApp();
  }

  // final FirebaseMessaging _fcm = FirebaseMessaging.instance;
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
    if (_authMode == AuthMode.signup) {
      setState(() {
        _authMode = AuthMode.login;
        _formKey.currentState!.reset();
        _passwordController.clear();
      });
    } else {
      setState(() {
        _authMode = AuthMode.signup;
        _formKey.currentState!.reset();
        _passwordController.clear();
      });
    }
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
              try {
                await Provider.of<Auth>(context, listen: false).confirmEmail(
                  confirmCode,
                );
                Navigator.of(context)
                    .pushReplacementNamed(HomeScreen.routeName);
                // setState(() {
                //   _authMode = AuthMode.login;
                // });
                // Navigator.of(ctx).pop();
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
        // final fbm = FirebaseMessaging.instance;
        // final token = await fbm.getToken();
        print('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        // print(token);
        print('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        // saveFirebaseToken(token.toString());
        await Provider.of<Auth>(context, listen: false)
            .login(
          authData['email'].toString(),
          authData['password'].toString(),
          // token.toString(),
        )
            .then((value) {
          Navigator.of(context).pushReplacementNamed(HomeScreen.routeName);
        });
        //  });
      } else {
        // Sign user up
        await Provider.of<Auth>(context, listen: false).signup(
          http.Client(),
          authData['firstName'].toString(),
          authData['lastName'].toString(),
          authData['companyName'].toString(),
          authData['email'].toString(),
          authData['password'].toString(),
          authData['confirmPassword'].toString(),
          authData['phone'].toString(),
          authData['countryCode'].toString(),
        );
        final fbm = FirebaseMessaging.instance;
        final token = await fbm.getToken();
        await Provider.of<Auth>(context, listen: false)
            .login(
          authData['email'].toString(),
          authData['password'].toString(),
          // token.toString(),
        )
            .then((value) async {
          await Provider.of<Auth>(context, listen: false).sendEmail();
          Navigator.of(context)
              .pushNamedAndRemoveUntil(HomeScreen.routeName, (route) => false);
        });
      }
    } on HttpException catch (error) {
      print(error);
      var errorMessage = 'Authentication failed';
      if (error.toString().contains('Email not found')) {
        errorMessage = 'This email address is not found.';
      } else if (error.toString().contains('Incorrect password')) {
        errorMessage = 'Invalid password.';
      }
      showErrorDialog(context, errorMessage, true);

      setState(() {
        _isLoading = false;
      });
    } catch (error) {
      var errorMessage = "";
      error.toString().contains("This email is already exists")
          ? errorMessage = "This email is already exists"
          : errorMessage =
              'Could not authenticate you. Please try again later.';
      showErrorDialog(context, errorMessage, true);

      setState(() {
        _isLoading = false;
      });
    }
    _formKey.currentState!.reset();
    _passwordController.clear();
    setState(() {
      _isLoading = false;
    });
  }

//////testing functions
  validateEmailField(String value) {
    return (value.isEmpty || !value.contains('@')) ? 'Invalid email!' : null;
  }

  validatePasswordField(String value) {
    return (_authMode == AuthMode.signup && (value.isEmpty || value.length < 9))
        ? 'Password is too short!'
        : null;
  }

//////////
  @override
  Widget build(BuildContext context) {
    // ziko = Provider.of<Auth>(context);
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
                      if (value!.isEmpty || value.length < 2) {
                        return 'Invalid name!';
                      }
                    },
                    onSaved: (value) {
                      authData['companyName'] = value.toString();
                    },
                  ),
                TextFormField(
                  key: Key('myemail'),
                  decoration: const InputDecoration(labelText: 'E-Mail'),
                  keyboardType: TextInputType.emailAddress,
                  validator: (value) => validateEmailField(value!)
                  // (value!.isEmpty || !value.contains('@'))
                  //     ? 'Invalid email!'
                  //     : null
                  // {
                  //   if (value!.isEmpty || !value.contains('@')) {
                  //     return 'Invalid email!';
                  //   }
                  // }
                  ,
                  onSaved: (value) {
                    authData['email'] = value.toString();
                  },
                ),
                TextFormField(
                  key: Key('mypassword'),
                  decoration: const InputDecoration(labelText: 'Password'),
                  obscureText: true,
                  controller: _passwordController,
                  validator: (value) => validatePasswordField(value!)
                  // {
                  //   if (_authMode == AuthMode.signup &&
                  //       (value!.isEmpty || value.length < 9)) {
                  //     return 'Password is too short!';
                  //   }
                  // }
                  ,
                  onSaved: (value) {
                    authData['password'] = value.toString();
                  },
                ),
                if (_authMode == AuthMode.signup)
                  TextFormField(
                    decoration:
                        const InputDecoration(labelText: 'Confirm password'),
                    obscureText: true,
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
                        onValuePicked: (Country country) {
                          authData['countryCode'] =
                              '+' + country.phoneCode.toString();
                        },
                      ),
                      Expanded(
                        child: TextFormField(
                          decoration:
                              const InputDecoration(labelText: 'Phone number'),
                          keyboardType: TextInputType.phone,
                          validator: (value) {
                            if (value!.isEmpty) {
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
                  const CircularProgressIndicator(
                    color: Color(0xFF165DC0),
                  )
                else
                  RaisedButton(
                    key: Key('logIn'),
                    child: Text(
                      _authMode == AuthMode.signup ? 'Sign up' : 'LOGIN',
                      style: const TextStyle(color: Colors.white),
                    ),
                    onPressed: _submit,
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
              ],
            ),
          ),
        ),
      ),
    );
  }
}

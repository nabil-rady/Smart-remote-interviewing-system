import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../models/http_exception.dart';

enum AuthMode { signup, login }

class EmployerAuth extends StatefulWidget {
  @override
  _EmployerAuthState createState() => _EmployerAuthState();
}

class _EmployerAuthState extends State<EmployerAuth> {
  Map<String, String> authData = {
    'firstName': '',
    'lastName': '',
    'companyName': '',
    'email': '',
    'password': '',
    'confirmPassword': '',
    'phone': '',
  };
  final _passwordController = TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey();
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
        title: const Text(
          'An Error Occurred!',
          style: TextStyle(fontSize: 25),
        ),
        content: Text(message),
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
          authData['email'].toString(),
          authData['password'].toString(),
        );
      } else {
        // Sign user up
        await Provider.of<Auth>(context, listen: false).signup(
          authData['firstName'].toString(),
          authData['lastName'].toString(),
          authData['companyName'].toString(),
          authData['email'].toString(),
          authData['password'].toString(),
          authData['password'].toString(),
        );
      }
    } on HttpException catch (error) {
      var errorMessage = 'Authentication failed';
      if (error.toString().contains('Email not found')) {
        errorMessage = 'This email address is not found.';
      }
      // else if (error.toString().contains('INVALID_EMAIL')) {
      //   errorMessage = 'This is not a valid email address';
      // } else if (error.toString().contains('WEAK_PASSWORD')) {
      //   errorMessage = 'This password is too weak.';
      // } else if (error.toString().contains('EMAIL_NOT_FOUND')) {
      //   errorMessage = 'Could not find a user with that email.';
      // }
      else if (error.toString().contains('Incorrect password')) {
        errorMessage = 'Invalid password.';
      }
      _showErrorDialog(errorMessage);
    } catch (error) {
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
                if (_authMode == AuthMode.signup)
                  TextFormField(
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
              ],
            ),
          ),
        ),
      ),
    );
  }
}

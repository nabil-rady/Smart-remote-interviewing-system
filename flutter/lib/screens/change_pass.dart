import 'package:flutter/material.dart';
import '../local/http_exception.dart';
import '../providers/auth_provider.dart';
import 'package:provider/provider.dart';

class ChangePassScreen extends StatefulWidget {
  static const routeName = '/changePassScreen';

  @override
  State<ChangePassScreen> createState() => _ChangePassScreenState();
}

class _ChangePassScreenState extends State<ChangePassScreen> {
  Map<String, String> authData = {
    'oldPassword': '',
    'newPassword': '',
    'confirmPassword': '',
  };
  var _isLoading = false;
  final _formKey = GlobalKey<FormState>();
  final _oldPasswordController = TextEditingController();
  final _newPasswordController = TextEditingController();
  void _showErrorDialog(String message, String title) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(
          title,
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

  @override
  void dispose() {
    // TODO: implement dispose
    _newPasswordController.dispose();
    _oldPasswordController.dispose();
    super.dispose();
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
      // Sign user up
      await Provider.of<Auth>(context, listen: false).changepassword(
        authData['oldPassword'].toString(),
        authData['newPassword'].toString(),
        authData['confirmPassword'].toString(),
      );
      _formKey.currentState!.reset();
      _oldPasswordController.clear();
      _newPasswordController.clear();
      _showErrorDialog(
          "your password has been changed successfull", "Password Changed!");
      setState(() {
        _isLoading = false;
      });
    } on HttpException catch (error) {
      var errorMessage = 'Change Password Failed';
      if (error.toString().contains('Incorrect password')) {
        errorMessage = 'Incorrect password';
      }
      _showErrorDialog(errorMessage, "An Error Occurred!");

      setState(() {
        _isLoading = false;
      });
    } catch (error) {
      const errorMessage = 'Could not change password. Please try again later.';
      _showErrorDialog(errorMessage, "An Error Occurred!");
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Change Password'),
          backgroundColor: const Color(0xFF165DC0),
        ),
        body: SingleChildScrollView(
          child: Card(
            elevation: 5,
            margin: const EdgeInsets.all(40),
            child: Padding(
              padding: const EdgeInsets.all(30),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    TextFormField(
                      decoration:
                          const InputDecoration(labelText: 'Old Password'),
                      obscureText: true,
                      controller: _oldPasswordController,
                      onSaved: (value) {
                        authData['oldPassword'] = value.toString();
                      },
                    ),
                    TextFormField(
                      decoration:
                          const InputDecoration(labelText: 'New Password'),
                      obscureText: true,
                      controller: _newPasswordController,
                      validator: (value) {
                        if (value!.isEmpty || value.length < 9) {
                          return 'Password is too short!';
                        }
                      },
                      onSaved: (value) {
                        authData['newPassword'] = value.toString();
                      },
                    ),
                    TextFormField(
                      decoration:
                          const InputDecoration(labelText: 'Confirm password'),
                      obscureText: true,
                      // controller: _passwordController,
                      validator: (value) {
                        if (value!.isEmpty ||
                            value != _newPasswordController.text) {
                          return 'Not matching!';
                        }
                      },
                      onSaved: (value) {
                        authData['confirmPassword'] = value.toString();
                      },
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          if (_isLoading)
                            const CircularProgressIndicator()
                          else
                            RaisedButton(
                              child: const Text(
                                'Confirm',
                                style: TextStyle(color: Colors.white),
                              ),
                              onPressed: _submit,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(30),
                              ),
                              color: Theme.of(context).primaryColor,
                            ),
                        ]),
                  ],
                ),
              ),
            ),
          ),
        ));
  }
}

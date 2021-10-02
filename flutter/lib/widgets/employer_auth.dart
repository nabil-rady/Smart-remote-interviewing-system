import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

class EmployerAuth extends StatefulWidget {
  @override
  _EmployerAuthState createState() => _EmployerAuthState();
}

class _EmployerAuthState extends State<EmployerAuth> {
  final GlobalKey<FormState> _formKey = GlobalKey();
  var _isLoading = false;
  var _signup = false;
  void _toggleFun() {
    if (_signup)
      setState(() {
        _signup = false;
      });
    else {
      setState(() {
        _signup = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Form(
        key: _formKey,
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: <Widget>[
                if (_signup)
                  TextFormField(
                    decoration: const InputDecoration(labelText: 'Your name'),
                    keyboardType: TextInputType.emailAddress,
                    // validator: (value) {
                    //    if (value.isEmpty || !value.contains('@')) {
                    //     return 'Invalid email!';
                    //    }
                    // },
                    // onSaved: (value) {
                    //   _authData['email'] = value;
                    // },
                  ),
                if (_signup)
                  TextFormField(
                    decoration:
                        const InputDecoration(labelText: 'Company name'),
                    keyboardType: TextInputType.emailAddress,
                    // validator: (value) {
                    //    if (value.isEmpty || !value.contains('@')) {
                    //     return 'Invalid email!';
                    //    }
                    // },
                    // onSaved: (value) {
                    //   _authData['email'] = value;
                    // },
                  ),
                TextFormField(
                  decoration: const InputDecoration(labelText: 'E-Mail'),
                  keyboardType: TextInputType.emailAddress,
                  // validator: (value) {
                  //    if (value.isEmpty || !value.contains('@')) {
                  //     return 'Invalid email!';
                  //    }
                  // },
                  // onSaved: (value) {
                  //   _authData['email'] = value;
                  // },
                ),
                TextFormField(
                  decoration: const InputDecoration(labelText: 'Password'),
                  obscureText: true,
                  // controller: _passwordController,
                  // validator: (value) {
                  //   if (value.isEmpty || value.length < 5) {
                  //     return 'Password is too short!';
                  //   }
                  // },
                  // onSaved: (value) {
                  //   _authData['password'] = value;
                  // },
                ),
                const SizedBox(
                  height: 20,
                ),
                if (_isLoading)
                  const CircularProgressIndicator()
                else
                  RaisedButton(
                    child: Text(
                      _signup ? 'Sign up' : 'LOGIN',
                      style: const TextStyle(color: Colors.white),
                    ),
                    onPressed: () {
                      // Navigator.of(context).pushNamed(EmployerScreen.routeName);
                    },
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30),
                    ),
                    color: Theme.of(context).primaryColor,
                  ),
                RichText(
                  text: TextSpan(
                    text: _signup
                        ? 'have an account?'
                        : 'Don\'t have an account?',
                    style: const TextStyle(color: Colors.black, fontSize: 20),
                    children: <TextSpan>[
                      TextSpan(
                          text: _signup ? ' Login' : ' Sign up',
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

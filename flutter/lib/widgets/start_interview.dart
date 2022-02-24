import 'package:flutter/material.dart';
import 'package:graduation_project/local/http_exception.dart';
import 'package:graduation_project/local/sharedpreferences.dart';
import 'package:graduation_project/providers/session_provider.dart';
import 'package:provider/provider.dart';

class StartIntrview extends StatefulWidget {
  const StartIntrview({Key? key}) : super(key: key);

  @override
  _StartIntrviewState createState() => _StartIntrviewState();
}

class _StartIntrviewState extends State<StartIntrview> {
  var _isLoading = false;
  final myController = TextEditingController();
  Future<void> _submit() async {
    setState(() {
      _isLoading = true;
    });
    try {
      print(myController.text);
      await Provider.of<SessionDetails>(context, listen: false)
          .getSessionDetails(myController.text)
          .then((value) {
        Navigator.of(context).pushReplacementNamed("/intro_screen");
      });
    } on HttpException catch (error) {
      var errorMessage = 'Entering interview failed';
      if (error.toString().contains('This interview has been started before')) {
        errorMessage = 'This interview has been started before.';
      }
      showErrorDialog(context, errorMessage);

      setState(() {
        _isLoading = false;
      });
    } catch (error) {
      const errorMessage =
          'Could not start your interview. Please try again later.';
      showErrorDialog(context, errorMessage);

      setState(() {
        _isLoading = false;
      });
    }

    myController.clear();
    setState(() {
      _isLoading = false;
    });
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    myController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.only(top: 150, left: 35, right: 35),
        child: Column(
          children: [
            TextField(
              controller: myController,
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Invitation Code',
              ),
              // onSubmitted: (value) {
              //   Navigator.of(context).pushNamed("/intro_screen");
              // },
            ),
            const SizedBox(
              height: 20,
            ),
            const Text(
              'Please Enter The Invitation Code That The Company Sent You',
              style: TextStyle(
                fontSize: 22,
                fontStyle: FontStyle.normal,
              ),
              textAlign: TextAlign.center,
            ),
            if (_isLoading)
              const CircularProgressIndicator()
            else
              RaisedButton(
                child: const Text(
                  'Enter',
                  style: TextStyle(color: Colors.white),
                ),
                onPressed: _submit,
                //     () {
                //   print(myController.text);
                // },
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                color: Theme.of(context).primaryColor,
              ),
          ],
        ),
      ),
    );
  }
}

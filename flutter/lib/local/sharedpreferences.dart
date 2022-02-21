import 'package:flutter/material.dart';
import 'package:graduation_project/providers/dashboard_provider.dart';
import 'package:graduation_project/providers/position_details_provider.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:camera/camera.dart';

late SharedPreferences preferences;
late CameraController cameraConroller;

Future<void> sharedPreferences() async {
  preferences = await SharedPreferences.getInstance();
}

//save user token
Future<bool> saveUserToken(String userToken) =>
    preferences.setString('userToken', userToken);
Future<bool> removeUserToken() => preferences.remove('userToken');
String? getUserToken() => preferences.getString('userToken');

//save user id
Future<bool> saveUserId(String userid) =>
    preferences.setString('userId', userid);
Future<bool> removeUserId() => preferences.remove('userId');
String? getUserId() => preferences.getString('userId');

//save user expiry date
Future<bool> saveUserExpiryDate(String expiryDate) =>
    preferences.setString('userExpiryDate', expiryDate);
Future<bool> removeUserExpiryDate() => preferences.remove('userExpiryDate');
String? getUserExpiryDate() => preferences.getString('userExpiryDate');

void saveCameraController(CameraController cam) {
  cameraConroller = cam;
}

CameraController getCameraController() {
  return cameraConroller;
}

void showErrorDialog(BuildContext context, String message) {
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

Future getPositionsFuture(BuildContext context) {
  return Provider.of<DashboardPositions>(context, listen: false).getListings();
}

Future getQuestionsFuture(BuildContext context, positionId) {
  return Provider.of<PostionDetails>(context, listen: false)
      .getDetails(positionId);
}

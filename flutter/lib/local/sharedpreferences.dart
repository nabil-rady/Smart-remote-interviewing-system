import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:test/providers/notification_provider.dart';
import '../providers/dashboard_provider.dart';
import '../providers/position_details_provider.dart';
import '../providers/session_provider.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:camera/camera.dart';

late SharedPreferences preferences;
late CameraController cameraConroller;
late Future sessionQuestion;
late Future answerDetails;
late String firebasetoken;
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

void showErrorDialog(BuildContext context, String message, bool error) {
  showDialog(
    context: context,
    builder: (ctx) => AlertDialog(
      title: Text(
        error ? 'An Error Occurred!' : 'All Done',
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

Future deleteListingFuture(BuildContext context, String listingId) {
  return Provider.of<DashboardPositions>(context, listen: false)
      .deleteListings(listingId);
}

Future getNotificationssFuture(BuildContext context) {
  return Provider.of<Notifications>(context, listen: false).getNotidfications();
}

Future getPositionDetails(BuildContext context, positionId) {
  return Provider.of<PostionDetails>(context, listen: false)
      .getDetails(positionId);
}

Future getSessionQuestions(BuildContext context, String positionId) {
  sessionQuestion = Provider.of<SessionDetails>(context, listen: false)
      .getSessionDetails(positionId);
  return sessionQuestion;
}

Future fetchSessionQuestion() {
  return sessionQuestion;
}

Future getAnswerDetails(BuildContext context, String applicantId) {
  answerDetails = Provider.of<PostionDetails>(context, listen: false)
      .getEvaluationDetails(applicantId);
  return answerDetails;
}

Future fetchAnswerDetails() {
  return answerDetails;
}

void saveFirebaseToken(String token) async {
  firebasetoken = token;
}

String getFirebaseToken() {
  return firebasetoken;
}

extension Capitalized on String {
  String capitalized() =>
      this.substring(0, 1).toUpperCase() + this.substring(1).toLowerCase();
}
